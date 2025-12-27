import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoute.js'

const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

// ✅ Body parser
app.use(express.json())

// ✅ CORS (LOCAL + PROD)
app.use(
  cors({
    origin: [
      "http://localhost:5173",          // ✅ local frontend
      "https://zeestyle.in",
      "https://www.zeestyle.in",
      "https://ecommerce-websiteadmin.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    credentials: true
  })
)

// ✅ Routes
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
  res.send("API working")
})

app.listen(port, () =>
  console.log('Server Started on PORT : ' + port)
)
