import { ReactNode } from "react";
import Searchbar from "./searchbar";

/*
폴더명에 ()로 묶은 것을 Route Group이라고 하며
실제 루트에 영향을 주지 않음
그리고 2개 이상의 페이지에 공통된 레이아웃을 주고 싶을 때 유용하다!
*/
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
}
