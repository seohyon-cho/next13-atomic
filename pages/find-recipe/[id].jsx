import { useRecipeById } from '@/hooks/useRecipe';
import { useRouter } from 'next/router';

function Detail() {
	const router = useRouter();
	const { id } = router.query;
	const { data, isSuccess } = useRecipeById(id);
	console.log(data);

	return <section></section>;
}

export default Detail;
