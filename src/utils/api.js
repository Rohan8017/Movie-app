import axios from "axios";

export const fetchDataFromApi = async (url,params) => {
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3${url}`,
        params,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjllY2I3Mjg0ZWQ1MGU2NGYwMTYwMmYzYzM0ODY3YSIsInN1YiI6IjY0MzQxM2NlZWM0NTUyMDBiNTgxMjIzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hCa4bfM4kknDvRy8aHTppTdXVAGYPM2dQYqPlJhesm4'
        }
    };
    try {
        const { data } = await axios.request(options)
        return data;
    } catch (err) {
        console.log(err);
    }
}