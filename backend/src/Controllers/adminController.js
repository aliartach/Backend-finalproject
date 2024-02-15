import mongoose from 'mongoose'
import Admin from '../Models/adminModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "test", error: error.message });
  }
};
export const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Admin not found!' });
    }

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found!' });
    }

    res.status(200).json({ admin });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const register = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Here we hash the passsword

  try {
    // Here we check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already in use!' });
    }

    // Here we check if the password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match!' });
    }

    // Here we register the admin
    const admin = await Admin.create({
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Admin created successfully!', admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  const secretKey = process.env.JWT_SECRET;

  try {
    if (!secretKey) {
      throw new Error('JWT secret key not configured.');
    }
    const admin = await Admin.findOne({ email });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ error: 'Invalid email or password!' });
    }

    const token = jwt.sign({ id: admin._id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ message: 'Logged in Successfully!', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message })
  }
};
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Admin not found!' });
    }

    // Extract new password from request body, if provided
    const { password, ...otherFields } = req.body;

    // If password is provided, hash it
    let updatedFields = otherFields;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    // Update admin with the new fields
    const admin = await Admin.findOneAndUpdate({ _id: id }, updatedFields, { new: true });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found!' });
    }

    // Do not include password in the response
    delete admin.password;

    res.status(200).json({ message: 'Admin was updated successfully!', admin });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Admin not found!' });
    }

    const admin = await Admin.findByIdAndDelete(id);

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found!' });
    }

    res.status(200).json({ message: 'Admin was deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};