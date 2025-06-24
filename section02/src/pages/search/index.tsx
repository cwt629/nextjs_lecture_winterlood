import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router"; // next/router가 Page Router, next/navigate는 App Router용!
import { ReactNode } from "react";

export default function Page() {
  const router = useRouter();
  const { q } = router.query;
  //console.log(router); // query string이 있으면, 읽기 전 / 후 2번 콘솔 출력이 됨

  return <h1>Search {q}</h1>;
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
