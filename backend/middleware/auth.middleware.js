export const authMiddleware = async() => {
    try {
        const authHeader = req.headers['Authorization'];
        const token = authHeader.split( )[1];

        if(!token){
            return res.status(404).json({
                success: false,
                message: "Token not present"
            })
        }

        //Verify JWT token

        next();
    } catch (error) {
        throw new Error({
            message: "Auth Middleware Error",
            error: error
        })
    }
}