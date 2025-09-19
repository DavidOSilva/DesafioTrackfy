import Icon from "../Icon/Icon"
import styles from './SideMenu.module.css'
import { AppContext } from "../../contexts/Contexts"

import { useContext } from "react"
import { Link } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";

function SideMenu({page='Dashboard'}) {

    const { sideMenuIsOpen, setSideMenuIsOpen } = useContext(AppContext);

    return (
        <div className={`${styles.container} ${sideMenuIsOpen ? styles.sideMenuOpen : styles.sideMenuClosed}`}>

            <header className={styles.header}>
                <div className={styles.logoContainer}>
                    <img className={`${styles.logoImage}`} src="./src/assets/logos/trackfy-favicon-blue.svg" alt="Trackfy logo svg" />
                    <span className={`${styles.logoText} ${sideMenuIsOpen ? '' : styles.logoTextHidden}`}>trackfy</span>
                </div>
                <span className={styles.iconContainer} onClick={() => setSideMenuIsOpen(!sideMenuIsOpen)}>
                    <Icon icon={IoIosArrowBack} className={`${styles.iconButton} ${!sideMenuIsOpen ? styles.iconButtonRotated : ''}`}/>
                </span>
            </header>

            <span className={`${styles.sectionTitle} `}>{sideMenuIsOpen ? 'RECURSOS' : 'R.'}</span>

            <Link to="/dashboard">
                <div className={`${styles.optionContainer} ${page === 'Dashboard' ? styles.optionSelected : ''} ${!sideMenuIsOpen ? styles.centralized : ''}`}>
                    <Icon icon="fi fi-ss-curve-arrow" className={`${styles.icon}  ${page === 'Dashboard' ? styles.iconSelected : ''}`}/>
                    {sideMenuIsOpen && <span className={`${styles.optionText}  ${page === 'Dashboard' ? styles.textSelected : ''}`}>Dashboard</span>}
                </div>
            </Link>

            <Link to="/mapa">
                <div className={`${styles.optionContainer} ${page === 'Map' ? styles.optionSelected : ''} ${!sideMenuIsOpen ? styles.centralized : ''}`}>
                    <Icon icon="fi fi-sr-land-layer-location" className={`${styles.icon} ${page === 'Map' ? styles.iconSelected : ''}`}/>
                    {sideMenuIsOpen && <span className={`${styles.optionText} ${page === 'Map' ? styles.textSelected : ''}`}>Mapa</span>}
                </div>
            </Link>

        </div>
    )
}

export default SideMenu;