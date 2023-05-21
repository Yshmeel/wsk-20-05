import React, {useEffect, useState} from "react"
import styles from './index.module.css'

const Header = (props) => {
    const {
        pageName = '',
        additionalButton = null,
        backButton = null
    } = props;

    const [init, setInit] = useState(false);
    const rootClassName = `${styles.header} ${(init ? styles.ready : '')}`;

    useEffect(() => {
        setInit(true);
    }, []);

    return (
        <header className={rootClassName}>
            <div className={styles.container}>
                <div className={styles.headerLeft}>
                    <span className={styles.headerLeftText}>{pageName}</span>

                    {additionalButton}
                </div>

                {backButton && (
                    <div className={styles.headerRight}>
                        {backButton}
                    </div>
                )}
            </div>
        </header>
    )
};

export default Header;
