const users = require('../models/users');

const addAdmin = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await users.findOne({ username: username });

    if (user === null) {
      const newAdmin = new users({
        username: username,
        role: 'admin',
      });
      const S = await newAdmin.save();
      res.json(S);
    } else {
      role = 'admin';
      const result = await users.updateOne(
        { _id: user._id },
        { $set: { role } }
      );
      res.status(200).json({ message: 'Existing user updated to Admin: ' });
    }
  } catch (err) {
    res.status(401).json({ message: err });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = await users.findById(adminId);

    if (admin != null) {
      var deleteQuery = { _id: adminId };
      users.deleteOne(deleteQuery, (err) => {
        if (err) throw err;
        res
          .status(200)
          .json({ message: `${admin.username} is deleted successfully` });
      });
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (err) {
    res.status(204).json({ message: err });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const user = await users.find();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(401).json({ Message: err });
  }
};

module.exports = {
  addAdmin,
  deleteAdmin,
  getAllAdmins,
};
