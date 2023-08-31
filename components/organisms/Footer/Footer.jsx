import styles from './Footer.module.scss';
import clsx from 'clsx';
import { Text } from '@/components/atoms/text/Text';
import { BounceLoader } from 'react-spinners';
import Btn from '@/components/atoms/Button/Btn';
import { useGlobalData } from '@/hooks/useGlobalContext';
import Category from '@/components/molecules/Category/Category';

function Footer() {
	const { setTheme, Theme } = useGlobalData();
	return (
		<footer className={clsx(styles.footer)}>
			<nav>
				<Category
					items={['theme1', 'theme2', 'theme3']}
					active={Theme}
					onClick={setTheme}
				/>
			</nav>
			<Text type={'util'} style={{ letterSpacing: 2 }}>
				2023 Decodelab All rights reserved.
			</Text>
		</footer>
	);
}

export default Footer;
