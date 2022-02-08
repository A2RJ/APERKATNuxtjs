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

# Revisi 04 Februari 2022

- RAB di aplikasi
-- [WIP] post rab ke tabel rab
- Print pengajuan tampilkan history pengajuan [OK]

# BUAT LIST PENCAIRAN

- Saat approve dir keuangan, input nominal pencairan
- WR2 tidak lagi terima/tolak tetapi:
  -- Buat periode
  -- list periode
  -- list pencairan by periode (get where pengajuan.periode_id = periode.id)
  -- add pengajuan ke list pencairan (update where pengajuan.periode_id = periode.id)
- Rektor:
  -- List pencairan (approve/revisi)
- Default kop surat
- Ubah warna menjadi orange
- Tambah filter pengajuan berdasarkan status, per tanggal, per bulan, per tahun
- List notifikasi (baru ditambahkan, revisi, list harus di approve dll)

# 08/02/2022
- Link refensi satuan harga barang
- Perubahan warna untuk item yang sudah terima
- Tambah kolom catatan di bottom RAB
- Fields list pencairan WR 2
- Perubahan tampilan (WR2, Rektor, dir keuangan, pencairan dan lpj)