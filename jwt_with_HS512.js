const jwt = require('jsonwebtoken');

const privateKey =
    `-----BEGIN EC PRIVATE KEY-----
MIHcAgEBBEIANjT0EzYXVqsHeKitVMvAQ57pzZWcv5QEWsCap4hl3mk/DIkRCYzg
9YGcBtLWhuNitEeKFGLi91rohc2EzmTVIbOgBwYFK4EEACOhgYkDgYYABAFjzu7a
UwPT7fIFtwc89Vrkj4a1iXOYNhWEZ97V2EbpFq3AU28o7MoV+IbSv/VrGsHA/1SD
OOFabnyu3QbVxOywXQAEOowT5Hw6ue+ULtRqQ7m7gs1UMyaf6k9Sqv1zxkrNoWBA
OzMWISxnOoNE3Zn3jaUTv9jBSki5mheMALDaSoIGxw==
-----END EC PRIVATE KEY-----
`;

const publicKey =
    `-----BEGIN PUBLIC KEY-----
MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQBY87u2lMD0+3yBbcHPPVa5I+GtYlz
mDYVhGfe1dhG6RatwFNvKOzKFfiG0r/1axrBwP9UgzjhWm58rt0G1cTssF0ABDqM
E+R8OrnvlC7UakO5u4LNVDMmn+pPUqr9c8ZKzaFgQDszFiEsZzqDRN2Z942lE7/Y
wUpIuZoXjACw2kqCBsc=
-----END PUBLIC KEY-----
`;

const data = {
    iss: 'https://domain.tld',
    sub: 'andrii@gmail.tld',
    aud: 'https://domain.tld',
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
    nbf: Math.floor(Date.now() / 1000),
    jti: 'asfasgsadg',
    data: { some: 'information' }
};

const encrypted = jwt.sign(data, privateKey, { algorithm: 'ES512' });
console.log('encrypted', encrypted);
// encrypted eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2RvbWFpbi50bGQiLCJzdWIiOiJhbmRyaWlAZ21haWwudGxkIiwiYXVkIjoiaHR0cHM6Ly9kb21haW4udGxkIiwiZXhwIjoxNjM4MzU1MTczLCJuYmYiOjE2MzgzNTE1NzMsImp0aSI6ImFzZmFzZ3NhZGciLCJkYXRhIjp7InNvbWUiOiJpbmZvcm1hdGlvbiJ9LCJpYXQiOjE2MzgzNTE1NzN9.AaGp1k0fxfJXF1w-z1ydbuLnDnf9egMGPzI6-AhXnbYUz5ZQJrVmzj3w30IJgkeQMgOtUqMJZNRsOhvaleB8gqLgAP0R9CCQbaTwi4M2ZCVl5uSCJwux6G9Yl1qKT39YzFKe6syJDytCPKZ3Lc32pMlG23d33jx2E3b_ehdMDMSmtAwA

const decrypted = jwt.verify(encrypted, publicKey, { algorithms: ['ES512'], audience: 'https://domain.tld', issuer: 'https://domain.tld' });
console.log('decrypted', decrypted);

// decrypted { iss: 'https://domain.tld',
//   sub: 'andrii@gmail.tld',
//   aud: 'https://domain.tld',
//   exp: 1638355173,
//   nbf: 1638351573,
//   jti: 'asfasgsadg',
//   data: { some: 'information' },
//   iat: 1638351573 }
