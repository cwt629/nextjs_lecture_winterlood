import { useRouter } from "next/router";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-one-book";
import Head from "next/head";

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

/*
동적 경로에 SSG를 적용하기 위해서는
각 id에 해당하는 페이지를 사전 렌더링해야 하기 때문에
id에 뭐가 들어갈 수 있을지를 미리 구해놓는 과정이 필요하다!
그래서 여기서 경로 설정하기 과정이 필요하며, 그 역할을 하는 것이 getStaticPaths이다.

n개의 경로에 대해 총 n개의 페이지를 렌더링한다!

빌드한 뒤, .next/server/pages/book 폴더에 가면 1, 2, 3번이 만들어져 있는 걸 확인 가능!
*/
export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    /*
    대체, 대비책, 보험 정도로 해석되는 폴백
    저기 없는 path로 접속 요청을 하게 되면 실행할 대비책

    false: 404 반환

    'blocking': 즉시 생성(like SSR), next 서버에 저장됨.
    그 이후 요청에서도 그걸 그대로 사용.

    true: 데이터 없는 폴백 상태의 페이지만 미리 반환 + 즉시 생성
    props 없는 페이지를 먼저 반환(데이터가 없는 상태의 페이지 렌더링. getStaticProps 계산 전에 빈 Page 먼저!)
    그 이후 props 계산하고, props만 따로 반환(데이터가 있는 상태의 페이지 렌더링)
    */
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id; // [id].tsx는 무조건 url parameter가 하나 있어야 접근할 수 있으니까, 타입 단언을 해도 안전하다
  const book = await fetchOneBook(Number(id));

  // 실제로 존재하지 않는 페이지로 갔을 때 not found로 바로 보내고 싶을 경우(리다이렉트)
  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  //   console.log(router);
  // const { id } = router.query;
  // console.log(id); // catch all segment로 하면 배열 형태로 주어짐!
  // return <h1>Book {id}</h1>;

  // fallback 상태(데이터를 기다리는 중)
  // if (router.isFallback) return "로딩 중입니다..."; // 이렇게 할 경우, 아래 head로 가기 전에 여기서 바로 리턴되므로 head가 없으며 SEO 설정이 안되는 문제가 있다.
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입북스</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스" />
          <meta
            property="og:description"
            content="한입 북스에 등록된 도서들을 만나보세요"
          />
        </Head>
        <div>로딩 중입니다...</div>
      </>
    );
  }
  if (!book) return "문제가 발생했습니다. 다시 시도해주세요."; // 로딩이 끝났음에도 데이터가 없음

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
