import styles from './Footer.module.scss';
import clsx from 'clsx';
import { Text } from '@/components/atoms/text/Text';
import { BounceLoader } from 'react-spinners';
import Btn from '@/components/atoms/Button/Btn';

function Footer() {
	return (
		<footer className={clsx(styles.footer)}>
			<nav>
				<Btn>Orange</Btn>
				<Btn>Hotpink</Btn>
				<Btn>Aqua</Btn>
			</nav>
			<Text type={'util'} style={{ letterSpacing: 2 }}>
				2023 Decodelab All rights reserved.
			</Text>
		</footer>
	);
}

export default Footer;
