import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getRecipeByCategory = async ({ queryKey }) => {
	const { data } = await axios.get(`/filter.php?c=${queryKey[1]}`);
	return data?.meals || [];
};

export const useRecipeByCategory = (SelectedCategory) => {
	return useQuery(['RecipeByCategory', SelectedCategory], getRecipeByCategory, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 0,
		staleTime: 0,
		retry: 3, //데이터 요청 시도 횟수(디폴트3, 네트워트상황이 안좋을때 재시도횟수 늘림)
		//enabled값에는 truthy, falsy값이 적용안됨 (직접 boolean값을 생성해서 지정)
		//지금 상황에서는 SSG방식으로 초기 데이터를 호출하고 있기 때문에 아래 구문을 지정안해도 잘 동작됨
		//CSR방식으로 호출할떄에는 초기값이 undefined이기 때문에 발생하는 에러를 미리 방지
		enabled: SelectedCategory !== undefined, //useQuery의 호출 유무 true(실행, 디폴트값) false(실행안함)
	});
};
