import ObserverFactory from "../../utils/ObserverFactory.mjs";

export default class $grid {
  $grid = null;
  data = null;
  modalContainer = null;
  modalContainerName = null;

  constructor({ target, data, modalContainerName }) {
    const grid = document.createElement("div");
    grid.className = "grid-wrapper";
    this.$grid = grid;

    this.data = data;
    this.modalContainerName = modalContainerName;
    this.modalContainer = document.querySelector(`.${this.modalContainerName}`);

    target.insertAdjacentElement("beforeend", grid);

    this.setOpenModal();
    this.addDisableHandler();

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  setObserver() {
    const factory = new ObserverFactory();
    const options = {
      root: null,
      threshold: 0,
    };

    const photos = document.querySelectorAll(".grid-img");
    factory.setObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target);
        }
      });
    }, options);

    factory.startObserve(photos);
  }

  setOpenModal() {
    this.$grid.addEventListener("click", (e) => {
      console.log(e);
      if (e.target.className === "grid-img") {
        //dataset.src와 dataset.name을 가져온다
        const name = e.target.dataset.name;
        const url = e.target.dataset.src;

        //모달 이미지 상태를 전달한다

        const image = this.modalContainer.querySelector("img");
        image.dataset.name = name;
        image.src = url;

        //모달을 오픈한다
        this.modalContainer.style.display = "block";
      }
    });
  }

  addDisableHandler() {
    //윈도우 객체에 keydown 이벤트 추가
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) {
        this.closeModal();
      }
    });

    //모달 컨테이너 객체에 click 이벤트 추가
    this.modalContainer.addEventListener("click", (e) => {
      if (e.target.className === "grid-image-modal") {
        this.closeModal();
      }
    });
  }

  closeModal() {
    this.modalContainer.style.display = "none";
  }

  render() {
    if (this.data === null) return;

    /*
      data는
      {
        name: 이미지이름
        url: 이미지경로
      }
      형식의 여러 객체를 담고 있는 배열
    */

    const dataCnt = this.data.length;

    for (let i = 0; i < dataCnt; i++) {
      const { name, url } = this.data[i];

      const gridImage = document.createElement("img");
      gridImage.classList.add("grid-img");
      gridImage.dataset.name = name;
      gridImage.dataset.src = url;

      this.$grid.insertAdjacentElement("beforeend", gridImage);
    }
  }
}
