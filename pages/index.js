import Head from 'next/head';
import axios from 'axios';
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

export async function getStaticProps() {
	const { data } = await axios.get('/filter.php?c=Seafood');
	return { props: data, revalidate: 60 * 60 * 24 };
}
