import { cardFood } from "./cardFood.js";
import { menu } from "./menu.js"

window.addEventListener("load",listAllMenu);
let section = document.querySelector(`.section-center`);

export function routerMenu(id){
  switch (id) {
    case "All":
      listAllMenu();
      break;
    case "Korea":
      listKoreaMenu();
      break;
    case "Japan":
      listJapanMenu();
      break;
    case "China":
      listChinaMenu();
      break;
    default:
      listAllMenu();
      break;
  }
}

function listAllMenu(){
    let array = cardFood(menu);
    while (section.hasChildNodes()) {
        section.removeChild(section.firstChild);
      }
    
    array.forEach(element => {
        let div = document.createElement("div");
        div.innerHTML = element;
        section.append(div);    
    });
  }
  
  function listKoreaMenu(){
    let arrayKoreaFoods = menu.filter(item => item.category == "Korea");
    let array = cardFood(arrayKoreaFoods);

    while (section.hasChildNodes()) {
        section.removeChild(section.firstChild);
    }
    
    array.forEach(element => {
        let div = document.createElement("div");
        div.innerHTML = element;
        section.append(div);    
    });
    
  }
  
  function listJapanMenu(){
    let arrayJapanFoods = menu.filter(item => item.category == "Japan");
    let array = cardFood(arrayJapanFoods);
    
    while (section.hasChildNodes()) {
        section.removeChild(section.firstChild);
    }

    array.forEach(element => {
        let div = document.createElement("div");
        div.innerHTML = element;
        section.append(div);
    });

    
  }
  function listChinaMenu(){
    let arrayChinaFoods = menu.filter(item => item.category == "China");
    let array = cardFood(arrayChinaFoods);
    
    while (section.hasChildNodes()) {
        section.removeChild(section.firstChild);
      }

    array.forEach(element => {
        let div = document.createElement("div");
        div.innerHTML = element;
        section.append(div);
    });
  }