import Input from "./Input.mjs";
import Button from "./Button.mjs";

export default class SearchBar {
  $searchBar = null;

  constructor({ target, className }) {
    const searchBar = document.createElement("div");
    searchBar.className = className;

    target.insertAdjacentElement("beforeend", searchBar);

    this.$searchBar = searchBar;

    this.render();
  }

  search() {}

  randomSerch() {}

  toggleTheme() {
    //1. 사용자가 토글한 적이 있는지 검사한다
    let userTheme = localStorage.getItem("userTheme");

    //2. 토글한 적이 있다면 이전 모드의 반대 모드로 설정한다
    if (userTheme) {
      userTheme === "light" ? (userTheme = "dark") : (userTheme = "light");
    }
    //3. 토글한 적이 없다면 dark 모드로 설정한다.
    else {
      userTheme = "dark";
    }

    //4. 로컬스토리지에 바뀐 모드를 저장한다.
    localStorage.setItem("userTheme", userTheme);

    //5. body에 적용
    document.querySelector("body").className = userTheme;
  }

  render() {
    const serachInput = new Input({
      target: this.$searchBar,
      className: "search-input",
    });

    const searchButton = new Button({
      target: this.$searchBar,
      onClick: this.search,
      className: "search-button",
      buttonName: "검색",
    });

    const randomButton = new Button({
      target: this.$searchBar,
      onClick: this.randomSerch,
      className: "randomSearch-button",
      buttonName: "랜덤",
    });

    const themeToggleButton = new Button({
      target: this.$searchBar,
      onClick: this.toggleTheme,
      className: "themeToggle-button",
      buttonName: "★",
    });
  }
}
