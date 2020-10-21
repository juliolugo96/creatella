import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ProductsGrid from '@/components/ProductsGrid';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Products Grid | Creatella</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <ProductsGrid />
            </main>

            <footer className={styles.footer}>
                <a href="https://creatella.ventures/" target="_blank" rel="noopener noreferrer">
                    Powered by Creatella Ventures
                </a>
            </footer>
        </div>
    );
}
