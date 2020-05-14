export default class Grid {
  grid = null;
  data = null;

  constructor({ target, data }) {
    const grid = document.createElement("div");
    grid.className = "grid-wrapper";
    this.grid = grid;

    this.data = data;

    target.insertAdjacentElement("beforeend", grid);

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
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

      const row = `
        <div class="grid-row data-row-${i}">
          <img class="grid-img" src="${url}">
        </div>
      `;

      this.grid.insertAdjacentHTML("beforeend", row);
    }
  }
}
