const express = require('express');
const axios = require('axios');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jobapi'
});

app.get('/api/jobs', async (req, res) => {
  const query = req.query.q || 'intern'; // Default to "intern"
  
  try {
    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: { query: query, page: '1', num_pages: '1' },
      headers: {
        'X-RapidAPI-Key': 'f7ba7d6a26msh54aeb321c7fdcc5p1192f8jsna98191d363b2',
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);
    res.json(response.data.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
