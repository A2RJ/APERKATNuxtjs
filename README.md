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
- - ubah list (dir keuangan dan sekniv)
- - jika keuangan && lpj keuangan !== null maka tampilkan form terima pengajuan
- - jika sekniv && lpj kegiatan !== null maka tampilkan form terima pengajuan
- - terima bagaimana?
- - - tambahkan field terima pengajuan sebanyak 2
- - - atau buat seperti alur sebelumnya tetapi hanya dibuat list untuk 2 terakhir (Custom list status)
- - - Misalkan:
[
    {
        'id_user': 1,
        'nama_struktur': 'LPJ',
        'status': diambil dari value ke berapa dir keuangan dan sekniv atau periksa validasi.id_struktur = 123 && validasi.message like '%LPJ%' maka dapatkan valuenya.
    }
]
- print pengajuan dengan format baru
- - insert image (kop surat)
- - bagaimana cara membuat format surat?
- fitur print lengkap dengan semua dokumen pendukung
- [sudah-termasuk-dalam-menu-need-approval-dir-keuangan] tambah menu pencairan (hanya tampil jika pengajuan akan dicairkan dan format jpg,png,pdf)
