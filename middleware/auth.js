const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, 'emma_le_tchonk');
        const id = decodedToken.id;
        if (req.body.user_id && parseInt(req.body.user_id) !== id) {
            res.json({
                success: false,
                error: "Identifiant incorrect"
            })
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            success: false,
            error: "Authentification échouée"
        });
    }
};
