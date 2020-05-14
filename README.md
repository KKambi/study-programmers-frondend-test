# 2020 프로그래머스 Dev-matching 웹 프론트엔드 관련 학습
- 2020 Dev-matching (프론트엔드) 과정을 복습하며 관련 내용을 학습하는 프로젝트

---
</br>

## HTML/CSS 관련

</br>

### 1. Semantic MarkUp
- 웹페이지는 html을 통해 구성되는 문서
- 의미있는`semantic` 구조`markup`을 구성하자
- 내가 채울 데이터를 가장 잘 설명하고 나타내는 tag를 선택
- h1이 아닌 span으로 css를 주어 나타내면 non-semantic

</br>

***시맨틱 태그 목록***

| 태그      | 내용                                     |
| ------- | -------------------------------------- |
| header  | 헤더 (상단)                                |
| nav     | 네비게이션                                  |
| aside   | 사이드에 위치한 공간                            |
| section | 본문의 여러 내용(article)을 포함한 공간             |
| article | 본문의 주내용                                |
| footer  | 푸터 (하단)                                |
| h1      | 해당 페이지의 최상위 제목                         |
| mark    | 현재 맥락에서 중요하여 하이라이트할 부분                 |
| details | 열고 닫을 수 있는 상세 정보 위젯, 자식으로 <summary> 사용 |
| time    | 시간의 특정 지점 또는 구간                        |

</br>

### 2. 미디어 쿼리 in Grid
- 디바이스의 화면 가로 크기에 따라, row당 column 개수 조절하기
- 그리드 html은 이중 div 구조
- grid-wrapper에 css를 적용한다
- grid-template-colums : 명시적 컬럼의 크기를 정의. repeat()을 통해 반복할 수 있으며 fr(fraction, 공간비율 단위)를 사용가능
  - repeat(n, 1fr)은 n개의 그리드 아이템에 대해 각각 1fr을 적용
  - fr은 남은 자유 공간을 총 fr로 분할한 뒤, 각 fr만큼 배정
  - 그런데 이 경우 자유 공간 = 전체 공간이므로, `1개 row에 3개 column을 넣겠다`는 단순한 표현에 불과함
- grid-auto-rows: grid-template의 영향을 받지 않는 암시적 행의 크기를 정의.

```css
.grid-wrapper {
  display: grid;
  grid-auto-rows: 200px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}
```

</br>

***반응형 그리드 구현***
- 디바이스의 width에 따라 컬럼 개수가 달라지는 반응형 그리드
- 오버라이딩은 안되는 듯. 중복 코드를 여러 번 넣어야 한다.

```css
@media all and (max-width: 450px) {
  .grid-wrapper {
    display: grid;
    grid-auto-rows: 200px;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
  }
}

@media all and (min-width: 451px) and (max-width: 900px) {
  .grid-wrapper {
    display: grid;
    grid-auto-rows: 200px;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
  }
}

@media all and (min-width: 901px) {
  .grid-wrapper {
    display: grid;
    grid-auto-rows: 200px;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
  }
}
```

</br>

### 3. 다크 모드 토글 버튼
- 버튼을 누르면 화이트모드/다크모드가 토글되는 버튼 구현

</br>

***토글 버튼 구현***
- 버튼 click event로 클릭 시 로컬 스토리지에서 현재 theme변수값을 가져옴
- 변수값에 따라 적절한 반대값을 body className에 적용
- theme에 따라 폰트컬러와 백그라운드컬러 css 변수를 다르게 정의
- 하위 요소에서 해당 변수를 사용하면 된다.
- localStorage.getItem() / localStorage.setItem()

</br>

***다크 모드 탐지***
- window.matchMedia(미디어쿼리스트링)
- 해당 OS의 선호 모드는 @media (prefers-color-scheme: dark){ ... } 으로 선언
- matches 참/거짓 값을 통해 분기를 태울 수 있다.

```javascript
const mqList = window.matchMedia("(prefers-color-scheme: dark)");
if (mqList.matches) {
  body.className = "dark";
} else {
  //3. 선호 모드가 없다면 기본 light 모드
  body.className = "light";
}
```

