import Head from 'next/head';
import clsx from 'clsx';
import styles from './Home.module.scss';

export default function Home({ meals }) {
	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<main className={clsx(styles.main)}></main>
		</>
	);
}
