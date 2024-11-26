const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role: { type: String, required: true, unique: true },
  permissions: { type: [String], default: [] }, // Array of permissions
});

module.exports = mongoose.model('Role', roleSchema);
