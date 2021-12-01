## JSON Web Token (JWT)

### JSON Web Token (JWT) is a standard RFC 7519 for exchanging cryptographically signed JSON data
https://www.npmjs.com/package/jsonwebtoken
https://www.npmjs.com/package/jose
https://jwt.io/

* iss: issuer string or URI,
for example: "iss": "https://didauth.meet-martin.com"
* sub: subject identifier string or URI,
for example: "sub": "OCfs425k"
* aud: audience string or URI, or an array of these,
for example: "aud": "https://api.meet-martin.com"
* exp, expiration time after which the token is not valid by NumericDate,
for example: "exp": "1630983721"
* nbf, not before identifies NumericDate before which the token cannot be accepted,
for example: "nbf": "1630983612"
* iat, issue at contains NumbericDate of when the token was issued,
for example: "iat": "163983612"
* jti, JWT, holds a unique identifier of the JWT as a case sensitive string,
for example: "jti": "fsg1R34"

### What encryption should you use?
* The most commonly used algorithm for JWT encryption is HMAC and RSA. Other algorithms are supported as well including 
RSASSA-PKCS, RSASSA-PSS, and `ECDSA`. The default is `HMAC`, the most popular is `RSA`, and the most secure is `ECDSA`.

* HMAC - механізм перевірки цілісності інформації, що передається або зберігається в ненадійному середовищі
* RSA - криптографічний алгоритм з відкритим ключем, що базується на обчислювальній складності задачі факторизації великих цілих чисел.
* ECDSA - алгоритм з відкритим ключем для створення цифрового підпису, аналогічний за своєю будовою DSA, але визначений, 
на відміну від нього, не над кільцем цілих чисел, а в групі точок еліптичної кривої.

### HMAC

* The most simple and least secure option is HS256 which is HMAC with SHA-256. It is a symmetric algorithm which means 
  that one secret is used for both signing and verifying the token. An example of a secret would be: Much$3cr3tS0S3cureVerySafe.
  In this case, the authentication service as well as all services requiring authorization will need access to the same 
  key which potentially opens more opportunities for stealing it through some API exploit.
  It is not generally not recommended for production use. Nonetheless, it is easier for demo applications or code examples

### RSA
* Your other option for JWT is to use RS256 (RSA with SHA-256) which is an `asymmetric encryption` algorithm using private 
and public keys. It is also probably the most common algorithm used by web applications because a lot of developers 
are familiar with it even though it is not the most secure or most performant option.
A private key is used by the authentication service to produce the original token. The public key is then used by other 
services to verify the token. If the public key is compromised, it can be used to read the data, but it cannot be used 
to create other tokens. Using RSA over HMAC is recommended.
The public key can also be kept public for other third-party consumers so that by using it anyone can access the data 
in the token and verify that the data are really coming from you because they are signed by your private key.
* You can generate your RSA public and private keys by `openssl`:
```
    # private key
    openssl genpkey -algorithm rsa -out rsa-private.pem
    
    # public key
    openssl pkey -in rsa-private.pem -pubout -out rsa-public.pem
```
### ECDSA
* When using `jsonwebtoken` node library, your best option is ES512, which is Elliptic Curve Digital Signature Algorithm 
(ECDSA) using a P-521 curve and SHA-512 hash algorithm. ECDSA is also used by bitcoin. 
ECDSA is another asymmetric encryption like RSA and it is considered to be the more secure option.

* You can generate your ECDSA ES512 public and private keys by `openssl`:
```
    # private key
    openssl ecparam -genkey -name secp521r1 -noout -out es512-private.pem
    
    # public key
    openssl ec -in ecdsa-p521-private.pem -pubout -out es512-public.pem
```
* If you use `jose` node library, you will also get access to Edwards-curve Digital Signature Algorithm (EdDSA) encryption 
algorithm, which is the ultimate best option for JWT implementation. It uses SHA-512 and Curve 25519 to give the Ed25519 method.
EdDSA, as you can guess, is an asymmetric algorithm that uses public and private keys so its use is the same as with RSA or ECDSA. 
EdDSA has better performance and even shorter keys than ECDSA while providing better security.

* You can generate your `EdDSA ed25519` public and private keys by `openssl`:
```
    # private key
    openssl genpkey -algorithm ed25519 -out eddsa-private.pem
    
    # public key
    openssl pkey -in eddsa-private.pem -pubout -out eddsa-public.pem
```
* `EdDSA` is the most secure and performant option that you can currently use for a JWT signature.
