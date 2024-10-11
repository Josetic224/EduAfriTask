const express = require('express');
const {createCourse} = require('../courses/course');
const { isAuthenticated, isAdmin } = require('../authorization/auth');
const router = express.Router();


/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     description: Endpoint to create a new course. Requires a name, cover picture, category, createdBy, amount, and rating. Only accessible by authenticated and authorized admin users.
 *     tags: 
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - coverpic
 *               - category
 *               - createdBy
 *               - Amount
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the course
 *                 example: "Introduction to Web Development"
 *               coverpic:
 *                 type: string
 *                 description: URL of the course cover picture
 *                 example: "https://example.com/cover.jpg"
 *               category:
 *                 type: string
 *                 description: Category of the course
 *                 example: "webdevelopment"
 *               createdBy:
 *                 type: string
 *                 description: ID of the course creator
 *                 example: "user12345"
 *               Amount:
 *                 type: integer
 *                 description: Price of the course in Naira
 *                 example: 5000
 *               Rating:
 *                 type: number
 *                 description: Optional course rating (1-5 scale)
 *                 example: 4.5
 *     responses:
 *       201:
 *         description: Course successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the newly created course
 *                   example: "course12345"
 *                 name:
 *                   type: string
 *                   description: Name of the course
 *                   example: "Introduction to Web Development"
 *                 coverpic:
 *                   type: string
 *                   description: URL of the course cover picture
 *                   example: "https://example.com/cover.jpg"
 *                 category:
 *                   type: string
 *                   description: Category of the course
 *                   example: "webdevelopment"
 *                 createdBy:
 *                   type: string
 *                   description: ID of the course creator
 *                   example: "user12345"
 *                 Amount:
 *                   type: integer
 *                   description: Price of the course in Naira
 *                   example: 5000
 *                 Rating:
 *                   type: number
 *                   description: Optional course rating
 *                   example: 4.5
 *       400:
 *         description: Validation error or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input, missing required fields"
 *       401:
 *         description: Unauthorized - User is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Authentication token missing or invalid"
 *       403:
 *         description: Forbidden - User is not authorized (not an admin)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Access forbidden, admin privileges required"
 */


router.post('/courses', isAuthenticated, isAdmin, createCourse);

module.exports = router;
