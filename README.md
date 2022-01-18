# List updates selesai

- administrasi (SSO dan Statistik)
- [OK] Bug fixing
  -- halaman pengajuan
  -- print per pengajuan atau multi file
  -- pengajuan selesai
  -- grafik sub divisi
- [OK] Perubahan kode rkat di halaman ubah pengajuan
- [OK] Perubahan label menjadi RAB dan format file rab menjadi exel
- [OK] Perubahan hanya boleh input 2 pengajuan per kode rkat (Halaman pengajuan dan update pengajuan)
- [OK] Perubahan tidak dapat input pengajuan ketika sudah pencairan tetapi belum upload 2x lpj dan pengaju wajib upload lpj dalam waktu 1 minggu
- [OK] Perubahan persetujuan LPJ: LPJ Keuangan (Dir. Keuangan) dan LPJ Kegiatan (SEKNIV)
- [OK] Perubahan user Dir. Keuangan terbagi manjadi 3: upload bukti pencairan, periksa LPJ Keuangan dan terima/tolak pengajuan.
- [OK] perubahan menjadi pencairan bertahap - Dir. Keuangan
- [OK] perubahan akses menu beberapa user ex: Dir. Keuangan, Pencairan, LPJ dan SEKNIV
- [OK] validasi upload file pencairan, RAB, LPJ Keuangan dan LPJ Kegiatan
- [OK] Perubahan format print pengajuan sesuai format TOR
- [OK] Penambahan validasi nominal biaya program (pengajuan) sesuai atau tidak boleh lebih besar dari nominal anggaran RKAT
- [OK] Penambahan data kop surat dan scan ttd pada halaman user profil

# List penambahan fitur selesai

- Penambahan semua fitur pengajuan ke pengajuan non rkat
- [OK] Pengajuan
  -- Fitur list pengajuan (Multi delete, multi print) dll
  -- Fitur Need approval
  -- Fitur pencairan (Bisa 1x dan bertahap)
  -- Fitur Periksa LPJ Keuangan
  -- Fitur periksa LPJ Kegiatan
  -- Fitur On Progress
  -- Fitur Completed
  -- Optimasi hapus tabel pengajuan history, jadi langsung tabel pengajuan dan pengajuan validasi [OK]
- [OK] Non RKAT
  -- Fitur list pengajuan (Multi delete, multi print) dll
  -- Fitur Need approval
  -- Fitur Pencairan (Bisa 1x dan bertahap)
  -- Fitur Periksa LPJ Keuangan
  -- Fitur periksa belum upload LPJ Keuangan
  -- Fitur periksa LPJ Kegiatan
  -- Fitur periksa belum upload LPJ Kegiatan
  -- Fitur On Progress
  -- Fitur Completed
  -- periksa fitur next setiap aksi pengajuan, ubah pengajuan hanya jika status ditolak

# Next updates

- Pengajuan
  -- hapus bukti pencairan

- Pengajuan Non RKAT
  -- Perubahan format print pengajuan sesuai format TOR
  -- print pengajuan atau multi file non rkat
  -- undo aksi tolak/terima pengajuan
  -- hapus bukti pencairan

- optimasi
  -- Gunakan orderBy('created_at', 'DESC')->get() pada semua query pengajuan
  -- fixing bug chart dengan vue chartjs
  -- tambah fitur update note pada halaman dashboard agar semua user dapat mengetahui note terbaru
  -- amankan request url injection dengan cara validasi inputan dengan data user dari database, jika data yg direquest tidak sesuai dengan data user maka return 404

- Bug atau manual setting
  -- Default KOP surat dan scan ttd
  -- set manual upload bukti tf
  -- pemeliharaan berdiri sendiri

# On progress / Sedang dikerjakan

# Hari ini development dan testing

- Testing semua fungsi pengajuan rkat
  -- undo aksi tolak/terima pengajuan [PROGRESS]
