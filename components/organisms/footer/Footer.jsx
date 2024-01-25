import clsx from 'clsx';
import styles from './footer.module.scss';
import Category from '@/components/molecules/category/Category';
import { useGlobalData } from '@/hooks/useGlobalContext';

export default function Footer() {
	const { Theme, setTheme } = useGlobalData();
	return (
		<footer className={clsx(styles.footer)}>
			<Category dataArr={['theme1', 'theme2', 'theme3']} nameArr={['Orange', 'Aqua', 'Hotpink']} onClick={setTheme} selectedEl={Theme} />
		</footer>
	);
}
