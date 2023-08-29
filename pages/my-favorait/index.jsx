import Head from 'next/head';
import clsx from 'clsx';
import { Title } from '@/components/atoms/text/Title';
import styles from './favorait.module.scss';

function Favorait() {
	return (
		<>
			<Head>
				<title>Favoraite Page</title>
			</Head>

			<section className={clsx(styles.favoraitePage)}>
				<Title type={'slogan'}>My Favoraite Recipe</Title>
			</section>
		</>
	);
}

export default Favorait;
