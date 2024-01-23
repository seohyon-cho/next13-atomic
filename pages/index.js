import Head from 'next/head';
import axios from 'axios';
import clsx from 'clsx';
import styles from './Home.module.scss';
import List from '@/components/atoms/list/List';

export default function Home({ meals }) {
	const topRated = ['Avatar', 'Emma', 'AquaMan'];
	const url = ['/', '/gallery', '/about'];
	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<main className={clsx(styles.main)}>
				<List data={topRated} tagName={'ol'} divider={'-'} />
			</main>
		</>
	);
}

export async function getStaticProps() {
	const { data } = await axios.get('/filter.php?c=Seafood');
	return { props: data, revalidate: 60 * 60 * 24 };
}
