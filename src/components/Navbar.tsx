import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <>
            <NavLink to="/" >Главная</NavLink>
            <NavLink to="/page">Страница 1</NavLink>
        </>
    )
}
