import Head from 'next/head';
import axios from 'axios';
import clsx from 'clsx';
import styles from './Home.module.scss';
import { TableX } from '@/components/atoms/table/Table';

export default function Home({ meals }) {
	const data = [
		{ name: 'David', age: 20, address: 'Seoul' },
		{ name: 'Emily', age: 30, address: 'Busan' },
		{ name: 'Paul', age: 40, address: 'Daegu' },
		{ name: 'Andy', age: 50, address: 'Incheon' },
		{ name: 'Tom', age: 60, address: 'Mokpo' }
	];

	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<main className={clsx(styles.main)}>
				<TableX data={data} />
			</main>
		</>
	);
}

export async function getStaticProps() {
	const { data } = await axios.get('/filter.php?c=Seafood');
	return { props: data, revalidate: 60 * 60 * 24 };
}
