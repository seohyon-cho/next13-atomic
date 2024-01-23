import clsx from 'clsx';
import styles from './input.module.scss';

export default function Input({ type = 'text', placeholder = 'text', value, onChange, className }) {
	return (
		<input type={type} className={clsx(styles.input, className)} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
	);
}
