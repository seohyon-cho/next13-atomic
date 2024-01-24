import Category from '@/components/molecules/category/Category';
import { useState } from 'react';

export default function Pages() {
	const dataArr = [
		{ name: 'David', age: 20 },
		{ name: 'Emily', age: 30 },
		{ name: 'Paul', age: 40 }
	];
	const nameArr = dataArr.map(data => data.name);
	const [Selected, setSelected] = useState(dataArr[0]);
	console.log(Selected);

	// Category.jsx에 onClick으로 전달되는 핸들러 함수는 무조건 다음과 같은 구조로 생성.
	// 파라미터로 활성화된 데이터를 전달받아서, 호출하는 해당 컴포넌트에 생성한 state에 담아주는 구조.
	const handleClick = activeEl => {
		setSelected(activeEl);
		console.log(activeEl === Selected);
	};
	return (
		<section>
			{/* 무조건 전체 배열 데이터와, 현재 활성화된 데이터요소 를 같이 전달하고, 카테고리 컴포넌트 내부적으로 클릭 이벤트가 일어나면, 클릭한 요소 순번의 데이터를 부모에 있는 state에 옮겨담아주는 핸들러 함수도 같이 전달해줌. */}

			{/* nameArr를 별도로 설정하는 경우 : dataArr에는 무조건 배열이 들어가는데, 해당 배열의 각 구성요소가 문자일 수도 있고, 객체일 수도 있음. 만약 배열의 구성요소가 객체라면 메뉴명으로 바로 활용할 수 없기 때문에 nameArr 를 따로 만들어, nameArr에 문자로 구성된, 메뉴 출력용으로 구성된 배열을 직접 전달함. */}
			<Category dataArr={dataArr} nameArr={nameArr} onClick={handleClick} selectedEl={Selected} />
		</section>
	);
}
