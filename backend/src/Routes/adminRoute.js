import express from 'express';
import * as Admin from '../Controllers/adminController.js';
import { RequireAuth } from '../middleware/Jwt.js';

const router = express.Router();

router.post('/register', Admin.register);
router.post('/login', RequireAuth, Admin.login);

// Protected routes (require authentication)
// router.use(RequireAuth);
router.get('/', RequireAuth, Admin.getAdmins);
router.get('/:id', RequireAuth, Admin.getAdmin);
router.put('/:id', RequireAuth, Admin.updateAdmin);
router.delete('/:id', RequireAuth, Admin.deleteAdmin);

export default router; 