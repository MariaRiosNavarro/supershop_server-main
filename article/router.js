import express from 'express'
import multer from 'multer'
import { addArticle, getAllArticles } from './controller.js'
const upload = multer({ dest: './images' })
export const router = new express.Router()

router.post('/', upload.single('articleimage'), addArticle)
router.get('/', getAllArticles)