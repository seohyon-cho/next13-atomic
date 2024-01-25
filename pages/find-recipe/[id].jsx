import Pic from '@/components/atoms/pic/Pic';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import styles from './detail.module.scss';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { TableY } from '@/components/atoms/table/Table';
import List from '@/components/atoms/list/List';
import Text from '@/components/atoms/text/Text';
import { BounceLoader } from 'react-spinners';

/*
	Dynamic Router 페이지 컴포넌트에서 페이지 transition 모션 작동 시, 페이지가 변경될 때 prop 관련 오류 뜨는 이유와 해결 방법

	오류내용 : Image is missing required "src" ("alt") property: ...

	원인 : 
	기본적으로 next는 라우터로 path명이 변경될 때마다, unmount되는 컴포넌트에서 CSR방식으로 가져온 데이터와 styleNode를 물리적으로 제거함. 
	-> AnimatePresence에서 트리거 조건을 'router의 path명 변경'으로 설정했기 때문에, 라우터의 path명 변경 시, 라우터의 path명은 이미 변경이 되었지만, 
		모션이 끝날 때까지 해당 페이지 컴포넌트의 언마운트 시점을 지연시키고 있음. 
	-> 이미 path는 변경되어서 CSR 데이터와 styleNode는 이미 제거되었는데, 페이지 컴포넌트는 아직 보이고 있는 게 문제가 됨. 

	** module.scss 으로 적용된 스타일은 안 날라가고 잘 있는데, 페이지 전용 scss로 적용된 스타일만 페이지가 전환될 때 날라가는 것임. 

	해결방법 : CSR 방식으로 가져오는 데이터 자체를, 컴포넌트 렌더링의 조건으로 설정하면 됨. 
	-> = 데이터가 아직 없으면 (아직 받아지지 않았으면) 로딩바를 대신 출력, 데이터가 있으면 (받아졌으면) 데이터를 활용하는 컴포넌트를 출력하게 하면 됨. 


*/

export default function Detail() {
	const [TableData, setTableData] = useState([]);
	const [ListData, setListData] = useState([]);
	const [Saved, setSaved] = useState(false); // 해당 값의 유무에 따라, 즐겨찾기 유무 확인.

	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);

	// 즐겨찾기 버튼 토글 시, 로컬 저장소에 현재 params로 들어온 레시피 아이디값을 저장해주는 함수.
	const handleSave = () => {
		const savedRecipe = JSON.parse(localStorage.getItem('favorite')) || [];

		if (!Saved) {
			savedRecipe.push(data.idMeal);
			localStorage.setItem('favorite', JSON.stringify(savedRecipe));
			setSaved(true);
		} else {
			// 배열.splice(삭제할 배열의 순번 위치, 삭제할 갯수)
			savedRecipe.splice(savedRecipe.indexOf(data.idMeal), 1);
			localStorage.setItem('favorite', JSON.stringify(savedRecipe));
			setSaved(false);
		}
	};

	// 사용자 이벤트가 아닌, 해당 페이지 컴포넌트가 마운트되었을 때, 로컬저장소의 값을 비교해서 (즐겨찾기 유무에 따라) 즐겨찾기 버튼의 상태 변경을 분기처리하는 함수
	useEffect(() => {
		const savedRecipe = JSON.parse(localStorage.getItem('favorite')) || [];
		savedRecipe.includes(id) ? setSaved(true) : setSaved(false);
	}, [id]);

	useEffect(() => {
		if (data) {
			let keys = Object.keys(data);
			keys = keys.filter(key => key.startsWith('strIngredient'));
			keys = keys.filter(key => data[key] !== '' && data[key] !== null);
			const ingredients = keys.map((_, idx) => {
				return { no: idx + 1, ingredient: data[`strIngredient${idx + 1}`], measure: data[`strMeasure${idx + 1}`] };
			});
			setTableData(ingredients);

			const instructions = data.strInstructions
				.split('\r\n')
				.map(txt => (txt.includes('\t') ? txt.split('.\t')[1] : txt))
				.filter(txt => txt !== '');
			setListData(instructions);
		}
	}, [data]);

	return (
		<section className={clsx(styles.detail)}>
			{/* 페이지 변경 과정에서 csr방식으로 가져오는 데이터가 없을 때에는, 로딩바를 대신 출력 */}
			<BounceLoader
				loading={!data}
				cssOverride={{ postion: 'absolute', top: 300, left: '50%', transform: 'translateX(-50%)' }}
				color={'var(--point)'}
				size={100}
			/>
			{/* data가 있을 떄에만 컨텐츠 출력 (isSuccess도 결국은 data가 있을 때 유효한 값이기 때문에, isSuccess 말고 data의 유무 자체를 조건으로 걸었음.) */}
			{data && (
				<>
					<div className={clsx(styles.upper)}>
						<h1>{data.strMeal}</h1>
						<Text className={clsx(styles.btnFavorite)} styleType={'button'} onClick={handleSave} isOn={Saved}>
							{Saved ? 'Remove from My Favorite' : 'Add to My Favorite'}
						</Text>
					</div>
					<div className={clsx(styles.picFrame)}>
						<Pic imgSrc={data.strMealThumb} />
					</div>
					<TableY data={TableData} title={'Ingredient'} className={clsx(styles.detailTable)} />

					<List data={ListData} tagName={'ol'} className={clsx(styles.detailList)} />
				</>
			)}
		</section>
	);
}
