import SearchBar from "./SerachBar/SearchBar.mjs";
import ImageModal from "./Modal/ImageModal.mjs";
import Grid from "./Grid/Grid.mjs";

export default class App {
  root = null;

  constructor() {
    //루트
    this.root = document.querySelector("#root");

    this.render();
  }

  setTheme() {
    const userTheme = localStorage.getItem("userTheme");
    const body = document.querySelector("body");

    //1. 토글한 적이 있다면 기존 모드대로 설정
    if (userTheme) {
      body.className = userTheme;
    } else {
      //2. 토글한 적이 없다면, OS 선호 모드가 있는지 확인
      const mqList = window.matchMedia("(prefers-color-scheme: dark)");
      if (mqList.matches) {
        body.className = "dark";
      } else {
        //3. 선호 모드가 없다면 기본 light 모드
        body.className = "light";
      }
    }
  }

  render() {
    //모드 설정
    this.setTheme();

    //상단 검색바 렌더링
    const serachBar = new SearchBar({
      target: this.root,
      className: "search-bar",
    });

    //그리드의 이미지를 띄울 모달
    const gridImageModal = new ImageModal({
      target: this.root,
      className: "grid-image-modal",
    });

    //그리드 테스트 데이터
    const gridTestData = [];
    for (let i = 0; i <= 17; i++) {
      const imageObject = {
        name: `grid-${i}`,
        url: `https://picsum.photos/600/400/?random?${i}`,
      };
      gridTestData.push(imageObject);
    }

    //그리드 렌더링
    const photoGrid = new Grid({
      target: this.root,
      data: gridTestData,
      modalContainerName: "grid-image-modal",
    });

    //그리드 옵저버 설정
    photoGrid.setObserver();
  }
}
