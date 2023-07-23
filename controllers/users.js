const User = require("../models/users");

 exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please enter all required fields"
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const newUser = await User.create(req.body);

        req.session.user = newUser;

        return res.status(201).json({
            message: "User created successfully",
            newUser,
            customSession : req.session
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter all required fields"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        req.session.user = user;

        return res.status(200).json({
            message: "User logged in successfully",
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

exports.getUsers = async (req, res) => {
    try {
       const users = await User.find();
       console.log("testing nginx")
         return res.status(200).json({
            message: "Users fetched successfully",
            users
        }); 
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "User fetched successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}

exports.updateUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
          return res.status(404).json({
              message: "User not found"
          });
      }
      const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        return res.status(200).json({
            message: "User updated successfully",
            updateUser
        });
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await User.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message: "User deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }
}