import express from 'express'
import { sydneyEvents } from '../auhtcontroller.js'

const router=express.Router()

router.get('/sydney-event',sydneyEvents)

export default router