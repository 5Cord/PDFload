import Navbar from './Navbar'
import { Route, Routes } from 'react-router-dom'
import NotFound from './NotFound'
import Page from './Page'
import HomePage from './HomePage'

export default function Menu() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/page" element={<Page />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}
