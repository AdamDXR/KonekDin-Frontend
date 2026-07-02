import Axios from 'axios';

const axios = Axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});

// Interceptor untuk menyisipkan token otomatis (jika user sudah login)
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor untuk menangani error respons secara global
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            const msg = error.response?.data?.message?.toLowerCase() || '';
            const isSuspended = msg.includes('suspend') || msg.includes('ditangguhkan');

            // Token expired atau tidak valid atau akun disuspend
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('role');
            
            // Redirect ke login jika bukan sedang di halaman login
            if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                if (isSuspended) {
                    const message = error.response?.data?.message || 'Akun Anda telah disuspend.';
                    window.location.href = `/login?suspended=true&message=${encodeURIComponent(message)}`;
                } else {
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axios;
