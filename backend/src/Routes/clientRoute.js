import express from 'express'
import * as Client from '../Controllers/clientController.js'

const router = express.Router();

router.get('/:id', Client.getClient)
router.get('/', Client.getClients)
router.put('/:id', Client.updateClient)
router.delete('/:id', Client.deleteClient)
router.post('/register', Client.registerClient)
router.post('/login/:id', Client.loginClient)

export default router;