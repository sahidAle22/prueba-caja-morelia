import { Route, Routes } from 'react-router-dom'
import { Clients } from './pages/Clients'
import { NotFound } from './pages/NotFound'
import { AccountInfo } from './pages/AccountInfo'
import { ClienteContextProvider } from './context/ClienteProvider'
import { EditClient } from './pages/EditClient'
import { Nabvar } from './components/Nabvar'

const App = () => {
    return (
        <ClienteContextProvider>
            <Nabvar/>
            <Routes>
                <Route path='/' element={<Clients/>}/>
                <Route path='/accountInfo/:id' element={<AccountInfo/>}/>
                <Route path='/edit/:id' element={<EditClient/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </ClienteContextProvider>
    )
}

export default App