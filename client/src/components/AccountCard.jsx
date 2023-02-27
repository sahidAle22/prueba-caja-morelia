import { formatearFecha } from "../helpers"

export const AccountCard = ({cuenta}) => {
    const { nombre_cuenta, saldo_actual, fecha_contratacion, fecha_ultimo_movimiento} =  cuenta
    return (
        <div className="card">
            <h2> Cuenta de {nombre_cuenta} </h2>
            <p><b>Saldo Actual: </b>${ saldo_actual }</p>
            <p><b>Fecha de contratacion: </b>{formatearFecha(fecha_contratacion) }</p>
            <p><b>Fecha de ultimo movimiento: </b>{formatearFecha(fecha_ultimo_movimiento) }</p>
        </div>
    )
}
