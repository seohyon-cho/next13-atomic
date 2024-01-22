import axios from 'axios';

axios.defaults.baseURL = 'https://www.themealdb.com/api/json/v1/1';

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




		Next 13에서의 새로운 렌더링 방식
	
	(1). CSR (Client Side Rendering)
	: 기존 리액트와 동일하게 컴포넌트가 브라우저에 마운트 되었을 때, 클라이언트 쪽에서 페이지 빌드를 시작함. 

	(2). SSR (Server Side Rendering)
	: URL 요청이 있을 때마다, 서버 쪽에서 Page 빌드 후, 완성된 HTML파일을 클라이언트 쪽으로 제공함. 

	(3). SSG (Static Site Generation)
	: 처음 프로젝트 빌드 시, 미리 preRender 처리 해서 완성된 정적인 HTML 파일을 클라이언트 쪽에 제공함. 

	(4). ISR (Incremental Static Regeneration)
	: SSG와 마찬가지로, 처음 빌드 시 미리 preRender되나, 일정시간마다 정기적으로 서버 쪽에서 데이터를 refetching하여, 점진적으로 새로운 데이터로 변경된 PreRender Page를 제공함. 

-----------------------------------------------------------------

	[ Atomic Design Pattern ]
	: 컴포넌트를, 원자처럼 최소 단위로 쪼개어 재활용 가능하게끔 컴포넌트를 개발하는 로직. 

	* Atoms : 원자 단위 컴포넌트 
			- 버튼, 메뉴, 제목, 글자, form요소, 이미지, ...

	* Molecule : 분자 단위 컴포넌트 (원자 단위 컴포넌트를 조합하여 한 단계 상위 컴포넌트를 만드는 것)
			- ex) 검색 바 (폼+버튼), 블로그 리스트 1개 (글자+버튼+이미지)

	* Organisms : 유기체 컴포넌트 (분자 단위 컴포넌트를 조합하여 한 단계 상위 컴포넌트를 만드는 것)
	(독립적인 기능을 할 수 있는 컴포넌트)
			- ex) Header, 블로그 목록, Footer, 비쥬얼, ...

	* Page (페이지 레이아웃) : 각 유기체를 조합해 구성한 페이지 컴포넌트 


	[ Atomic Design Pattern 의 단점 ]

	(1). 최초 개발 시 공수가 많이 들어감. (설계를 치밀하게 해야 동작함.)
	(2). Atomic Design Pattern으로 개발한 컴포넌트의 구조를, 이를 활용하여 프로젝트를 진행할 모든 팀원들이 모두 해당 내용을 숙지하고 있어야 함. 
*/
