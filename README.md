# List updates selesai

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
  -- Fitur Need approval
  -- Fitur Upload bukti pencairan (Bisa 1x dan bertahap)
  -- Fitur Periksa LPJ Keuangan (Dir. Keuangan)
  -- Fitur periksa LPJ Kegiatan (SEKNIV)
  -- Fitur On Progress
  -- Fitur Completed
- [OK] Non RKAT
  -- Fitur Need approval
  -- Fitur Upload bukti pencairan (Bisa 1x dan bertahap)
  -- Fitur Periksa LPJ Keuangan (Dir. Keuangan)
  -- Fitur periksa LPJ Kegiatan (SEKNIV)
  -- Fitur On Progress
  -- Fitur Completed

# Next updates

- print pengajuan atau multi file non rkat
- hapus bukti pencairan
- hapus button pada pengajuan dashboard
- pemeliharaan berdiri sendiri
- fitur custom table
- set manual upload bukti tf
- undo aksi tolak/terima pengajuan
- optimasi kecepatan
  -- getNext untuk pengajuan
  -- Hapus tabel pengajuan history, jadi langsung tabel pengajuan dan pengajuan validasi
  -- fixing bug chart dengan vue chartjs
- amankan request url injection dengan cara validasi inputan dengan data user dari database, jika data yg direquest tidak sesuai dengan data user maka return 404

# On progress

- Non Rkat
  -- ubah pengajuan hanya jika status ditolak [Work-in-progress]
  -- list upload pencairan [fungsi-sudah-selesai]
  -- periksa lpj keuangan [fungsi-sudah-selesai]
  -- completed rkat

# Hari ini development dan testing

- testing pengajuan non rkat
  -- periksa fitur next setiap aksi pengajuan
  -- fitur list pengajuan
  -- fitur need approval
  -- fitur on progress
  -- fitur pencairan
  -- fitur lpj keuangan
  -- fitur lpj kegiatan
  -- fitur completed
  -- fitur completed dan filter
