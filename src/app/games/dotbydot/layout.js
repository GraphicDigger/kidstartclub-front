import styles from './page.module.scss';

export default function DotbydotLayout({ children }) {
    return (
        <main className={styles.main}>
            {children}
        </main>
    )
}
