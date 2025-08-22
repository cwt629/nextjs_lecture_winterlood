// "use client"; // client component로 만들기 위함

// import { useEffect } from "react";
import ClientComponent from "./client-component";
import styles from "./page.module.css";
import ServerComponent from "./server-component";

/*
React Server Component
상호작용이 없는 컴포넌트는 굳이 서버에서 한번, 클라이언트에서 한번
총 두번을 실행할 필요가 없다.
즉, JS Bundle에 포함되어 hydration을 거칠 필요가 없는 것.
이들은 React Server Component로 생성하여
JS Bundle에 들어가지 않도록 하는 것이 좋다.

Next는 기본적으로 React Server Component로 구성하고 있다.

React Server Component에 대한 주의사항은 다음과 같다.
1. 서버 컴포넌트에는 브라우저에서 실행될 코드가 포함되면 안 된다.
2. 클라이언트 컴포넌트는 클라이언트에서만 실행되는 것이 아니라, 사전 렌더링 과정에서도 한번더 실행된다.
3. 클라이언트 컴포넌트에서 서버 컴포넌트를 import할 수 없다.
4. 서버 컴포넌트에서 클라이언트 컴포넌트(자식)에게 직렬화되지 않는 props(예: 함수)는 전달할 수 없다.

특히 4번은, 사전 렌더링 과정에서 모든 컴포넌트들을 통해 완성된 html 페이지를 만드는 그 과정 중간에
서버 컴포넌트들만 따로 실행하고, RSC Payload(React Server Component Payload)를 생성하는 과정이 있다.
이 과정에서 모든 데이터가 직렬화되어 저장이 되는데
여기서 서버 컴포넌트가 자식 클라이언트 컴포넌트에게 함수와 같은 props를 넘겨주면
그 데이터도 같이 RSC Payload에 넣어줘야 하는데
그것이 불가능하다! "직렬화"하여 저장해야 하기 때문에.
그래서 안되는 거다.
*/
export default function Home() {
  // console.log("Home 컴포넌트 실행"); // React Server Component로, 서버단에서만 출력됨
  // const secretKey = "qwer123"; // 마찬가지로 클라이언트 측에 전달조차 되지 않음!

  // useEffect(() => {}); // Error! 클라이언트에서 동작하는 것이므로 오류남.

  return (
    <div className={styles.page}>
      인덱스 페이지
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
