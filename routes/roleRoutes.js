const express = require("express");
const {
  createRole,
  getAllRoles,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");
const authenticate = require("../middlewares/authMiddleware"); // Authentication middleware
const authorize = require("../middlewares/roleMiddleware"); // RBAC middleware

const router = express.Router();

// Only admins can manage roles
const adminOnly = authorize(["Admin"]);

// Create a new role (Admin only)
router.post("/", authenticate, adminOnly, createRole);

// Get all roles (Admin only)
router.get("/", authenticate, adminOnly, getAllRoles);

// Update an existing role's permissions (Admin only)
router.put("/:role", authenticate, adminOnly, updateRole);

// Delete a role (Admin only)
router.delete("/:role", authenticate, adminOnly, deleteRole);

module.exports = router;
