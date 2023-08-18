import Head from 'next/head';
import Header from '../../organisms/Header/Header';
import styles from './Layout.module.scss';
import clsx from 'clsx';

function Layout({ children }) {
	return (
		<>
			<Head>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={clsx(styles.layout)}>
				<Header />

				<section className={clsx(styles.content)}>{children}</section>
			</main>
		</>
	);
}

export default Layout;
