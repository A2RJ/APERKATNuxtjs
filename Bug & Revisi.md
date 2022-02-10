# Testing

not fix - aneh 242, 249, 256, 257,
periksa atasan pasca sarjana
periksa FEB 352, 353, 354, 355, 356,
periksa frs 359, 364
pusat bahasa 369
teknik mesin 370
untuk testing 341

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

# Periksa update berdasarkan id pengajuan

- 461 [ok]
- 460 [ok]
- 459 [ok]
- 417 [ok]
- 420 [ok]
- 408 [ok]
- 381 [ok]
- 376 [ok]
- 352 [ok]
- 302 [ok]

# Revisi 04 Februari 2022 [OK]

- RAB di aplikasi [Validasi-!=-0-Testing-update-data]
- Print pengajuan tampilkan history pengajuan [OK]
- Dir keuangan :
  -- Buat periode
  -- list periode
  -- list pencairan by periode (get where pengajuan.periode_id = periode.id)
  -- input nominal pencairan
  -- add pengajuan ke list pencairan (update where pengajuan.periode_id = periode.id)
- WR2 : (Tampilkan berdasarkan periode dan next == wr2 di tabel pengajuan)
  -- Select periode
  -- List pengajuan by periode
  -- Aksi OK, untuk banyak data gunakan looping
- Rektor :
  -- Select periode
  -- List pengajuan by periode
  -- Aksi OK, untuk banyak data gunakan looping
- Sekniv :
  -- Select periode
  -- List pengajuan by periode
  -- Cek LPJ

# 08/02/2022

- Link refensi satuan harga barang 
- Perubahan warna untuk item yang sudah terima
- Tambah kolom catatan di bottom RAB
- Fields list pencairan WR 2 [OK]
- Default kop surat
- Ubah warna menjadi orange
- Tambah filter pengajuan berdasarkan status, per tanggal, per bulan, per tahun
- List notifikasi (baru ditambahkan, revisi, list harus di approve dll)

# 09/02/2022

- Perubahan formaat penamaan file pdf (Nomor rkat-nama-kegiatan-timenow())
- Print list pencairan (rkat-periode-timenow)
- Filter otomatis berdasarkan tahun sekarang (dropdown tahun sebelumnya)
- List pencairan langsung periode terbaru
- Tambah detail periode diatas table list pencairan dan tanggal pembuatan periode
- List pencairan langsung tabel per periode

- Tab baru telah dicairkan (Bendahara)
- Pangkas fields (Bank, Nomor Rekening, Nama Rekening - Sekniv dan dir keuangan lpj) [OK]
- Pencairan langsung dihalaman dashboard [OK]
- LPJ Keuangan langsung dihalaman dashboard [OK]

# Fix Menu

- Fixing Menu pengajuan sub divisi [OK]
  -- on progress dan completed tetap [ALL] [OK]
  -- need approval dengan format sebelumnya [!WR2-!WR2bendahara-!WR2lpj] [OK]
  -- List pencairan [DIRKEU-WR2-REKTOR] [OK]
  -- Pencairan dan belum pencairan [WR2Bendahara] [OK]
  -- LPJ Kegiatan dan belum lpj kegiatan [SEKNIV] [OK]
  -- LPJ Keuangan dan belum lpj keuangan [WR2LPJ] [OK]
