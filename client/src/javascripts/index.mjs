import Grid from "../components/Grid.mjs";

(() => {
  const root = document.querySelector("#root");

  const gridTestData = [];
  for (let i = 0; i <= 17; i++) {
    const imageObject = {
      name: `grid-${i}`,
      url: `http://localhost:3000/images/(${i}).jpg`,
    };
    gridTestData.push(imageObject);
  }

  const grid = new Grid(root, gridTestData);
})();
