import mongoose from 'mongoose'
import Review from '../Models/reviewModel.js'

// Create a review
export const createReview = async (req, res) => {
    const { rating, reviewText, clientID, productID } = req.body;
    try {
        
        const review = await Review.create({ rating, reviewText, clientID, productID });
        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Get all reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mssg: "you have zero ratings" });
    }
};
// Get a specific review
export const getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ error: "Review not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Update a review
export const updateReview = async (req, res) => {
    try {
        const { rating, reviewText } = req.body;
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            { rating, reviewText },
            { new: true }
        );
        if (updatedReview) {
            res.status(200).json(updatedReview);
        } else {
            res.status(404).json({ error: "Review not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// Delete a review
export const deleteReview = async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (deletedReview) {
            res.status(204).send("Review deleted successfully");
        } else {
            res.status(404).json({ error: "Review not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
