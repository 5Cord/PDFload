import { NavLink } from 'react-router-dom';
import cl from './styles/StyleNavBar.module.css'
import { IconUser } from '@consta/icons/IconUser';
import { IconBookmarkFilled } from '@consta/icons/IconBookmarkFilled';
import { IconIntroduction } from '@consta/icons/IconIntroduction';
import logo from '../assets/Logo.png'

export default function Header() {
  return (
    <div className={cl.header}>
      <div className={cl.headerLogo}><img src={logo} alt="" /></div>
      <div className={cl.containerHeaderIcon}>
        <NavLink><div className={cl.headerIcon}><IconUser /></div></NavLink>
        <NavLink><div className={cl.headerIcon}><IconBookmarkFilled /></div></NavLink>
        <NavLink><div className={cl.headerIcon}><IconIntroduction /></div></NavLink>
      </div>

    </div>
  )
}
