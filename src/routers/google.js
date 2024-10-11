const express = require('express');
const { authenticate, callback } = require('../users/google/google');
const router = express.Router();

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Authenticate with Google
 *     description: Redirects the user to Google's OAuth 2.0 authentication page.
 *     tags: 
 *       - Google OAuth
 *     responses:
 *       302:
 *         description: Redirects to Google's OAuth 2.0 login page.
 *       500:
 *         description: Internal server error.
 */
router.get("/auth/google", authenticate);

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     description: Handles the callback from Google after successful authentication and processes user information.
 *     tags: 
 *       - Google OAuth
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Authorization code returned by Google after authentication.
 *     responses:
 *       200:
 *         description: Authentication successful and user data is saved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Google Auth Completed and user info saved"
 *       400:
 *         description: Invalid code or authentication error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error during Google OAuth Callback"
 *       500:
 *         description: Internal server error.
 */
router.get("/auth/google/callback", callback);

module.exports = router;
