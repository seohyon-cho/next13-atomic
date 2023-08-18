import Head from 'next/head';
import styles from './style.module.scss';

export default function Recipe() {
	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<div className={styles.box}></div>
		</>
	);
}
