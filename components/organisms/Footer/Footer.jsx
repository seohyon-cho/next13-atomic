import styles from './Footer.module.scss';
import clsx from 'clsx';
import { Text } from '@/components/atoms/text/Text';
import { BounceLoader } from 'react-spinners';
import Btn from '@/components/atoms/Button/Btn';
import { useGlobalData } from '@/hooks/useGlobalContext';

function Footer() {
	const { setTheme } = useGlobalData();
	return (
		<footer className={clsx(styles.footer)}>
			<nav>
				{['Orange', 'Aqua', 'Hotpink'].map((el, idx) => (
					<Btn key={idx} onClick={() => setTheme(`theme${idx + 1}`)}>
						{el}
					</Btn>
				))}
			</nav>
			<Text type={'util'} style={{ letterSpacing: 2 }}>
				2023 Decodelab All rights reserved.
			</Text>
		</footer>
	);
}

export default Footer;
