import { routerMenu } from "./routerMenu.js"

function createBtn() {
  let buttonContainer = document.getElementById("container-btn");
  buttonContainer.innerHTML = `
  <button class="btn btn-outline-dark btn-item" id="All">All</button>
  <button class="btn btn-outline-dark btn-item" id="Korea">Korea</button>
  <button class="btn btn-outline-dark btn-item" id="Japan">Japan</button>
  <button class="btn btn-outline-dark btn-item" id="China">China</button>
  `
}

createBtn();

Array.prototype.forEach.call(
  document.querySelectorAll(".btn"),
  function (el) {
      el.addEventListener("click", function () {
          routerMenu(this.id)
      });
  }
);


