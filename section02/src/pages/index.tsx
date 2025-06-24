// 아래 문제를 해결하기 위해, next에서 제공하는 CSS Module이라는 기능을 사용하면 됨.
// CSS Module은 기존 CSS를 모듈처럼 사용하는 기술인데, 특정 css의 클래스네임들을 자동으로 유니크한 이름으로 변환시켜주는 기술.
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
//import "./index.css"; // 글로벌 CSS 파일은 App 컴포넌트가 아닌 곳에서는 임포트할 수 없다고 오류가 난다. 이렇게 하다보면 다른 페이지와 충돌이 일어날 수 있기 때문.
export default function Home() {
  /*
  클래스명은 CSS Module에 의해 유니크하게 적용되는데,
  이는 "파일명_클래스명_해시값" 형태이다.
  여기서 해시값은 아예 랜덤이 아니라, CSS파일 내용 + 클래스명 조합에 대해 생성된 해시값이다.
  그래서 파일명, 클래스명, 해당 클래스의 CSS 내용이 모두 동일하면 동일한 해시가 나옴!
  */
  return (
    <>
      <h1 className={style.h1}>인덱스</h1>
      <h2 className={style.h2}>H2</h2>
    </>
  );
}

// page라는 매개변수로 현재 페이지 역할을 할 매개변수를 가져와 SearchableLayout으로 감싸진 페이지를 리턴해주는 함수
// 자바스크립트의 모든 함수는 객체이므로, 이렇게 메소드를 직접 추가할 수도 있다.
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
