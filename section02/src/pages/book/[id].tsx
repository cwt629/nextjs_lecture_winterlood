// import { useRouter } from "next/router";
import style from "./[id].module.css";

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

const mockData = {
  id: 1,
  title: "한 입 크기로 잘라 먹는 리액트",
  subTitle: "자바스크립트 기초부터 애플리케이션 배포까지",
  description:
    "자바스크립트 기초부터 애플리케이션 배포까지\n처음 시작하기 딱 좋은 리액트 입문서\n\n이 책은 웹 개발에서 가장 많이 사용하는 프레임워크인 리액트 사용 방법을 소개합니다. 인프런, 유데미에서 5000여 명이 수강한 베스트 강좌를 책으로 엮었습니다. 프런트엔드 개발을 희망하는 사람들을 위해 리액트의 기본을 익히고 다양한 앱을 구현하는 데 부족함이 없도록 만들었습니다. \n\n자바스크립트 기초 지식이 부족해 리액트 공부를 망설이는 분, 프런트엔드 개발을 희망하는 취준생으로 리액트가 처음인 분, 퍼블리셔나 백엔드에서 프런트엔드로 직군 전환을 꾀하거나 업무상 리액트가 필요한 분, 뷰, 스벨트 등 다른 프레임워크를 쓰고 있는데, 실용적인 리액트를 배우고 싶은 분, 신입 개발자이지만 자바스크립트나 리액트 기초가 부족한 분에게 유용할 것입니다.",
  author: "이정환",
  publisher: "프로그래밍인사이트",
  coverImgUrl:
    "https://shopping-phinf.pstatic.net/main_3888828/38888282618.20230913071643.jpg",
};

export default function Page() {
  // const router = useRouter();
  //   console.log(router);
  // const { id } = router.query;
  // console.log(id); // catch all segment로 하면 배열 형태로 주어짐!
  // return <h1>Book {id}</h1>;

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    mockData;
  return (
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
  );
}
