export default class Button {
  $buttonWrapper = null;
  onClick = null;
  className = null;
  buttonName = null;

  constructor({ target, className, buttonName, onClick }) {
    const buttonWrapper = document.createElement("div");
    this.$buttonWrapper = buttonWrapper;

    target.insertAdjacentElement("beforeend", buttonWrapper);

    this.onClick = onClick;
    this.className = className;
    this.buttonName = buttonName;

    this.render();
  }

  render() {
    const button = document.createElement("button");
    button.classList.add(this.className);
    button.innerHTML = this.buttonName;
    button.addEventListener("click", () => {
      this.onClick();
    });

    this.$buttonWrapper.insertAdjacentElement("beforeend", button);
  }
}
