import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getRecipeByCategory = async ({ queryKey }) => {
	const { data } = await axios.get(`/filter.php?c=${queryKey[1]}`);
	//해당 커스텀훅으로 호출되는 fetching함수가 만약 컴포넌트 마운트되자마자 호출된다면
	//data값 자체가 없기 때문에 meals에서 undefined오류 발생을 피하기 위함
	return data?.meals || [];
};

export const useRecipeByCategory = (SelectedCategory) => {
	return useQuery(['RecipeByCategory', SelectedCategory], getRecipeByCategory, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 0,
		staleTime: 0,
	});
};
