import clsx from 'clsx';
import styles from './header.module.scss';
import Text from '@/components/atoms/text/Text';
import Navbar from '@/components/molecules/navbar/Navbar';

export default function Header() {
	return (
		<header className={clsx(styles.header)}>
			<Text url={'/'} styleType={'logo'}>
				DCODELAB
			</Text>
			<Navbar data={['Find Recipe', 'My Favorite']} />
		</header>
	);
}
