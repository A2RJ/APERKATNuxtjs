# Main
- Aplikasi RKAT (Rencana Kerja dan Anggaran Tahunan) Universitas

# On Progress
# Menu
- Login
- Dashboard
- Profile
- Kelola RKAT
    - Tambah
    - Ubah
    - Cari
    - Hapus
- Kelola Pengajuan
    - Tambah
    - Ubah
    - Cari
    - Hapus
    - Upload LPJ
- Kelola Sub Pengajuan
    - Cari
    - Terima atau Tolak Pengajuan
    - Upload Bukti Pencairan
- Kelola User
    - Tambah
    - Ubah
    - Cari
    - Hapus

## Build Setup
```bash
# clone front end repo
$ git clone https://github.com/A2RJ/APERKAT-NuxtJS.git

# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# clone API repo
$ https://github.com/A2RJ/APERKAT-LumenAPI.git

# serve at localhost:8000
$ npm run dev

# import DB in folder storage
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# ALL
# Export xlsx
# RKAT
- [x] tambah /rkat/add
- [x] import this.$parent.import
- [x] reset this.$parent.reset
- [x] delete this.delete(row)
- [x] delete selected
- [x] print all
- [x] print selected
# pengajuan divisi
- [x] tambah pengajuan/subordinate/add
- [x] reset this.reset
- [x] delete this.delete(row)
- [x] print all
- [COba untuk 2 user berbeda] delete selected
- [Coba untuk 2 user berbeda] print selected
- [Hanya list yg akan di terima saja] Daftar pengajuan (berikan tanda di DB next siapa, ex: )
# user
- tambah /user/add
- reset this.$parent.reset
- delete this.delete(row)
- print all
- delete selected
- print selected
# grafik

# MABA SSO
- administrasi.uts.ac.id (nim - nim)
- portal (nim - nim)

# import berita uts
- gunakan scraper untuk post contents