/*
[id] : 정확히 하나의 파라미터에만 대응
[...id] : 하나 이상의 파라미터에 대응(Catch All Segment)
[[...id]] : 모든 개수의 파라미터에 대응(Optional Catch All Segment)
*/
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>book/[id] 페이지 : {id}</div>;
}
