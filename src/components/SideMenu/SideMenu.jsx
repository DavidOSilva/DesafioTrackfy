import Icon from "../Icon/Icon"
import styles from './SideMenu.module.css'

import { Link } from "react-router-dom";

function SideMenu({page='Dashboard'}) {
    return (
        <div className={styles.container}>

            <div className={styles.logoContainer}>
                <img className={`${styles.logoImage}`} src="./src/assets/logos/trackfy-favicon-blue.svg" alt="Trackfy logo svg" />
                <span className={styles.logoText}>trackfy</span>
            </div>

            <span className={styles.sectionTitle}>RECURSOS</span>

            <Link to="/dashboard">
                <div className={`${styles.optionContainer} ${page === 'Dashboard' ? styles.optionSelected : ''}`}>
                    <Icon icon="fi fi-ss-curve-arrow" className={`${styles.icon}  ${page === 'Dashboard' ? styles.iconSelected : ''}`}/>
                    <span className={`${styles.optionText}  ${page === 'Dashboard' ? styles.textSelected : ''}`}>Dashboard</span>
                </div>
            </Link>

            <Link to="/mapa">
                <div className={`${styles.optionContainer} ${page === 'Map' ? styles.optionSelected : ''}`}>
                    <Icon icon="fi fi-sr-land-layer-location" className={`${styles.icon} ${page === 'Map' ? styles.iconSelected : ''}`}/>
                    <span className={`${styles.optionText} ${page === 'Map' ? styles.textSelected : ''}`}>Mapa</span>
                </div>
            </Link>

        </div>
    )
}

export default SideMenu;