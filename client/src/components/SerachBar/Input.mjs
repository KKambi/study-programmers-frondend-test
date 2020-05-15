export default class Input {
  $input = null;
  className = null;

  constructor({ target, className }) {
    const input = document.createElement("div");
    this.$input = input;

    target.insertAdjacentElement("beforeend", input);

    this.className = className;

    this.render();
  }

  render() {
    this.$input.innerHTML = `
      <input class="${this.className}">
      </input>
    `;
  }
}
