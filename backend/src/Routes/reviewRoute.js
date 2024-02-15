import express from 'express'
import * as Review from '../Controllers/reviewController.js'

const router = express.Router();

router.get('/:id', Review.getReview)
router.get('/', Review.getAllReviews)
router.post('/', Review.createReview)
router.post('/:id', Review.updateReview)
router.post('/:id', Review.deleteReview)

export default router