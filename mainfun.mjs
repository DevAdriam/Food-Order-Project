export function antiDRYfun() {
  //first text row
  firsttextrow = document.createElement("div");
  firsttextrow.classList.add("firstrow");

  //1. itemname
  itemname = document.createElement("h3");
  itemname.textContent = itemtext;

  //2.Price
  price = document.createElement("h3");
  price.textContent = priceMMk;
  price.style.color = "orange";

  firsttextrow.append(itemname, price);

  addtocart = document.createElement("div");
  addtocartimg = document.createElement("img");
  addtocart.appendChild(addtocartimg);
  addtocartimg.src = "./imgs/add2.png";
  addtocart.classList.add("addingcart");

  itemwrapper = document.createElement("div");
  itemwrapper.classList.add("items");
  itemwrapper.append(image, firsttextrow, addtocart);

  getfoodcontainer.appendChild(itemwrapper);
  let cartprice = mainDish[i].priceNumber;
}
