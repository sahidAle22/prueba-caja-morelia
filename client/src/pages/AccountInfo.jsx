import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAccountsRequest } from '../api/clientes.api'
import { AccountCard } from '../components/AccountCard'

export const AccountInfo = () => {
    const [cuentas, setCuentas] = useState([])
    const {id} = useParams()
    
    useEffect(() => {
        async function loadAccounts() {
            const response = await getAccountsRequest(id)
            setCuentas(response.data)
        }

        loadAccounts()
    }, [])

    const renderMain = () => {
        if(cuentas.length === 0) return <h1>Este cliente no tiene cuentas</h1>

        return cuentas.map(cuenta => (<AccountCard key={cuenta.id_cuenta} cuenta = {cuenta}/>))
        
    }
    
    return (
        <div className="contenedor">
            <div className="contenido">
                { renderMain() }
            </div>
        </div>
    )
}
