import Head from 'next/head';
import axios from 'axios';
import Pic from '@/components/atoms/pic/Pic';
import clsx from 'clsx';
import styles from './Home.module.scss';
import Text from '@/components/atoms/text/Text';

export default function Home({ meals }) {
	const mealsData = meals.slice(0, 5);
	return (
		<>
			<Head>
				<title>Main Page</title>
			</Head>

			<main className={clsx(styles.main)}>
				<Text url={'/'} tagName={'h1'} styleType={'logo'}>
					DCODELAB
				</Text>
				<Text tagName={'h2'} styleType={'title1'}>
					Title Comes here.
				</Text>
				<Text>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet inventore pariatur fugiat sapiente dignissimos sequi ipsam fugit et
					quibusdam illo eligendi illum, suscipit, rerum quisquam neque id. Magni, nesciunt aspernatur.
				</Text>
				<Text styleType={'slogan'}>Slogan</Text>
				<Text styleType={'slogan'} className={clsx(styles.customTit)}>
					Slogan2
				</Text>
			</main>
		</>
	);
}

export async function getStaticProps() {
	const { data } = await axios.get('/filter.php?c=Seafood');
	return { props: data, revalidate: 60 * 60 * 24 };
}
