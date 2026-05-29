const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
  'Content-Type': 'application/json'
};

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const parseBody = (body) => {
  try {
    return body ? JSON.parse(body) : {};
  } catch (err) {
    return {};
  }
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: 'SUPABASE_URL atau SUPABASE_KEY belum diset.' })
    };
  }

  const body = parseBody(event.body);
  const action = body.action || (event.httpMethod === 'GET' ? 'get' : '');

  try {
    if (event.httpMethod === 'GET' || action === 'get') {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('urutan', { ascending: true });
      if (error) throw error;
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, products: data }) };
    }

    if (action === 'add') {
      const payload = {
        urutan: body.urutan || '',
        nama: body.nama || '',
        desc_singkat: body.desc_singkat || '',
        desc_panjang: body.desc_panjang || '',
        harga: body.harga || '',
        gambar: body.gambar || '',
        label: body.label || '',
        spesifikasi: body.spesifikasi || ''
      };
      const { data, error } = await supabase
        .from('products')
        .insert([payload])
        .select();
      if (error) throw error;
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, product: data[0] }) };
    }

    if (action === 'update') {
      if (!body.id) throw new Error('ID produk diperlukan untuk update.');
      const payload = {
        urutan: body.urutan || '',
        nama: body.nama || '',
        desc_singkat: body.desc_singkat || '',
        desc_panjang: body.desc_panjang || '',
        harga: body.harga || '',
        gambar: body.gambar || '',
        label: body.label || '',
        spesifikasi: body.spesifikasi || ''
      };
      const { data, error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', body.id)
        .select();
      if (error) throw error;
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, product: data[0] }) };
    }

    if (action === 'delete') {
      if (!body.id) throw new Error('ID produk diperlukan untuk delete.');
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', body.id);
      if (error) throw error;
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    return { statusCode: 400, headers, body: JSON.stringify({ success: false, error: 'Unknown action' }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ success: false, error: err.message }) };
  }
};
