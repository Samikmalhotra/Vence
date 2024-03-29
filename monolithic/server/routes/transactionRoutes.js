import express from 'express'
const router = express.Router()
import { admin, protect } from '../middlewares/authMiddlewares.js'
import {addTransactionItems, getTransactionById, getTransactions} from '../controllers/transactionControllers.js'

router.route('/').post(protect, addTransactionItems).get(protect, admin, getTransactions)
router.route('/:id').get(protect, admin, getTransactionById)
router.route('/shop/:id').get(protect, admin, getTransactions)

export default router