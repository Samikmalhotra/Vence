import path from 'path'
import express from 'express'
// import { notFound, errorHandler } from './middlewares/errorMiddlewares'
import connectDB from './config/db.js'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()
// import userRoutes from './routes/userRoutes.js'


connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

  app.use(express.json())

//   app.use('/api/products', productRoutes)
//   app.use('/api/users', userRoutes)
//   app.use('/api/orders', orderRoutes)
//   app.use('/api/upload', uploadRoutes)

    // const __dirname = path.resolve()
    // app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// app.use(notFound)
// app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  ))