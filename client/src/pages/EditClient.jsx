import { Formik, Form } from 'formik'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getClientRequest } from '../api/clientes.api'
import { useCliente } from '../context/ClienteProvider'

// El componente Form es el que nos permite crear el formulario, y Formik es el que mantiene el estado 
// Con el name de los inputs es como lo reconoce Formik
// handleChange - Cuando el usuario vaya escribiendo, se vayan llenando los estados de los valores iniciales
//* axios -> para comunicar al fronted con el backend
//! 'Access-Control-Allow-Origin' -> Se debe permitir desde el servidor, que el puerto del cliente pueda conectarse a el, esto instalando npm i cors en el server

export const EditClient = () => {

    const { updateClient } = useCliente()
    
    const [cliente, setCliente] = useState({
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        rfc: "",
        curp: ""
    })

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function loadClient() {
            const response = await getClientRequest(params.id)
            setCliente(response.data[0])
        }

        loadClient()
    }, [])

    return (
        <div className='contenedor'>
            <div className='contenedorForm'>
                { cliente.nombre !== "" && (
                    <Formik
                        initialValues={ cliente }
                        enableReinitialize={true}
                        onSubmit={ async (values, actions) => {
                            //console.log(params.id)
                            await updateClient(params.id,values)
                            navigate("/")
                        }}
                    >
                        {({ handleChange, handleSubmit, isSubmitting , values }) => ( // El formulario se debe de envolver enn una funcion
                            <Form onSubmit={handleSubmit}>
                                <label htmlFor='nombre'>Nombre</label>
                                <input 
                                    minLength={8}
                                    type="text" 
                                    name='nombre' 
                                    id='nombre'
                                    placeholder='Escribe el nombre' 
                                    onChange={handleChange}
                                    value={values.nombre}
                                />

                                <label htmlFor='apellido_paterno'>Apellido Paterno</label>
                                <input 
                                    type="text" 
                                    name='apellido_paterno' 
                                    id='apellido_paterno'
                                    placeholder='Escribe el apellido paterno' 
                                    onChange={handleChange}
                                    value={values.apellido_paterno}
                                />

                                <label htmlFor='apellido_materno'>Apellido Materno</label>
                                <input 
                                    type="text" 
                                    name='apellido_materno' 
                                    id='apellido_materno'
                                    placeholder='Escribe el apellido materno' 
                                    onChange={handleChange}
                                    value={values.apellido_materno}
                                />

                                <label htmlFor='rfc'>RFC</label>
                                <input 
                                    type="text" 
                                    name='rfc' 
                                    id='rfc'
                                    placeholder='Escribe el RFC' 
                                    onChange={handleChange}
                                    value={values.rfc}
                                />

                                <label htmlFor='curp'>CURP</label>
                                <input 
                                    type="text" 
                                    name='curp' 
                                    id='curp'
                                    placeholder='Escribe la CURP' 
                                    onChange={handleChange}
                                    value={values.curp}
                                />

                                <button type='submit' disabled={ isSubmitting } className="btn">
                                    { isSubmitting ? 'Saving' : 'Save'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    )
}