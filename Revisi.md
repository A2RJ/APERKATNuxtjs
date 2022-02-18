# Fix Menu

- Fixing Menu pengajuan sub divisi [OK]
  -- on progress dan completed tetap [ALL] [OK]
  -- need approval dengan format sebelumnya [!WR2-!WR2bendahara-!WR2lpj] [OK]
  -- List pencairan [DIRKEU-WR2-REKTOR] [OK]
  -- Pencairan dan belum pencairan [WR2Bendahara] [OK]
  -- LPJ Kegiatan dan belum lpj kegiatan [SEKNIV] [OK]
  -- LPJ Keuangan dan belum lpj keuangan [WR2LPJ] [OK]

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

- Perubahan warna untuk item yang sudah terima [OK]
- Tambah kolom catatan di bottom RAB [OK]
- Fields list pencairan WR 2 [OK]
- Default kop surat [OK]

# 09/02/2022

- Perubahan formaat penamaan file pdf (Nomor rkat-nama-kegiatan-timenow()) [OK]
- Print list pencairan (rkat-periode-timenow) [OK]
- List pencairan langsung periode terbaru [OK]
- Tambah detail periode diatas table list pencairan dan tanggal pembuatan periode [OK]
- Tab baru telah dicairkan (Bendahara) [OK]
- Pangkas fields (Bank, Nomor Rekening, Nama Rekening - Sekniv dan dir keuangan lpj) [OK]
- Pencairan langsung dihalaman dashboard [OK]
- LPJ Keuangan langsung dihalaman dashboard [OK]
- Nominal biaya dan nama program gantikan user
- Nominal biaya disetujui dan diajukan [OK]
- Max 5 pengajuan per user [Belum]
- Total menjadi biaya program (Input pengajuan) [OK]
- Total di bawah table [OK]
- Form login [OK]
- Tolak pengajuan oleh rektor agar dibuat periode baru [Belum]

# Work in progress

- Tambah filter pengajuan berdasarkan status, per tanggal, per bulan, per tahun [Not-Fix]
- List notifikasi (baru ditambahkan, revisi, list harus di approve dll)
- Link refensi satuan harga barang
- Ubah warna menjadi orange [Pertimbangan]
- Preview pencairan, lpj keuangan, lpj kegiatan langsung di table [BELUM-LINK-TO-PDF]
- Filter otomatis berdasarkan tahun sekarang (dropdown tahun sebelumnya)
- List pencairan langsung tabel per periode (Jadi tabel bertumpuk) [Pertimbangan]

# 16/02/2022

- Filter berdasarkan periode rkat
-- [Lumen] Semua pengajuan with rkat select periode
-- [Nuxt] Filter berdasarkan rkat.periode
-- [Nuxt] List year by lowest year in rkat.periode between now year
-- Hanya bisa pengajuan di periode tahun yang sama
-- Tambah dropdown periode rkat di input rkat
- Sebelum deploy apa saja yang perlu diubah