import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import { errorHandler } from "./middleware/errorMiddleware.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import categoryRouter from "./routes/categoryRoutes.js"
import productRouter from "./routes/productRoutes.js"
import wishlistRouter from "./routes/wishlistRoutes.js"
import messageRouter from "./routes/messageRoutes.js"
import cartRouter from "./routes/cartRoutes.js"
import checkoutRouter from "./routes/checkoutRoutes.js"
import orderRouter from "./routes/orderRoutes.js"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
const app = express()
const port = process.env.PORT || 5000
const ORIGINS = [process.env.CLIENT_ORIGIN, process.env.ADMIN_ORIGIN]

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO)
    console.log("connected to mongodb")
  } catch (error) {
    throw error
  }
}

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  cors({
    credentials: true,
    // origin: function (origin, callback) {
    //   if (ORIGINS.indexOf(origin) !== -1) {
    //     callback(null, true)
    //   } else {
    //     callback(new Error("Not allowed by CORS"))
    //   }
    // },
  })
)

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/category", categoryRouter)
app.use("/api/product", productRouter)
app.use("/api/wishlist", wishlistRouter)
app.use("/api/message", messageRouter)
app.use("/api/cart", cartRouter)
app.use("/api/checkout", checkoutRouter)
app.use("/api/order", orderRouter)

app.get("/api/publishableKey", (req, res) => {
  res.status(200).json({ key: process.env.STRIPE_PUBIC })
})

app.get("/start", (req, res) => {
  res.status(200).json({ message: "Hello from API" })
})

app.use("/admin", express.static(path.join(__dirname, "./admin/build")))

app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./admin/build", "index.html"))
})

app.use(express.static(path.join(__dirname, "./client/build")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"))
})

app.use(errorHandler)

app.listen(port, () => {
  connect()
  console.log(`listening to port ${port}`)
})
