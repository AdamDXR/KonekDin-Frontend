# KonekDin Backend Update - Tutor Reviews & Rating Summary

## Tujuan
Menyediakan data yang benar-benar dibutuhkan oleh halaman **Tutor - Ulasan & Rating** di frontend, yaitu:
- ringkasan rating tutor
- distribusi bintang 5 sampai 1
- daftar ulasan
- filter berdasarkan rating
- pagination server-side

---

## Endpoint Utama

### 1. `GET /api/tutor/reviews`
Mengambil daftar ulasan tutor beserta metadata pagination dan ringkasan rating.

#### Query Params
- `rating`  
  Filter ulasan berdasarkan rating tertentu.  
  Contoh: `?rating=5`
- `page`  
  Nomor halaman.  
  Contoh: `?page=1`
- `per_page`  
  Jumlah item per halaman.  
  Contoh: `?per_page=3`

#### Contoh Request
```http
GET /api/tutor/reviews?page=1&per_page=3&rating=5

Response Success

{
  "data": [
    {
      "id": 1,
      "rating": 5,
      "comment": "Penjelasannya sangat jelas dan mudah dipahami.",
      "learner": {
        "id": 10,
        "name": "Siti Aminah",
        "avatar": "avatars/siti.jpg"
      },
      "course": {
        "id": 3,
        "name": "BASIS DATA"
      },
      "created_at": "2026-03-26 09:30:00",
      "session_time": "09:30 - 11:10"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 3,
    "total": 13
  },
  "summary": {
    "average_rating": 4.9,
    "total_reviews": 128,
    "satisfaction_percent": 98,
    "rating_distribution": [
      { "rating": 5, "count": 108 },
      { "rating": 4, "count": 15 },
      { "rating": 3, "count": 3 },
      { "rating": 2, "count": 2 },
      { "rating": 1, "count": 0 }
    ]
  }
}

Catatan Response
-data = list ulasan untuk halaman aktif
-meta = data pagination server-side
-summary = data ringkasan untuk card atas dan grafik bar

Field Yang Dipakai Frontend
Item Ulasan (Frontend membutuhkan field berikut per item):
-id
-rating
-comment
-learner.name
-learner.avatar
-course.name
-created_at
-session_time

Ringkasan (Frontend membutuhkan):
-summary.average_rating
-summary.total_reviews
-summary.satisfaction_percent
-summary.rating_distribution

Pagination (Frontend membutuhkan):
-meta.current_page
-meta.last_page
-meta.per_page
-meta.total

Aturan Filter
-Jika parameter rating dikirim, endpoint hanya mengembalikan ulasan dengan rating tersebut.
-Jika parameter rating tidak dikirim, endpoint mengembalikan semua ulasan.

Filter tetap mengikuti pagination server-side.

Contoh:

GET /api/tutor/reviews?rating=5&page=1&per_page=3
GET /api/tutor/reviews?page=2&per_page=3

Empty State
Jika tidak ada data ulasan, response tetap sukses dengan format:

{
  "data": [],
  "meta": {
    "current_page": 1,
    "last_page": 1,
    "per_page": 3,
    "total": 0
  },
  "summary": {
    "average_rating": 0,
    "total_reviews": 0,
    "satisfaction_percent": 0,
    "rating_distribution": [
      { "rating": 5, "count": 0 },
      { "rating": 4, "count": 0 },
      { "rating": 3, "count": 0 },
      { "rating": 2, "count": 0 },
      { "rating": 1, "count": 0 }
    ]
  }
}

Frontend akan menampilkan: Belum ada ulasan dari mahasiswa

Standard Error Response
Gunakan format error global Laravel yang sudah ada:

422 - Validation Error :

{
  "message": "The rating field must be an integer.",
  "errors": {
    "rating": ["The rating field must be an integer."]
  }
}

401 - Unauthorized :

{
  "message": "Unauthenticated."
}

500 - Server Error : 

{
  "message": "Server Error"
}

Rekomendasi Implementasi Backend
Untuk memudahkan frontend, disarankan response endpoint ini selalu mengembalikan struktur yang konsisten:

-data
-meta
-summary

Dengan begitu frontend tidak perlu menghitung ulang:

-rata-rata rating
-distribusi bintang
-total ulasan
-kepuasan mahasiswa