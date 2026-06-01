import jwt from 'jsonwebtoken' 

const adminAuth = async(req,res,next) => {
     try {
         
        const {token}  = req.headers;
        if(!token) {
             return res.json({success:false , message: "Not Authorised Login Again"})

        } 

        const decode_token  = jwt.verify(token,process.env.JWT_SECRET);
        if(decode_token.role !== 'admin' || decode_token.email !== process.env.ADMIN_EMAIL ){
            return res.json({success:false, message: "Not Authorised Login Again"})
        }
        next()   
                     
     } catch (error) {
          console.log(error);
          res.json({success:false, message: error.message});
     }
}  

export default adminAuth
