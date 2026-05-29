-- Jalankan di phpMyAdmin InfinityFree

CREATE TABLE IF NOT EXISTS products (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    urutan       VARCHAR(10),
    nama         VARCHAR(255) NOT NULL,
    desc_singkat TEXT,
    desc_panjang TEXT,
    harga        VARCHAR(100),
    gambar       VARCHAR(255),
    label        VARCHAR(255),
    spesifikasi  TEXT,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO products (urutan, nama, desc_singkat, desc_panjang, harga, gambar, label, spesifikasi) VALUES
('01','Pintu Solid','Kokoh, kedap suara, dan tahan cuaca.','Dibuat dari kayu jati tua pilihan dengan ketebalan optimal dan proses pengeringan alami.','Mulai Rp 1.500.000','pintujati1.jpeg','Pintu Solid Jati','Bahan: Kayu Jati Tua Grade A|Ketebalan: 3,5 cm / 4 cm / Custom|Finishing: Natural / Duco / Antique|Garansi: 2 Tahun'),
('02','Pintu Minimalis','Desain bersih dan modern untuk rumah kekinian.','Desain clean dan modern memadukan keindahan serat kayu jati asli dengan tampilan kontemporer.','Mulai Rp 700.000','pintuminimalis.jpeg','Pintu Minimalis Jati','Bahan: Kayu Jati Pilihan|Desain: Panel Datar / Kaca / Kombinasi|Finishing: Natural Oil / Melamine|Ukuran: Standard & Custom'),
('03','Pintu Custom','Bebas tentukan desain, ukuran, dan finishing.','Wujudkan pintu impian Anda sesuai desain, ukuran, dan finishing yang Anda inginkan.','Harga sesuai request','pintucustom.jpeg','Pintu Custom Jati','Bahan: Kayu Jati Solid|Desain: Sesuai Request|Finishing: HPL / Natural / Duco / Antique|Custom Dimensi: Ya'),
('04','Kusen','Kokoh, presisi, dan tahan rayap.','Kusen kayu jati solid yang kuat dan presisi, fondasi penting untuk pemasangan pintu dan jendela.','Mulai Rp 100.000 / meter','kusenjati.jpeg','Kusen Jati','Bahan: Kayu Jati Tua|Tipe: Kusen Pintu / Kusen Jendela|Finishing: Natural / Cat Dasar|Perlakuan: Anti Rayap & Jamur'),
('05','Bahan Kayu Mentah','Suplai kayu jati mentah berkualitas untuk produsen mebel.','Suplai kayu jati mentah berkualitas tinggi langsung dari sumber untuk produsen mebel dan kontraktor.','Mulai Rp 50.000','glondongrandu.jpeg','Bahan Baku Kayu','Kelas: A / B / C|Bentuk: Balok / Papan / Olahan|Kadar Air: < 12%|MOQ: 1 m3'),
('06','Finishing & Ukiran','Layanan finishing premium dan ukiran khas Jawa.','Layanan finishing ulang, reparasi, dan ukiran khas Jawa untuk mebel lama maupun baru.','Harga sesuai model ukiran','pintuukiran.jpeg','Finishing & Ukiran Jawa','Jenis Finishing: Natural / Duco / Antique / Melamine|Ukiran: Jepara / Bali / Minimalis|Reparasi: Ya|Waktu: 3-14 hari');
qwert