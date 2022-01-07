# Testing

not fix - aneh 242, 249, 256, 257,
periksa atasan pasca sarjana
periksa FEB 352, 353, 354, 355, 356,
periksa frs 359, 364
pusat bahasa 369
teknik mesin 370
untuk testing 341

# Next updates

- [ok] Bug fixing halaman pengajuan, print pengajuan, pengajuan selesai, grafik sub divisi
- [ok] Perubahan ubah kode rkat di halaman ubah pengajuan
- [ok] Perubahan label menjadi RAB dan format file rab menjadi exel
- [ok] Perubahan hanya boleh input 1 pengajuan per kode rkat (Halaman pengajuan dan update pengajuan)
- [ok] Perubahan tidak dapat input pengajuan ketika sudah pencairan tetapi belum upload 2x lpj dan pengaju wajib upload lpj dalam waktu 1 minggu
- [ok] Perubahan persetujuan LPJ: LPJ Keuangan (Dir. Keuangan) dan LPJ Kegiatan (SEKNIV)
- [ok] Perubahan user Dir. Keuangan terbagi manjadi 3: upload bukti pencairan, periksa LPJ Keuangan dan approval pengajuan.
- [ok] Perubahan format print pengajuan menadi format TOR
- [ok] Penambahan validasi nominal biaya program (pengajuan) sesuai atau tidak boleh lebih besar dari nominal anggaran RKAT
- [ok] Penambahan data kop surat dan scan ttd pada halaman user profil

# Next updates

- upload pencairan bertahap lebih dari 1x
- - DB: buat table pencairan_image, relasi ke tabel pencairan [ok]
- - API:
- - - buat endpoint pencairan_image get by id_pencairan [ok]
- - - looping pencairan_image untuk menampilkan pencairan [ok]
- - - jika sudah pencairan maka buat 1 li sebelum looping [ok]
- - - ubah aksi upload pencairan pencairan bertahap [ok]
- - - buat endpoint pencairan_image post [ok]
- - - buat post form pencairan [ok]
- - - buat endpoint pencairan_image delete [ok]
- - - buat aksi pencairan selesai [ok]
- - - buat aksi pencairan_image delete
- - - ubah query select where pencairan !== null tambah pencairan !== "default.jpg"
- hapus button pada pengajuan dashboard
- pemeliharaan berdiri sendiri

# bug 27/12/2021

# periksa pengajuan

- 168 pencairan
- 171 pencairan
- 175 pencairan dan lpj_keuangan
- 206 pencairan
- 212 pencairan
- 215 lpj keuangan
- 220 pencairan
- 222 lpj keuangan
- 224 pencairan dan lpj keuangan
- 225 pencairan dan lpj keuangan
- 237 pencairan
- 238 pencairan
- 241 pencairan
- 247 pencairan
- 250 pencairan
- 266 pencairan
- 358 lpj keuangan
- 389 lpj keuangan

# perbaiki pencairan, lpj_kegiatan, lpj_keuangan, validasi_status dan nama_status

- 168 [OK]
- 171 [OK]
- 175 [OK]
- 206 [Manual-upload-tf] frs-02
- 212 [Manual-upload-tf] inf-29
- 215 [Reupload-lpj]
- 220 [Manual-upload-tf] inf-93
- 222 [Reupload-lpj]
- 224 [OK]
- 225 [OK]
- 237 [OK]
- 238 [OK]
- 241 [OK]
- 247 [OK]
- 250 [OK]
- 266 [Manual-upload-tf] pas-04
- 358 [Reupload-lpj]
- 389 [Reupload-lpj]

# 04-01-2021

- setting max upload file [OK]
- set manual upload bukti tf
- status pengajuan non rkat
  -- ambil next saat simpan data berdasarkan id dan set next pd simpan [OK]
  -- khusus dir keuangan langsung ke dir keuangan juga = 24 [OK]
  -- fungsi show hide aksi terima/tolak jika index-1 !== false [OK]
  -- upload bukti pencairan bertahap [OK]
  -- upload lpj keuangan [OK]
  -- periksa lpj keuangan [OK]
  -- upload lpj kegiatan [OK]
  -- periksa lpj kegiatan [OK]
  -- completed [OK]
  -- print pengajuan
- fitur admin
  -- on progress [ubah-nama]
  -- need approval [ubah-nama]
  -- completed [belum]
  -- list upload pencairan [OK]
  -- periksa lpj keuangan [OK]
- optimasi kecepatan
  -- getNext untuk pengajuan [On-Progress]
  -- Hapus tabel pengajuan history, jadi langsung tabel pengajuan dan pengajuan validasi [On-progress]
  -- fixing bug chart dengan vue chartjs
- undo aksi tolak/terima pengajuan
- sesuaikan menu untuk upload pencairan hanya untuk dir keuangan pencairan dan hide menu lainnya
- sesuaikan menu untuk terima lpj keuangan hanya untuk dir keuangan terima dan hide menu lainnya
- amankan request url injection dengan cara validasi inputan dengan data user dari database, jika data yg direquest tidak sesuai dengan data user maka return 404
