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
		enabled: true, //useQuery의 호출 유무 true(실행, 디폴트값) false(실행안함)
	});
};
