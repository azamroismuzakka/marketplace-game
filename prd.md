# Product Requirements Document (PRD)

## Nama Produk

GameAccount Market

## Deskripsi Produk

Platform web marketplace untuk jual beli akun Mobile Legends dan Free Fire yang aman. Pengguna dapat melihat daftar akun yang dijual, namun wajib melakukan registrasi dan login sebelum melakukan pembelian.

---

## Tujuan Produk

* Mempermudah transaksi jual beli akun game.
* Menyediakan sistem transaksi yang aman.
* Mengurangi risiko penipuan antara penjual dan pembeli.

---

## Target Pengguna

1. Pemain Mobile Legends.
2. Pemain Free Fire.
3. Penjual akun game.
4. Kolektor akun game.

---

## Fitur Utama

### 1. Registrasi Akun

* Daftar menggunakan Email.
* Verifikasi Email.
* Login dan Logout.

### 2. Dashboard User

* Profil pengguna.
* Riwayat pembelian.
* Riwayat penjualan.

### 3. Katalog Akun Game

* Daftar akun Mobile Legends.
* Daftar akun Free Fire.
* Filter berdasarkan:

  * Harga
  * Rank
  * Jumlah Skin
  * Hero/Character

### 4. Detail Akun

Menampilkan:

* Nama akun
* Rank
* Jumlah skin
* Hero/karakter
* Screenshot akun
* Harga

### 5. Pembelian Akun

Alur:

1. User memilih akun.
2. Sistem mengecek status login.
3. Jika belum login → diarahkan ke halaman registrasi/login.
4. Setelah login → lanjut ke checkout.
5. Pilih metode pembayaran.
6. Bayar.
7. Admin memverifikasi pembayaran.
8. Data akun diberikan kepada pembeli.

### 6. Penjualan Akun

* User mengunggah akun yang ingin dijual.
* Mengisi detail akun.
* Menentukan harga.
* Menunggu verifikasi admin.

### 7. Admin Panel

* Kelola pengguna.
* Kelola akun yang dijual.
* Verifikasi pembayaran.
* Kelola transaksi.

---

## Alur Pembelian

Visitor
↓
Lihat Katalog Akun
↓
Klik Beli
↓
Sudah Login?
├─ Tidak → Registrasi/Login
└─ Ya
↓
Checkout
↓
Pembayaran
↓
Verifikasi
↓
Akun Dikirim
↓
Selesai

---

## Database Utama

### Users

* id
* nama
* email
* password
* role

### Game Accounts

* id
* game
* rank
* skin
* deskripsi
* harga
* status

### Transactions

* id
* user_id
* account_id
* total
* status

### Payments

* id
* transaction_id
* metode
* bukti_bayar
* status

---

## Teknologi

Frontend:

* HTML
* CSS
* JavaScript
* React.js

Backend:

* Node.js
* Express.js

Database:

* MySQL

Hosting:

* VPS / Cloud Server

---

## Keamanan

* Password di-hash menggunakan bcrypt.
* JWT Authentication.
* HTTPS.
* Verifikasi email.
* Proteksi CSRF dan SQL Injection.

---

## MVP (Versi Awal)

* Registrasi & Login
* Katalog akun ML dan FF
* Detail akun
* Checkout
* Upload bukti pembayaran
* Admin verifikasi
* Riwayat transaksi
