import { useEffect } from "react"
import { ClientCard } from "../components/ClientCard"
import { useCliente } from "../context/ClienteProvider"

export const Clients = () => {
    
    const {clientes, loadClients} = useCliente()

    useEffect(() => {
        loadClients()
    }, [])

    const renderMain = () => {
        if(clientes.length === 0) return <h1>No hay Clientes</h1>
        return clientes.map(cliente => (<ClientCard key={cliente.id_cliente} cliente = {cliente}/> ))
    }

    return (
        <div className="contenedor">
            <div className="contenido">
                { renderMain() }
            </div>
        </div>
    )
}
