const jwt = require('jsonwebtoken');

/**
 * @param {string[]} allowedRoles
 */
function verifyTokenWithRoles(allowedRoles = []) {
    return (request, response, next) => {
        const token = request.header('Authorization');
        if (!token) {
            return response.status(403).json({ error: 'Token não fornecido' });
        }

        jwt.verify(token, 'chave', (err, decoded) => {
            if (err) {
                return response.status(401).json({ error: 'Acesso negado. Token inválido' });
            }

            if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
                return response.status(403).json({ error: 'Acesso negado. Role insuficiente' });
            }

            request.user = decoded;
            next();
        });
    };
}

module.exports = verifyTokenWithRoles;