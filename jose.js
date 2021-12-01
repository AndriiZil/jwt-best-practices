const { SignJWT, jwtVerify, importSPKI, importPKCS8 } = require('jose');

const privateKey =
    `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIMpFEKC3T8wWYu2e+63MuicRSt4ddWXGIZFXw4vnk+aL
-----END PRIVATE KEY-----`;

const publicKey =
    `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEA+L7HHlAU8Zviz0MCX4VSY1xRnX0UTSwb2bQPF6Oqh0g=
-----END PUBLIC KEY-----`;

const data = {
    iss: 'https://domain.tld',
    sub: 'martin@mail.tld',
    aud: 'https://domain.tld',
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
    nbf: Math.floor(Date.now() / 1000),
    jti: 'asfasgsadg',
    data: { some: 'information' }
};

(async () => {
    const importedPrivateKey = await importPKCS8(privateKey, 'EdDSA');
    const jwt = await new SignJWT(data).setProtectedHeader({ alg: 'EdDSA' }).sign(importedPrivateKey);
    console.log('JWT', jwt);

    const importedPublicKey = await importSPKI(publicKey, 'EdDSA');

    const { payload, protectedHeader } = await jwtVerify(jwt, importedPublicKey, {
        issuer: 'https://domain.tld',
        audience: 'https://domain.tld'
    });

    console.log('protected header', protectedHeader);
    console.log('jwt payload', payload);
})();
