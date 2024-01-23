import Category from '@/components/molecules/category/Category';

export default function Pages() {
	const fetchData = [
		{ name: 'David', age: 20 },
		{ name: 'Emily', age: 30 },
		{ name: 'Paul', age: 40 }
	];
	const nameArr = fetchData.map(data => data.name);

	const handleClick = ({ data, idx }) => {
		console.log(data[idx]);
	};
	return (
		<section>
			<Category fetchDataArr={fetchData} nameArr={nameArr} onClick={handleClick} />
		</section>
	);
}
