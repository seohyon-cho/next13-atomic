import Head from 'next/head';
import axios from 'axios';
import clsx from 'clsx';
import styles from './Home.module.scss';
import { useState } from 'react';
import Input from '@/components/atoms/input/Input';

export default function Home({ meals }) {
	const [Val, setVal] = useState('');
	console.log(Val);

	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<main className={clsx(styles.main)}>
				<Input value={Val} onChange={setVal} />
			</main>
		</>
	);
}

export async function getStaticProps() {
	const { data } = await axios.get('/filter.php?c=Seafood');
	return { props: data, revalidate: 60 * 60 * 24 };
}
