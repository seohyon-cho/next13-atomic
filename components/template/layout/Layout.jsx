import clsx from 'clsx';
import styles from './layout.module.scss';
import Header from '@/components/organisms/header/Header';
import Breadcrumb from '@/components/molecules/breadcrumb/Breadcrumb';
import { Nanum_Myeongjo, Orbitron } from 'next/font/google';

const nanum = Nanum_Myeongjo({
	subsets: ['latin'],
	weight: ['400', '700'],
	preload: true,
	variable: '--font-nanum'
});

const orbitron = Orbitron({
	subsets: ['latin'],
	weight: ['400', '600'],
	preload: true,
	variable: '--font-orbitron'
});

export default function Layout({ children }) {
	return (
		<div className={clsx(styles.layout, nanum.variable, orbitron.variable)}>
			<Header />
			<div className={clsx(styles.content)}>
				<Breadcrumb />
				{children}
			</div>
		</div>
	);
}
