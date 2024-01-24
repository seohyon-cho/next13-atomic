import Category from '@/components/molecules/category/Category';

export default function Pages() {
	const fetchData = [
		{ name: 'David', age: 20 },
		{ name: 'Emily', age: 30 },
		{ name: 'Paul', age: 40 }
	];
	const nameArr = fetchData.map(data => data.name);

	//함수정의할때 추후 e객체를 받아서 활용하겠다는 정의문
	const handleClick = ({ data, idx, e }) => {
		console.dir(e.target);
	};
	return (
		<section>
			<Category fetchDataArr={fetchData} nameArr={nameArr} onClick={handleClick} />
		</section>
	);
}
