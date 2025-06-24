import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  // const router = useRouter();
  // const onClickButton = () => {
  //   router.push("/test"); // Link 컴포넌트들은 pre-fetching이 되지만, programmatic하게 이동하는 이런 경우는 안 됨.
  //   // router.replace("/test");
  //   // router.back();
  // };

  // // programmatic한 링크도 프리페칭하기: 명시적으로
  // useEffect(() => {
  //   router.prefetch("/test");
  // }, []);

  // 이전 return 문 안 실습
  {
    /* <header>
        <Link href={"/"}>index</Link>
        &nbsp;
        아래는 prefetch 해제하는 것
        <Link href={"/search"} prefetch={false}>
          search
        </Link>
        &nbsp;
        <Link href={"/book/1"}>book/1</Link>
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header> */
  }

  // console.log(Component.getLayout); // App 컴포넌트로 잘 전달이 된다!
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page); // 없는 경우에 대한 예외처리

  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
