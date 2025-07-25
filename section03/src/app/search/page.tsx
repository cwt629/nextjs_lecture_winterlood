/*
URL Param과 같은 정보는 props로 자동 전달이 된다

그리고 이 컴포넌트는 서버 측에서 사전 렌더링을 위해 딱 한번만 실행되는
React Server Component이기 때문에
비동기로 처리해도 문제가 되지 않으므로 async를 붙여줄 수 있다!
*/
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  return <div>Search 페이지 : {q}</div>;
}
