import Head from 'next/head';
import axios from 'axios';
import Pic from '@/components/atoms/pic/Pic';
import clsx from 'clsx';
import styles from './Home.module.scss';
import Text from '@/components/atoms/text/Text';

export default function Home({ meals }) {
	const mealsData = meals.slice(0, 5);
	const menuName = ['about', 'gallery', 'youtube'];
	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<main className={clsx(styles.main)}>
				<nav>
					{menuName.map((name, idx) => (
						<Text key={name} url={`/${name}`} tagName={'span'} isOn={idx === 0}>
							{name}
						</Text>
					))}
				</nav>
			</main>
		</>
	);
}

export async function getStaticProps() {
	const { data } = await axios.get('/filter.php?c=Seafood');
	return { props: data, revalidate: 60 * 60 * 24 };
}
