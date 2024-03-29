import path from 'path'
import express from 'express'
import { notFound, errorHandler } from './middlewares/errorMiddlewares.js'
import connectDB from './config/db.js'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()
import userRoutes from './routes/userRoutes.js'
import shopRoutes from './routes/shopRoutes.js'
import productRoutes from './routes/productRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import cors from 'cors'
import employeeRoutes from './routes/employeeRoutes.js'

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

  app.use(express.json())
  app.use(cors())

  app.use('/api/products', productRoutes)
  app.use('/api/users', userRoutes)
  app.use('/api/shops', shopRoutes)
  app.use('/api/transactions', transactionRoutes)
  app.use('/api/employees', employeeRoutes)
  app.use('/api/upload', uploadRoutes)

    const __dirname = path.resolve()
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  ))