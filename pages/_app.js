export default function App({ Component, pageProps }) {
	return (
		<div>
			<Component {...pageProps} />
		</div>
	);
}

/*
	Next 13에서는, pages 폴더 안쪽에 jsx를 넣기만 하면, 해당 .jsx의 파일명으로 자동 라우터 설정이 됨. (= page router 라고 함.)
	* 파일명은 소문자로 시작해야 함. 

	_document.js : Head 영역 설정 파일
	_app.js : index.js를 가져와서, document를 적용하여 root 컴포넌트를 작동시키는 시동 파일
	index.js : 초기 메인 페이지 컴포넌트 
*/
