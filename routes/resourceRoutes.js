const express = require('express');
const authenticate = require('../middlewares/authMiddleware'); // Authentication middleware
const authorize = require('../middlewares/roleMiddleware'); // RBAC middleware

const router = express.Router();

// Example: Public resource
router.get('/public', (req, res) => {
  res.status(200).json({ message: "This is a public resource." });
});

// Example: Resource accessible only by authenticated users
router.get('/private', authenticate, (req, res) => {
  res.status(200).json({ message: "This is a private resource accessible to authenticated users." });
});

// Example: Admin-only resource
router.get('/admin', authenticate, authorize(['Admin']), (req, res) => {
  res.status(200).json({ message: "This is an admin-only resource." });
});

// Example: Moderator-only resource
router.get('/moderator', authenticate, authorize(['Moderator']), (req, res) => {
  res.status(200).json({ message: "This is a moderator-only resource." });
});

// Example: Resource accessible by Admin and Moderator roles
router.get('/restricted', authenticate, authorize(['Admin', 'Moderator']), (req, res) => {
  res.status(200).json({ message: "This resource is accessible to Admin and Moderator roles." });
});

module.exports = router;
