import jwt from 'jsonwebtoken' 

const authUser = async (req,res,next)  => {
     
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
        return res.json({success: false, message: 'Not Authorized. Login again'})
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = token_decode.id 
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message })
    }
}

export default authUser
