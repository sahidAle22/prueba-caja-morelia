import { Router } from "express";
import {
    getClients,
    getClient,
    getAccount,
    updateClient,
    deleteClient
} from '../controllers/clientes.controllers.js'

const router = Router()

router.get("/clients", getClients)
router.get("/clients/:id", getClient)
router.get("/account/:id", getAccount)
router.put("/clients/:id", updateClient)
router.delete("/clients/:id", deleteClient)

export default router