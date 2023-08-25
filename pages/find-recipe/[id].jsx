import { Pic } from '@/components/atoms/pic/Pic';
import { Title } from '@/components/atoms/text/Title';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import styles from './detail.module.scss';
import clsx from 'clsx';
import { BounceLoader } from 'react-spinners';
import { Table } from '@/components/atoms/Table/Table';
import { useState, useEffect } from 'react';

function Detail() {
	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);
	console.log(isSuccess && data);
	const [TableData, setTableData] = useState([]);

	//무한루프에 빠지지 않게 하기위해서 해당 해당 컴포넌트에서 data가 받아졌을떄 한번한 호출해서 State에 옮겨담기
	useEffect(() => {
		const nodes = document.querySelectorAll('link[rel=stylesheet], style:not([media=x])');
		const copies = [...nodes].map((el) => el.cloneNode(true));

		for (let copy of copies) {
			//static하게 연결되는 스타일 (next제거안함)
			copy.removeAttribute('data-n-g');
			//dynamic하게 연결되는 스타일 (컴포넌트 언마운트시 next가 제거)
			copy.removeAttribute('data-n-href');
			copy.removeAttribute('data-n-p');
			document.head.appendChild(copy);
		}

		console.log(data);
		if (data) {
			const keys = Object.keys(data);
			//레시피 정보 객체에서 strIngredient문자로 시작하는 키값만 배열로 뽑음
			const filterKeys1 = keys.filter((key) => key.startsWith('strIngredient'));
			//위에서 뽑은 키값에서 value값이 빈문자거나 null인 것은 제외
			const filterKeys2 = filterKeys1.filter((key) => data[key] !== '' && data[key] !== null);
			//위에서 뽑은 키값으로 재료순서, 재료명, 재료량을 객체로 변환해서 다시 배열로 반환
			const ingredients = filterKeys2.map((key, idx) => ({
				index: idx + 1,
				ingredient: data[key],
				measuer: data[`strMeasure${idx + 1}`],
			}));
			console.log(ingredients);
			setTableData(ingredients);
		}

		return () => {
			window.setTimeout(() => {
				for (let copy of copies) {
					document.head.removeChild(copy);
				}
			}, 2000);
		};
	}, [data]);

	return (
		<section className={clsx(styles.detail)}>
			<BounceLoader
				loading={!isSuccess}
				cssOverride={{ position: 'absolute', top: 300, left: '50%', transform: 'translateX(-50%)' }}
				color={'orange'}
				size={100}
			/>
			{isSuccess && (
				<>
					<Title type={'slogan'}>{data.strMeal}</Title>

					<div className={clsx(styles.picFrame)}>
						<Pic imgSrc={data.strMealThumb} />
					</div>
				</>
			)}

			{/* 위에서 State에 옮겨놓은 데이터를 컴포넌트에 전달 */}
			<Table data={TableData} title={data?.strMeal} />
		</section>
	);
}

export default Detail;
