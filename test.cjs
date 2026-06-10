const axios = require('axios');
async function test() {
  try {
    const loginRes = await axios.post('http://127.0.0.1:8000/api/login', {
      email: '111learner@mhs.dinus.ac.id',
      password: 'password'
    });
    console.log("Login token:", loginRes.data.access_token);
    
    const tutorRes = await axios.get('http://127.0.0.1:8000/api/tutors', {
      headers: { Authorization: `Bearer ${loginRes.data.access_token}` }
    });
    console.log("Tutors:", tutorRes.data.data.length);
  } catch (e) {
    console.error("Error:", e.response ? e.response.status : e.message);
  }
}
test();
