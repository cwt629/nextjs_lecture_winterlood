import { useRouter } from "next/router";

// /book/{id} 로 들어온다!
// {id}와 같은 애를 URL Parameter라고 부른다.

/*
/book/1/2/3/4/5... 와 같이 여러 개의 아이디가 들어올 수 있다면
파일명을 [id].tsx 대신에 [...id].tsx 로 하면 커버 가능하다.
이러한 경로를 Catch ALL Segment라고 한다 (Segment: 구간)

단 여기는 뭐라도 대응이 되어야 하며
url parameter가 없으면 대응이 되지 않음
이런 경우는 index.tsx를 따로 만들어서 대응이 가능하긴 한데,
모두 대응 가능하게 하려면
[[...id]].tsx 로 만들면 된다.
이러한 방식을 Optional Catch All Segment라고 한다.
*/
export default function Page() {
  const router = useRouter();
  //   console.log(router);
  const { id } = router.query;
  // console.log(id); // catch all segment로 하면 배열 형태로 주어짐!
  return <h1>Book {id}</h1>;
}
