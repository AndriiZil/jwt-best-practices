const jwt = require('jsonwebtoken');

const data = { some: 'json' };

const key = '6dth5+dtr_)t56595#d5g4*hg9h';

const token = jwt.sign(data, key) // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb21lIjoianNvbiIsImlhdCI6MTYzODM1MTA2OX0.pS8fWcl0PxY5JYzADKYM8ktnwwJWgjTeNJ39FLDDbT8

const decoded = jwt.verify(token, key);

console.log(decoded); // { some: 'json', iat: 1638351188 }
