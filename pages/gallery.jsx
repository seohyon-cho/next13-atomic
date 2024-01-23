import SearchBar from '@/components/molecules/searchBar/SearchBar';
import { useState } from 'react';

export default function Gallery() {
	const [Val, setVal] = useState('');
	console.log(Val);

	return (
		<section>
			{/* 가장 상위에서는 onChange={전달할 값} 부여하면 됨.  */}
			<SearchBar value={Val} onChange={setVal} />
		</section>
	);
}
