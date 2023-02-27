import axios from "axios"

export const getClientsRequest = async () => 
    await axios.get("http://localhost:4000/clients")

export const getClientRequest = async id => 
    await axios.get(`http://localhost:4000/clients/${id}`)

export const getAccountsRequest = async id => 
    await axios.get(`http://localhost:4000/account/${id}`)

export const updateClientRequest = async (id, newClient) => 
    await axios.put(`http://localhost:4000/clients/${id}`, newClient)

export const deleteClientRequest = async id => 
    await axios.delete(`http://localhost:4000/clients/${id}`)