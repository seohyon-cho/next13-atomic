import { useQuery, useQueries } from '@tanstack/react-query';
import axios from 'axios';

const getRecipeByCategory = async ({ queryKey }) => {
	const { data } = await axios.get(`/filter.php?c=${queryKey[1]}`);
	return data?.meals || [];
};

//카테고리명으로 레시피데이터 fetching (추가로 debounce되는 Search값 가져옴)
export const useRecipeByCategory = (DebounceCategory, DebounceSearch) => {
	return useQuery(['RecipeByCategory', DebounceCategory], getRecipeByCategory, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		//Search값이 비어있을때에만 동작 (사용자가 검색어 요청중이면 카테고리 요청은 중지시키기 위함)
		enabled: DebounceSearch === ''
	});
};

const getRecipeBySearch = async ({ queryKey }) => {
	const { data } = await axios.get(`/search.php?s=${queryKey[1]}`);
	return data?.meals || [];
};

//검색어로 레시피데이터 fetching
export const useRecipeBySearch = DobounceSearch => {
	return useQuery(['RecipeBySearch', DobounceSearch], getRecipeBySearch, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		//Search값이 비어있지 않을때만 동작
		enabled: DobounceSearch !== '' //인수로 들어온 인풋이 빈 문자열이면 실행불가
	});
};

//아이디로 상세 레시피 fetching
const getRecipeById = async ({ queryKey }) => {
	const { data } = await axios.get(`/lookup.php?i=${queryKey[1]}`);
	return data?.meals?.[0] || '';
};

export const useRecipeById = DebounceId => {
	return useQuery(['RecipeById', DebounceId], getRecipeById, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24
	});
};
/*
위의 커스텀훅 구문을 아래와같이 표현가능 (react-query5버전에서는 아래의 구문을 표준으로 지정)
export const useRecipeById2 = DebouncedId => {
	const query = {
		queryKey: ['RecipeById', DebouncedId],
		queryFn: getRecipeById,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24
	};
	return useQuery(query);
};
*/

export const useRecipesByIds = arr => {
	//배열값을 인수로 받아서 반복을 돌면서 쿼리키와 api함수를 객체를 배열로 묶어 리턴
	const queries = arr.map(id => ({
		queryKey: ['RecipById', id],
		queryFn: getRecipeById,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24
	}));

	//useQueries : 복수개의 useQuery를 병렬식으로 동시에 작업 실행
	// hook 실행 시, useQuery가 결과값을 반환하는 것이 아닌, 쿼리 요청을 따로 객체 형태로 분리해서 최종적으로 useQueries가 전달 받아 실행하기 때문에,
	// 내부 로직에 의해 변경될 필요가 없는 query에 대한 요청은 실행하지 않음.
	// 사용자 이벤트에 의해서, 그룹으로 묶여있는 query 요청 중에 변경되는 query에 대한 요청사항만 실행하고 싶을 때 효율적.
	//사용방법: useQueries([query, query, query])
	return useQueries({ queries });
};
