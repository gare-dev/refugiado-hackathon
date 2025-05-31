import React from 'react';
import styles from '@/styles/Sidebar.module.scss';
import {
    MdHome,
    MdPerson,
    MdSettings,
    MdNotifications,

} from 'react-icons/md';
import { useTranslation } from 'next-i18next';
import { falar } from '@/utils/falar';



interface Props {
    selectedItem: string;
    setSelectedItem: (value: string) => void;
    falaAtiva: boolean
}

const sidebarItems = [
    {
        label: 'Início',
        icon: MdHome,
    },
    {
        label: 'Serviços',
        icon: MdPerson,
    },
    {
        label: 'Mapa',
        icon: MdNotifications,
    },
    {
        label: 'Falar Texto',
        icon: MdSettings,
    },

];

const Sidebar = ({ selectedItem, setSelectedItem, falaAtiva }: Props) => {
    const { t, i18n } = useTranslation("common");


    return (
        <nav className={styles.sidebar}>
            {/* Logo no topo */}
            <div className={styles.logoContainer}>
                <img src="/assets/img/logo.jpg" alt="Logo" className={styles.logo} />
            </div>

            <ul className={styles.menu}>
                {sidebarItems.map(({ label, icon: Icon }) => (
                    <li
                        key={label}
                        className={`${styles.menuItem} ${selectedItem === label ? styles.active : ''}`}
                        onClick={() => setSelectedItem(label)}
                        onMouseOver={() => {
                            if (falaAtiva) falar(t(`sidebar.${label}`), i18n.language);
                        }}

                    >
                        <a className={styles.menuLink}>
                            <Icon className={styles.icon} />
                            <span className={styles.linkText}>{t(`sidebar.${label}`)}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};


export default Sidebar;

