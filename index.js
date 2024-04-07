/* 
    ------------------
    POST-LOGIN
    ------------------
*/
const jwt = require('jsonwebtoken');

const jwtSecret = 'chiave_super_segreta'; // Da tenere segreta/privata
const jwtExpirationMs = 3600000; // Durata del token (ad es. 1 ora)

const userData = {
    id: 123,
    username: 'mario.rossi',
    roles: [
        'user',
        'admin'
    ]
};

const jwtToken = jwt.sign(
    /* Inizio payload */
    {
        id: userData.id,
        username: userData.username,
        roles: userData.roles
    },
    /* Fine payload */

    jwtSecret,
    
    /* Inizio options */
    {
        expiresIn: jwtExpirationMs
    }
    /* Fine options */
);

console.log("Il tuo token è: ", jwtToken);

const splittedJwtToken = jwtToken.split('.');
const jwtTokenData = [
    ["Header", splittedJwtToken[0]],
    ["Payload", splittedJwtToken[1]],
    ["Signature", splittedJwtToken[2]],
];

console.table(jwtTokenData);

// --------------------------------------------------------------------------

/* 
    ------------------
    ALL'ARRIVO DI UNA RICHIESTA
    ------------------
*/
// Verifico il token
try {
    const decodedJwt = jwt.verify(   // Se il token non è valido, solleva un'eccezione
        jwtToken,
        jwtSecret                    // Stessa secret usata per creare il token
    );

    console.log("Token decodificato: ", decodedJwt);
}
catch (error) {
    console.error("Token non valido o scaduto: ", error.message);
}