import User from '../models/User.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); 
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const updateUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.isAdmin = req.body.isAdmin; // Frontend se aane wala naya role
            const updatedUser = await user.save();
            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
            });
        } else {
            res.status(404).json({ message: 'User nahi mila bhai' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.role === 'admin') {
        return res.status(400).json({ message: "Admin ko delete nahi kar sakte bhai!" });
      }

      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User successfully delete ho gaya!' });
    } else {
      res.status(404).json({ message: 'User nahi mila' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};