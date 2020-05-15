# 2020 프로그래머스 Dev-matching 웹 프론트엔드 관련 학습
- 2020 Dev-matching (프론트엔드) 과정을 복습하며 관련 내용을 학습하는 프로젝트

---

## HTML/CSS 관련
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

---

## Javscript 관련

### 1. 다크 모드 토글 버튼
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

</br>

### 2. 그리드 이미지 Lazy Loading
- 스크롤을 내리면서 이미지가 일정 비율 viewport에 들어왔을 때 loading
- Intersection Observer API를 이용해 구현
- [링크](http://blog.hyeyoonjung.com/2019/01/09/intersectionobserver-tutorial/)에 매우 자세하게 나와있음

</br>

***Intersection API***
1. 어떤 컨테이너릁 탐색할 것인지, 마진은 어떻게 할 것인지, 어떤 비율만큼 교차되었을 때 해당 콜백을 실행할 것인지 등의 options 변수 선언
```javascript
const options = {
  root: null,   //null이면 브라우저의 viewport
  rootMargin: '0px 0px 30px 0px',
  threshold: 0
}
```

</br>

2. Intersection Observer 인스턴스 생성
   - 콜백함수(탐지되었을 때 실행할 함수)와 options를 인자로 생성
   - 이미지를 로딩해야 하므로, data-src attribute에 URL을 넣어놓았다가, src attribute에 할당하는 방법 사용
   - 한 번 불러왔다면 더 이상 observe할 필요 없으므로 unobserve
   - 해당 콜백은 IntersectionObserverEntry 객체의 배열을 반환하므로 루프를 돌며 해당 객체의 프로퍼티를 활용해야 함
```javascript
const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  })
}, options)
```

</br>

3. 관찰할 대상을 등록
   - 여러 개의 그리드 이미지를 querySelectorAll로 탐색한 뒤, 루프 돌려서 등록 가능
```javascript
const images = document.querySelectorAll('.image');
images.forEach((el) => {
  io.observe(el);
})
```

</br>

### 3. 모달
- 이미지를 클릭하면 이미지 / 이름 / url을 담은 모달 띄움
- 모달이 띄워져 있을 때 배경 투명화
- x버튼이나 모달 바깥 부분을 클릭하면 모달이 사라짐

</br>

***모달 구현***
1. viewport 전체를 감싸는 모달 컨테이너 (display: none 상태)
2. 모달 컨테이너 내의 모달 컨텐츠 (부모가 none이므로 따로 설정할 필요는 없음)
3. 이미지를 클릭 시, 해당 이미지의 상태를 모달 컴포넌트에 전달

> Q. 모달 컴포넌트에 이미지 상태 전달 시, 모달 컨텐츠는 캐싱된 이미지를 보여주는가?
> A. 캐싱해서 바로 로딩 가능하다.

</br>

***모달 오픈 및 클로즈 구현***
1. 오픈 -> 클릭 이벤트 + img태그의 src 및 data-name 바꿔끼기
2. 클로즈 -> 윈도우 객체 keydown 이벤트 + x버튼 click 이벤트 + 모달컨테이너(투명한 부분) click 시 e.target.className 감지하여 modal close 함수 호출

</br>

### 4. API 호출하여 화면에 뿌려주기
- `검색` 버튼 클릭 시 해당 id의 사진 그리드에 담기
- `랜덤` 버튼 클릭 시 20개의 랜덤 사진 그리드에 담기
- 검색 중임을 표시하는 UI 집어넣기
- 검색 결과가 없는 경우, 이를 표시하는 UI 집어넣기