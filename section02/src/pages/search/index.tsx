import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router"; // next/router가 Page Router, next/navigate는 App Router용!
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import Head from "next/head";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
// export const getStaticProps = async (
//   context: GetStaticPropsContext
// ) => {
// 브라우저로부터 받은 요청에 대한 모든 정보가 context에 포함되어 있다!
// const q = context.query.q; // SSR 방식

/* SSG 방식 - 
  빌드 타임에 쿼리를 알 수가 없으므로 query가 없다.
  그래서 그렇게 하려면 페이지 컴포넌트 안에서 직접 패칭을 해줘야 한다.
  */
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);

//   return {
//     props: { books },
//   };
// };

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      // 검색 결과를 불러오는 로직
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스 - 검색결과" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
