import { pool } from '../db.js' 

//* Para evitar que se caiga el server por un error en las consultas, se usa un try cath

export const getClients = async (req, res) => {
    try {
        const [result] = await pool.query("Call getClients()")  
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getClient = async (req, res) => {
    try {
        const [result] = await pool.query(`call getClient(${req.params.id})`)  
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getAccount = async (req, res) => {
    try {
        // req.params.id -> id es el id que se coloco en la ruta /:id
        const [result] = await pool.query(`call getInfoAccount(${req.params.id})`)
        
        // Validacion
        if(result.length === 0) // No hay ninguna tarea 
            return res.status(404).json({ message: 'Cliente no Encontrado'})
        
        res.json(result[0])    
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateClient = async (req, res) => {
    try {
        const {id_cliente, nombre, apellido_paterno, apellido_materno, curp, rfc} = req.body;
        const resultado = await pool.query("call updateUser(?,?,?,?,?,?)",[id_cliente,nombre,apellido_paterno,apellido_materno,rfc,curp])
        return res.json(resultado)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
} 

export const deleteClient = async (req, res) => {

    try {
        const [ result ] = await pool.query(`call deleteClient(${req.params.id})`)
        
        if(result.affectedRows === 0)
            return res.status(404).json({ message: "Cliente no Encontrado "})
    
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}