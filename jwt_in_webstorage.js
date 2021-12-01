const axios = require('axios');

const myJWT = 'eyJhbGciOfJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaWWiOiJka…afyMH0.WrIEBW5LNLjfGWqIA4XKsyIiuWzbIIpNadfZVkmA6hPs';

// store JWT in session storage
sessionStorage.setItem('JWT', myJWT);

console.log('My JWT is', sessionStorage.getItem('JWT'));

// remove JWT from storage
sessionStorage.removeItem('JWT');

// clear whole storage
sessionStorage.clear();

// localStorage uses the same API
// example: localStorage.setItem('JWT', myJWT);

// FRONT

const postToMyApi = payload =>
    axios.post(
        '/v1/my-api',
        {
            "request": payload.request
        },
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${payload.token}`
        }
    }
);
