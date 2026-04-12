import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const authMiddleware = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return res.status(401).json({ message: 'Token nahi mila' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decoded.id || decoded._id; 
        req.user = await User.findById(userId).select('-password')
        
        console.log("LOGGED IN USER:", req.user?.email, "| ROLE:", req.user?.role)
        
        next()
    } catch (error) {
         console.log("TOKEN ERROR:", error.message)
         return res.status(401).json({ message: 'Invalid token' })
    }
}

export const adminMiddleware = (req, res, next) => {
    console.log("CHECKING ROLE FOR:", req.user?.email, "| ROLE IS:", req.user?.role);
    
    if (req.user && req.user.role === 'admin') { 
        next(); 
    } else {
        res.status(403).json({ message: 'Bhai, tu Admin nahi hai!' });
    }
};

export default authMiddleware