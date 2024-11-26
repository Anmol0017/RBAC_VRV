const Role = require('../models/roleModel');

// Create a new role
const createRole = async (req, res) => {
  try {
    const { role, permissions } = req.body;

    // Check if role already exists
    const existingRole = await Role.findOne({ role });
    if (existingRole) {
      return res.status(400).json({ success: false, message: "Role already exists." });
    }

    // Create new role
    const newRole = await Role.create({ role, permissions });
    res.status(201).json({
      success: true,
      message: "Role created successfully.",
      data: newRole,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ success: true, data: roles });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a role's permissions
const updateRolePermissions = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { permissions } = req.body;

    // Find role and update permissions
    const updatedRole = await Role.findByIdAndUpdate(
      roleId,
      { permissions },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ success: false, message: "Role not found." });
    }

    res.status(200).json({
      success: true,
      message: "Role permissions updated successfully.",
      data: updatedRole,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a role
const deleteRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    // Delete role
    const deletedRole = await Role.findByIdAndDelete(roleId);

    if (!deletedRole) {
      return res.status(404).json({ success: false, message: "Role not found." });
    }

    res.status(200).json({
      success: true,
      message: "Role deleted successfully.",
      data: deletedRole,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  updateRolePermissions,
  deleteRole,
};
