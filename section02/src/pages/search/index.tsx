import SearchableLayout from "@/components/searchable-layout";
// import { useRouter } from "next/router"; // next/router가 Page Router, next/navigate는 App Router용!
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // 브라우저로부터 받은 요청에 대한 모든 정보가 context에 포함되어 있다!
  const q = context.query.q;
  const books = await fetchBooks(q as string);

  return {
    props: { books },
  };
};

export default function Page({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const router = useRouter();
  // const { q } = router.query;
  //console.log(router); // query string이 있으면, 읽기 전 / 후 2번 콘솔 출력이 됨

  // return <h1>Search {q}</h1>;

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
