import { Pic } from '@/components/atoms/pic/Pic';
import { Title } from '@/components/atoms/text/Title';
import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { BounceLoader } from 'react-spinners';
import { Table } from '@/components/atoms/Table/Table';
import { useState, useEffect } from 'react';

function Detail() {
	const router = useRouter();
	const { id } = router.query;
	const { data } = useRecipeById(id);
	const [TableData, setTableData] = useState([]);

	//무한루프에 빠지지 않게 하기위해서 해당 해당 컴포넌트에서 data가 받아졌을떄 한번한 호출해서 State에 옮겨담기
	useEffect(() => {
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
			setTableData(ingredients);
		}
	}, [data]);

	return (
		<section className='detail'>
			<BounceLoader
				loading={!data}
				cssOverride={{ position: 'absolute', top: 300, left: '50%', transform: 'translateX(-50%)' }}
				color={'orange'}
				size={100}
			/>
			{data && (
				//다이나믹 라우터에서 스타일이 날라가는것이 아닌 csr방식에서 컴포넌트 언마운트시 데이터가 사라져서
				//컨텐츠가 출력이 안되던 문제
				//해결방법 data가 없을때는 로딩바를 대신 출력
				//isSuccess는 처음 fetching이후 계속 true값이므로 활용불가
				<>
					<Title type={'slogan'}>{data.strMeal}</Title>

					<div className='picFrame'>
						<Pic imgSrc={data.strMealThumb} />
					</div>
					<Table data={TableData} title={data.strMeal} />
				</>
			)}
		</section>
	);
}

export default Detail;
