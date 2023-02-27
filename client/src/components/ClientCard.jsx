import { Link } from 'react-router-dom'
import { useCliente } from '../context/ClienteProvider'
import { formatearFecha } from '../helpers'

export const ClientCard = ({cliente}) => {

    const { deleteClient } = useCliente()
    const { id_cliente, nombre, apellido_paterno, apellido_materno, rfc, curp, fecha_alta} = cliente

    return (
        <div className="card">
            <p><b>Nombre: </b> {nombre}</p>
            <p><b>Apellidos:</b> {apellido_paterno} {apellido_materno}</p>
            <p><b>RFC:</b> {rfc}</p>
            <p><b>CURP:</b> {curp}</p>
            <p><b>Alta:</b> {formatearFecha(fecha_alta)}</p>
            <hr/>

            <div className='botones'>
                <Link className='cuenta' to={`/accountInfo/${id_cliente}`}>Cuentas</Link>
                <Link className='editar' to={`/edit/${id_cliente}`}>Editar</Link>
                <button onClick={() => deleteClient(id_cliente)} className='delete'>Eliminar</button>
            </div>
        </div>
    )
}
