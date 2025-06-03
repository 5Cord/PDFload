import Navbar from './Navbar'
import { Route, Routes } from 'react-router-dom'
import NotFound from './NotFound'
import Page from './Card/Card'
import HomePage from './HomePage'

export default function Menu() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navbar />} >
                    <Route index element={<HomePage />} />
                    <Route path="/page" element={<Page />} />
                    <Route path="*" element={<NotFound />} />
                </Route >
            </Routes>
        </>
    )
}
