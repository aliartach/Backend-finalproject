import mongoose from 'mongoose'
import Client from '../Models/clientModels.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getClients = async (req, res) => {
    try {
      const clients = await Client.find();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ message: "test?", error: error.message });
    }
  };
  export const getClient = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Admin not found!' });
      }
  
      const client = await Client.findById(id);
  
      if (!client) {
        return res.status(404).json({ error: 'Client not found!' });
      }
  
      res.status(200).json({ client });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  export const updateClient = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Client not found!' });
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
      const client = await Client.findOneAndUpdate({ _id: id }, updatedFields, { new: true });
  
      if (!client) {
        return res.status(404).json({ error: 'Client not found!' });
      }
  
      // Do not include password in the response
      delete client.password;
  
      res.status(200).json({ message: 'Client was updated successfully!', client });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  export const deleteClient = async (req, res) => {
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
  export const registerClient = async (req, res) => {
    const { email, password, confirmPassword, phoneNumber, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); 
  
    try {
      // Here we check if the client already exists
      const existingClient = await Client.findOne({ email });
      if (existingClient) {
        return res.status(400).json({ message: 'Email already in use!' });
      }
  
      // Here we check if the password and confirmPassword match
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match!' });
      }
  
      // Here we register the client
      const newClient = await Client.create({
        email,
        password: hashedPassword,
        phoneNumber,
        address
      });
  
      res.status(201).json({ message: 'Client created successfully!', newClient });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };
  export const loginClient = async (req, res) => {
    const { email, password } = req.body;
    const secretKey = process.env.JWT_SECRET;
  
    try {
      if (!secretKey) {
        throw new Error('JWT secret key not configured.');
      }
      const client = await Client.findOne({ email });
  
      if (!client || !(await bcrypt.compare(password, client.password))) {
        return res.status(401).json({ error: 'Invalid email or password!' });
      }
  
      const token = jwt.sign({ id: client._id }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ message: 'Logged in Successfully!', token, clientId: client._id });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message })
    }
  };