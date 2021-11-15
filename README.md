# Next updates

- [ok] bug pengajuan
- [ok] ubah label menjadi RAB
- [ok] ubah format file rab menjadi exel
- [ok] bug ubah kode rkat di halaman ubah
- [ok] (Halaman pengajuan) hanya boleh input 1 pengajuan dengan 1 kode rkat
- [ok] (Halaman update pengajuan) hanya boleh input 1 pengajuan dengan 1 kode rkat
- [ok] Bug download pengajuan
- [ok] validasi nominal pengajuan sesuai dengan nominal yang ada di RKAT
- [ok] jika sudah pencairan maka pengaju wajib upload lpj dalam waktu 1 minggu dan tidak boleh input pengajuan ketika belum upload 2x lpj
- [progress] perubahan persetujuan pengajuan dibagi dir keuangan dan sekniv
- - [ok] ubah status pengajuan
- - [ok] jika keuangan && lpj keuangan !== null maka tampilkan form terima pengajuan || jika sekniv && lpj kegiatan !== null maka tampilkan form terima pengajuan
- - [next] terima sudah, tetapi bagaimana saat user upload 2 lpj? sedangkan fungsi next hanya menyimpan 1 value saja, mungkin bis buat 2 fields: next_kegiatan dan next_keuangan
- - - atau buat fungsi sendiri untuk menyimpan 2 value (yg dibutuhkan untuk mengupdate status pengajuan)

- print pengajuan dengan format baru
- - insert image (kop surat)
- - bagaimana cara membuat format surat?
- fitur print lengkap dengan semua dokumen pendukung
- [sudah-termasuk-dalam-menu-need-approval-dir-keuangan] tambah menu pencairan (hanya tampil jika pengajuan akan dicairkan dan format jpg,png,pdf)
