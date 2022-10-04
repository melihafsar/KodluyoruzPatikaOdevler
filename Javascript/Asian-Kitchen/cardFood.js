export function cardFood(foodList){
    const newList = foodList.map(i => 
       `<div class="menu-items col-lg-6 col-sm-12">
      <img src="${i.img}" alt="${i.title}" class="photo">
      <div class="menu-info">
        <div class="menu-title">
          <h4>${i.title}</h4>
          <h4 class="price">${i.price}</h4>
        </div>
        <div class="menu-text">
          ${i.desc}
        </div>
      </div>
    </div>`
    );
    return newList;
  }
