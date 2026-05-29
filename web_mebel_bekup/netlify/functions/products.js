exports.handler = async (event) => {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
    'Content-Type': 'application/json',
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`
  };

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: 'SUPABASE_URL atau SUPABASE_KEY belum diset.' })
    };
  }

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  let body = {};
  try {
    body = event.body ? JSON.parse(event.body) : {};
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: 'Request body tidak bisa diparse.' })
    };
  }

  const action = body.action || (event.httpMethod === 'GET' ? 'get' : '');

  try {
    if (event.httpMethod === 'GET' || action === 'get') {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*&order=urutan.asc`, {
        method: 'GET',
        headers
      });
      const products = await res.json();
      if (!res.ok) throw new Error(products.message || 'Gagal memuat produk.');
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, products }) };
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
      const res = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
        method: 'POST',
        headers: {
          ...headers,
          Prefer: 'return=representation'
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal menambah produk.');
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, product: data[0] }) };
    }

    if (action === 'update') {
      const id = body.id;
      if (!id) throw new Error('ID produk diperlukan untuk update.');
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
      const res = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          ...headers,
          Prefer: 'return=representation'
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Gagal update produk.');
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, product: data[0] }) };
    }

    if (action === 'delete') {
      const id = body.id;
      if (!id) throw new Error('ID produk diperlukan untuk delete.');
      const res = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
        method: 'DELETE',
        headers
      });
      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.message || 'Gagal menghapus produk.');
      }
      return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: 'Aksi tidak dikenal.' })
    };
  } catch (error) {
    console.error('Netlify function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: error.message || 'Server error' })
    };
  }
};
