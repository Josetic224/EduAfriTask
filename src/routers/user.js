const express = require('express')
const { signup, login } = require('../users/signup/signup')
const router = express.Router()





/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with a name, email, password, and role.
 *     tags: 
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: Email of the user
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: Password for the user
 *                 example: secret123
 *               confirmPassword:
 *                 type: string
 *                 description: Password for the user
 *                 example: secret123
 *              
 *     responses:
 *       200:
 *         description: User successfully signed up
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User Signed UP successfully"
 *                 newUser:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "abc123"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *       400:
 *         description: Validation errors or email already registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "This email is already registered"
 */
router.post("/signup", signup);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in a user
 *     description: Log in a user using their email and password.
 *     tags: 
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: Password for the user
 *                 example: secret123
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User logged in successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "abc123"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                 token:
 *                   type: string
 *                   description: JWT token for user authentication
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Validation errors or incorrect email/password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid email or password"
 */


router.post("/login",login)



module.exports = router;



