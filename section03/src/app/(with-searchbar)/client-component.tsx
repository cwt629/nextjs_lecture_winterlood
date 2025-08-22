"use client";

import { ReactNode } from "react";
import ServerComponent from "./server-component";

export default function ClientComponent({ children }: { children: ReactNode }) {
  console.log("클라이언트 컴포넌트!");

  /*
  Client Component 안에서 Server Component를 import하면 안된다.
  다만 그렇다고 에러가 발생하진 않고
  Next 측에서 Server Component를 자동으로 Client Component로 만든다!
  물론 이는 권장되지 않는 패턴이다.

  그래도 이러한 패턴이 필요하다면, children으로 받아서 그 children을 렌더링하는 방향이 좋다.
  children으로 받은 컴포넌트는 Client Component로 변경하지 않는다.
  딱 그 결과물만 children으로 받도록 구조가 변경된 것이기 때문!
  */
  //   return <ServerComponent />;
  return <div>{children}</div>;
}
