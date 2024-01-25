import clsx from 'clsx';
import axios from 'axios';
import styles from './find-recipe.module.scss';
import Category from '@/components/molecules/category/Category';
import { useEffect, useState } from 'react';
import { useRecipeByCategory, useRecipeBySearch } from '@/hooks/useRecipe';
import Card from '@/components/molecules/card/Card';
import SearchBar from '@/components/molecules/searchBar/SearchBar';
import { useDebounce } from '@/hooks/useDebounce';
import Text from '@/components/atoms/text/Text';

export default function FindRecipe({ categories }) {
	const [Names, setNames] = useState(categories.map(el => el.strCategory));
	const [Selected, setSelected] = useState(categories[0].strCategory);
	const [Search, setSearch] = useState('');
	const debouncedSearch = useDebounce(Search);
	const debouncedSelected = useDebounce(Selected);

	// 선택한 카테고리명인 Selected 를 인수로 넣음.
	const { data: dataByCategory, isSuccess } = useRecipeByCategory(debouncedSelected, '');
	const { data: dataBySearch, isSuccess: isSearch } = useRecipeBySearch(debouncedSearch);

	const handleClick = activeEl => {
		// 카테고리 버튼 클릭 시, 기존 Search 값을 비워서, 기존 검색목록을 제거하고 선택된 카테고리 목록 출력.
		setSearch('');
		setSelected(activeEl);
	};

	useEffect(() => {
		// 검색어가 있으면, Selected(카테고리에 따른 데이터)를 비워서 기존에 출력되고 있던 선택한 카테고리의 목록을 지우고,
		if (Search) {
			setSelected('');
		}
		// 검색어가 없으면, Search를 비우고, 카테고리의 기본 값 다시 출력.
		else {
			setSearch('');
			// setSelected(categories[0].strCategory);
		}
	}, [Search]);

	return (
		<section className={clsx(styles.findRecipe)}>
			<div className={clsx(styles.controller)}>
				<Category dataArr={Names} selectedEl={Selected} onClick={handleClick} className={clsx(styles.category)} />
				<SearchBar value={Search} onChange={setSearch} placeholder={'Search Recipe'} className={clsx(styles.searchBox)} />
			</div>

			<h1>{Search ? `Search "${Search}"` : Selected}</h1>
			{isSuccess &&
				dataByCategory.map(data => {
					return (
						<Card
							key={data.idMeal}
							imgSrc={data.strMealThumb}
							txt={data.strMeal}
							className={clsx(styles.foodItem)}
							url={`/find-recipe/${data.idMeal}?name=${data.strMeal}`}
						/>
					);
				})}
			{isSearch &&
				dataBySearch.map(data => {
					return (
						<Card
							key={data.idMeal}
							imgSrc={data.strMealThumb}
							txt={data.strMeal}
							className={clsx(styles.foodItem)}
							url={`/find-recipe/${data.idMeal}?name=${data.strMeal}`}
						/>
					);
				})}
			{isSearch && dataBySearch.length === 0 && (
				<Text>
					No result <br />
					Try Another Keyword.
				</Text>
			)}
			{Search === '' && Selected === '' && <Text>There is no keyword your Input...</Text>}
		</section>
	);
}

export async function getStaticProps() {
	const { data } = await axios.get(`/categories.php`);
	return {
		props: { categories: data.categories }
	};
}
