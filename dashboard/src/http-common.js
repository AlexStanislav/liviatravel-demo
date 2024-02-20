import axios from 'axios';

export default axios.create({
    baseURL:  process.env.NODE_ENV === "development" ? "http://localhost:3000" : window.location.origin,
    headers: {
        'Content-Type': 'application/json'
    }
})