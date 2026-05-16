import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Extracts the actual token even if "Bearer" is repeated
        const token = authHeader.split(' ').pop();

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedToken;
            next();
        } catch (error) {
            console.error('JWT Verification Error:', error.message);
            res.status(401).json({ message: 'Invalid token' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { authMiddleware }