import { NavLink, Outlet } from 'react-router-dom'
import { Layout } from '@consta/uikit/Layout';
import { IconHome } from '@consta/icons/IconHome';
import { IconResize } from '@consta/icons/IconResize';
import cl from './styles/StyleNavBar.module.css'
import Header from './Header';
export default function Navbar() {
    return (
        <>
            <Header />
            <Layout>
                <Layout flex={1} className={cl.container}>
                    <div className={cl.blockContainer}>
                        <IconHome view="secondary" size="xs" className={cl.icon} />
                        <NavLink to="/" >Главная</NavLink>
                    </div>
                    <div className={cl.blockContainer}>
                        <IconResize view="secondary" size="xs" className={cl.icon} />
                        <NavLink to="/page">Успеваемость</NavLink>
                    </div>
                </Layout>
                <Layout flex={5}>
                    <main>
                        <Outlet />
                    </main>
                </Layout>
            </Layout >
        </>
    )
}
