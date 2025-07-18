// 아래 문제를 해결하기 위해, next에서 제공하는 CSS Module이라는 기능을 사용하면 됨.
// CSS Module은 기존 CSS를 모듈처럼 사용하는 기술인데, 특정 css의 클래스네임들을 자동으로 유니크한 이름으로 변환시켜주는 기술.
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
//import "./index.css"; // 글로벌 CSS 파일은 App 컴포넌트가 아닌 곳에서는 임포트할 수 없다고 오류가 난다. 이렇게 하다보면 다른 페이지와 충돌이 일어날 수 있기 때문.
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head";

/* 
각 페이지에 해당하는 index 파일 내에 아래와 같이 
getServerSideProps라는 약속된 이름의 함수를 export하게 되면,
이 페이지는 이제부터 SSR(Server-Side Rendering) 방식으로
렌더링되게 된다.

사전 렌더링 때
Home보다 위에 있어서 먼저 동작하여
이 index 파일에 필요한 데이터를 서버 등에서 불러오는 기능

페이지 컴포넌트에서는 prop에서 각 이름으로 불러올 수 있음

이 함수는 딱 한 번, 서버 측에서만 실행이 된다!
*/
// export const getServerSideProps = async () => {

// 아래는 SSG(Static Site Generation) 방식!
export const getStaticProps = async () => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수

  // const data = "hello"; // 서버로부터 불러왔다고 가정

  //console.log("서버사이드 프롭스에요"); // 브라우저 콘솔에는 안뜨고, 밑에 터미널 콘솔에는 뜬다
  // window.location; // window is not defined! 브라우저에서 동작하는 게 아니므로.
  // props라는 프로퍼티가 있어야 한다
  // return {
  //   props: {
  //     data,
  //   },
  // };

  //console.log("인덱스 페이지 SSG로 하면 빌드 타임에 딱 한번!"); // 개발모드로 실행하면 SSR처럼 새로고침마다 호출됨!

  // 직렬 호출
  // const allBooks = await fetchBooks();
  // const recoBooks = await fetchRandomBooks();

  // 병렬 호출
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
    /*
    ISR(Incremental Static Regeneration, 증분 정적 재생성)
    SSG 방식에서 일정 주기마다 페이지를 자동으로 재생성하는 기능

    아래 revalidate의 값은 그 주기(초)!
    */
    //revalidate: 3,
    /*
    다만 시간과 관계없이 사용자의 행동에 따라 데이터가 업데이트되는 페이지는 활용이 어렵다.
    그래서 시간마다가 아니라, 요청(revalidate 요청) 받을 때마다 페이지를 다시 생성하는 ISR도 있으며
    이를 On-Demand ISR이라고 한다.

    SSG 방식으로 index를 만들기에 revalidate 없으면
    새로고침해도 바뀌지 않지만
    /api/revalidate에 handler를 구축해놓고
    localhost:3000/api/revalidate 로 요청을 보내보면
    index 페이지가 재생성이 되며
    다시 돌아와 index에서 새로고침해보면, 내용이 바뀐다.
    */
  };
};

export default function Home({
  allBooks,
  recoBooks,
}: // }: InferGetServerSidePropsType<typeof getServerSideProps>) {
InferGetStaticPropsType<typeof getStaticProps>) {
  // console.log(allBooks); // 서버측에서 js 실행 한번, 브라우저에서 받은 js 번들 실행(hydration) 한번. 총 두번 뜸(브라우저 & 터미널 콘솔)
  /*
   위와 같은 이유로 이 컴포넌트 안에서 window를 써도 오류가 날 수 있다.
   브라우저에서만 실행하게 하고 싶다면,
   제일 쉬운 방법은 useEffect 훅을 활용하는 것.
   */

  /*
  클래스명은 CSS Module에 의해 유니크하게 적용되는데,
  이는 "파일명_클래스명_해시값" 형태이다.
  여기서 해시값은 아예 랜덤이 아니라, CSS파일 내용 + 클래스명 조합에 대해 생성된 해시값이다.
  그래서 파일명, 클래스명, 해당 클래스의 CSS 내용이 모두 동일하면 동일한 해시가 나옴!
  */
  return (
    <>
      {/* 페이지별로 필요한 타이틀이나 메타태그 등 설정 가능 */}
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

// page라는 매개변수로 현재 페이지 역할을 할 매개변수를 가져와 SearchableLayout으로 감싸진 페이지를 리턴해주는 함수
// 자바스크립트의 모든 함수는 객체이므로, 이렇게 메소드를 직접 추가할 수도 있다.
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
