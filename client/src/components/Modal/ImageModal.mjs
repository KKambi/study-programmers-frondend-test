export default class ImageModal {
  $modalContainer = null;
  className = null;
  imageName = null;
  imageUrl = null;

  constructor({ target, className }) {
    const modalContainer = document.createElement("div");
    modalContainer.classList.add(className);

    target.insertAdjacentElement("beforeend", modalContainer);

    this.$modalContainer = modalContainer;
    this.className = className;

    this.render();
  }

  setState({ imageName, imageUrl }) {
    this.imageName = imageName;
    this.imageUrl = imageUrl;

    this.render();
  }

  render() {
    const modalContent = document.createElement("div");
    modalContent.classList.add(`${this.className}-content`);

    this.$modalContainer.innerHTML = `
      <div class="grid-image-modal-content">
        <img class="modal-image" >
      </div>
    `;
  }
}
