import { createContext, useContext, useState } from 'react'
import { getClientsRequest, deleteClientRequest, updateClientRequest } from '../api/clientes.api'

export const ClienteContext = createContext() // El que permite comunicarse con el contexto 

export const useCliente = () => {
    const context = useContext(ClienteContext)
    
    if(!context){ // Si no existe el conexto, no se esta dentro del componente ClienteContextProvider
        throw new Error("useCliente deberia estar dentro del ClienteContextProvider")
    }
    
    return context
}

export const ClienteContextProvider = ({ children }) => { // El que agrupa el contexto
    
    const [clientes, setClientes] = useState([])

    async function loadClients () {
        const response = await getClientsRequest()
        setClientes(response.data)
    }

    const deleteClient = async (id) => {
        try {
            await deleteClientRequest(id)
            setClientes(clientes.filter(cliente => cliente.id_cliente !== id))
        } catch (error) {
            
        }
    }

    const updateClient = async (id, newClient) => {
        try {
            await updateClientRequest(id, newClient)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ClienteContext.Provider value={{clientes , loadClients, deleteClient, updateClient}}> 
            { children } 
        </ClienteContext.Provider>
    )
}