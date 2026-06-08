Setelah melihat UI notifikasi yang Bos kirim, saya justru semakin yakin bahwa:

```text
NOTIFICATIONS harus ada tabel sendiri
```

karena notifikasi di sistem Bos bukan sekadar badge merah angka 3, tetapi sudah menjadi fitur bisnis yang lengkap:

* Pengingat sesi
* Pembayaran berhasil
* Sesi dimulai 30 menit lagi
* Tombol aksi (Lihat Jadwal Belajar)
* Status baru/sudah dibaca
* Timestamp relatif (5 menit lalu, 1 hari lalu)

---

# Yang Saya Lihat dari UI

Notifikasi berasal dari beberapa event berbeda:

```text
Booking dibuat
Booking diterima tutor
Pembayaran berhasil
H-1 sesi belajar
30 menit sebelum sesi
Tutor membatalkan sesi
Refund berhasil
Pengajuan tutor disetujui
```

Artinya notifikasi bukan entitas utama.

Dia adalah:

```text
hasil dari event yang terjadi di sistem
```

---

# ERD FINAL YANG SAYA SARANKAN

## USERS

```sql
USERS
------
id PK
name
email UNIQUE
password
avatar

account_type ENUM(
  'user',
  'admin'
)

created_at
updated_at
```

---

## TUTOR_APPLICATIONS

```sql
TUTOR_APPLICATIONS
------------------
id PK

user_id FK -> users.id
course_id FK -> courses.id

grade
transcript_file

status ENUM(
  'pending',
  'approved',
  'rejected'
)

admin_note

approved_by FK -> users.id

approved_at

created_at
updated_at
```

---

## TUTORS

```sql
TUTORS
------
id PK

user_id FK -> users.id

bio

rating_avg
total_reviews

is_active

created_at
updated_at
```

---

## COURSES

```sql
COURSES
-------
id PK

name
code

created_at
updated_at
```

---

## TUTOR_COURSES

```sql
TUTOR_COURSES
-------------
id PK

tutor_id FK -> tutors.id
course_id FK -> courses.id

price

created_at
updated_at
```

---

## MASTER_SLOTS

```sql
MASTER_SLOTS
------------
id PK

code

start_time
end_time
```

Contoh:

```text
A = 08:00-10:00
B = 10:00-12:00
```

---

## AVAILABILITY_SLOTS

```sql
AVAILABILITY_SLOTS
------------------
id PK

tutor_id FK -> tutors.id

day_of_week

slot_id FK -> master_slots.id

is_active

created_at
updated_at
```

---

# BOOKINGS

Saya tetap sarankan model ini.

```sql
BOOKINGS
--------
id PK

tutor_course_id FK

learner_id FK -> users.id

booking_date

slot_id FK -> master_slots.id

start_datetime
end_datetime

total_price

dp_amount

remaining_amount

status ENUM(
  'pending',
  'accepted',
  'rejected',
  'completed',
  'cancelled'
)

payment_status ENUM(
  'unpaid',
  'dp_paid',
  'paid',
  'refunded'
)

created_at
updated_at
```

---

# REVIEWS

Lebih sederhana.

```sql
REVIEWS
-------
id PK

booking_id FK

rating

comment

created_at
updated_at
```

Karena:

```text
booking
↓
sudah tahu learner siapa
sudah tahu tutor siapa
```

---

# NOTIFICATIONS

Nah ini yang muncul setelah melihat UI.

```sql
NOTIFICATIONS
-------------
id PK

user_id FK -> users.id

type ENUM(
  'booking',
  'payment',
  'session_reminder',
  'application',
  'system'
)

title

message

action_url

is_read

read_at

created_at
```

---

# Kenapa action_url?

Karena UI Bos punya:

```text
[Lihat Jadwal Belajar]
```

Maka backend bisa mengirim:

```json
{
  "title": "Pembayaran Berhasil",
  "action_url": "/jadwal-belajar"
}
```

Frontend tinggal render tombol.

---

# Contoh Data Notifikasi

```sql
id = 1

user_id = 5

type = session_reminder

title = Pengingat Sesi Besok

message =
Persiapkan diri Anda untuk sesi Algoritma

action_url =
/booking/23

is_read = false
```

---

# Apakah Perlu Tabel RECOMMENDATIONS?

Masih:

```text
TIDAK
```

Karena rekomendasi tutor bisa dihitung dari:

```text
tutors.rating_avg
tutors.total_reviews
booking history learner
course yang dipelajari
```

yang semuanya sudah ada.

---

# Relasi Final

```text
USERS
 │
 ├── TUTOR_APPLICATIONS
 │
 ├── TUTORS
 │      │
 │      ├── TUTOR_COURSES
 │      │       │
 │      │       └── COURSES
 │      │
 │      └── AVAILABILITY_SLOTS
 │               │
 │               └── MASTER_SLOTS
 │
 ├── BOOKINGS
 │      │
 │      ├── TUTOR_COURSES
 │      └── MASTER_SLOTS
 │
 ├── REVIEWS
 │
 └── NOTIFICATIONS
```

---

# Satu Catatan Penting

Saya akan menambah satu relasi virtual yang tidak perlu disimpan di tabel:

```text
Tutor
 ↓
hasMany Booking (mengajar)

Learner
 ↓
hasMany Booking (belajar)
```

Karena nanti endpoint seperti:

```http
GET /learner/bookings/history

GET /tutor/teachings/history

GET /dashboard/stats
```

semuanya dihitung dari tabel `BOOKINGS`.

Jadi untuk versi skripsi/capstone, menurut saya ERD final Bos cukup berisi:

```text
USERS
TUTOR_APPLICATIONS
TUTORS
COURSES
TUTOR_COURSES
MASTER_SLOTS
AVAILABILITY_SLOTS
BOOKINGS
REVIEWS
NOTIFICATIONS
```

Tanpa tabel tambahan untuk rekomendasi tutor. Ini sudah mendukung dashboard, booking, pembayaran, riwayat belajar, riwayat mengajar, tutor recommendation, dan halaman notifikasi yang Bos tunjukkan.
