import clsx from 'clsx';
import styles from './searchBar.module.scss';
import Input from '@/components/atoms/input/Input';
import { RiSearchLine } from 'react-icons/ri';

export default function SearchBar({ value, onChange, className, placeholder }) {
	return (
		<div className={clsx(styles.searchBar, className)}>
			{/* onChange={onChange} 로 꼭 써야 제대로 전달받을 수 있음. */}
			<Input type={'text'} value={value} onChange={onChange} placeholder={placeholder} />
			<button>
				<RiSearchLine />
			</button>
		</div>
	);
}
