const getfoodcontainer = document.querySelector(".foodcontainer");
const getbadge = document.querySelector("#badgevalue");
const getcartbox = document.querySelector("#cartbox");
const getcart = document.querySelector(".cart");
const getamount = document.querySelector("#amount");
const getclosebtn = document.querySelector(".close");
const getamountdiv = document.querySelector(".Amoutdiv");

let extraspan = document.createElement("span");
extraspan.textContent = "0";
extraspan.style.display = "none";

getamountdiv.append(extraspan);

let mainDish;
let dessertDish;
let i;
let y;
let total = 0;

let trashicon;
let image;
let firsttextrow;
let itemname, itemtext;
let price, priceMMk, priceCart, priceSpan, priceCancel;
let addtocart, addtocartimg, orderBlur;

let num, addtocartnum, cancelnum, itemnum;

let itemwrapper;
let cartprice,
  cartdiv,
  cartimg,
  cartbutton,
  cartitemprice,
  cartcontent,
  removecart,
  removeitem;

let imagesrc, cartimagesrc;

let removecartitem = 1,
  cancelIndex = 1;

let cartid;

let cancelbtn;

// Async Function section
async function getMainMenu() {
  const response = await fetch("http://127.0.0.1:5500/data.json");
  mainDish = await response.json();

  actionOnMain();
}
getMainMenu();

async function getDessertMenu() {
  const response = await fetch("http://127.0.0.1:5500/dessertdata.json");
  dessertDish = await response.json();
  console.log(dessertDish);
  actionOnside();
}

function actionOnMain() {
  getfoodcontainer.innerHTML = "";

  for (i = 0; i < mainDish.length; i++) {
    // console.log(mainDish[i].image);

    image = document.createElement("img");
    image.classList.add("itemimage");
    imagesrc = mainDish[i].image;
    image.src = imagesrc;

    itemtext = mainDish[i].product;
    priceMMk = mainDish[i].priceNumber;
    priceCart = priceMMk;
    removeitem = mainDish[i].number;

    antiDRYfun();
  }
}

function actionOnside() {
  getfoodcontainer.innerHTML = "";

  for (i = 0; i < dessertDish.length; i++) {
    // console.log(dessertDish[i].image);
    image = document.createElement("img");
    image.classList.add("itemimage");
    imagesrc = dessertDish[i].image;
    image.src = imagesrc;

    itemtext = dessertDish[i].product;
    priceMMk = dessertDish[i].priceNumber;
    removeitem = dessertDish[i].number;

    antiDRYfun();
  }
}

const getdessrt = document.querySelector("#dessert");
const getmain = document.querySelector("#Main");

getdessrt.addEventListener("click", function (e) {
  // console.log("i am working");
  getDessertMenu();
  e.preventDefault();
});

getmain.addEventListener("click", function (e) {
  actionOnMain();
  e.preventDefault();
});

getcart.addEventListener("click", function () {
  if (getcartbox.classList.contains("addtocart1")) {
    getcartbox.classList.remove("addtocart1");
    getcartbox.classList.add("addtocart2");
  } else {
    getcartbox.classList.remove("addtocart2");
    getcartbox.classList.add("addtocart1");
  }
});

// Declaration Main Function
let antiDRYfun = function () {
  //first text row
  firsttextrow = document.createElement("div");
  firsttextrow.classList.add("firstrow");

  //1. itemname
  itemname = document.createElement("h3");
  itemname.textContent = itemtext;

  // extraSpan
  priceSpan = document.createElement("span");
  priceSpan.textContent = priceCart;
  priceSpan.style.display = "none";

  //2.Price
  price = document.createElement("h3");
  price.textContent = priceMMk + "MMK";
  price.style.color = "orange";

  //3.Number
  num = document.createElement("span");
  num.textContent = removeitem;
  num.style.display = "none";

  firsttextrow.append(itemname, price, num, priceSpan);

  // Add to cart (create each item)
  addtocart = document.createElement("div");
  addtocartimg = document.createElement("img");
  addtocart.appendChild(addtocartimg);
  addtocartimg.src = "./imgs/add2.png";
  addtocart.classList.add("addingcart");

  cancelbtn = document.createElement("button");
  cancelbtn.textContent = "Cancel Order";

  itemwrapper = document.createElement("div");
  itemwrapper.classList.add("items");
  itemwrapper.append(image, firsttextrow, addtocart, cancelbtn);

  getfoodcontainer.appendChild(itemwrapper);
  addtocart.addEventListener("click", addtocartfun);
};

let addtocartfun = function (e) {
  e.path[2].children[0].style.filter = "blur(2px)";
  e.path[2].children[3].style.display = "block";

  removecart = e.path[2].children[2].children[0];
  removecart.style.display = "none";

  cartdiv = document.createElement("div");
  cartimg = document.createElement("img");
  addtocartnum = document.createElement("span");
  cartitemprice = document.createElement("h4");
  cartcontent = document.createElement("h4");
  cartbutton = document.createElement("button");
  cartbutton.textContent = "x";

  cartcontent.textContent = e.path[2].children[1].children[0].textContent;
  addtocartnum.textContent = e.path[2].children[1].children[2].textContent;
  cartitemprice.textContent = e.path[2].children[1].children[1].textContent;

  addtocartnum.style.display = "none";
  cartdiv.classList.add("cartdiv");

  cartdiv.append(cartimg, addtocartnum, cartcontent, cartitemprice);

  cartimagesrc = e.path[2].children[0].src;

  cartimg.src = cartimagesrc;
  getcartbox.append(cartdiv);

  cancelbtn = e.path[2].children[3];
  e.path[2].style.border = "3px solid orange";
  cancelbtn.style.display = "block";

  // Calculating Add to cart Number
  y = getbadge.textContent;
  y++;
  getbadge.textContent = y++;

  // Calculating Amount
  console.log(e.path[2].children[1].children[3].textContent);
  total += Number(e.path[2].children[1].children[3].textContent);
  getamount.textContent = total + "MMK";
  // Cancel Event Listener
  cancelbtn.addEventListener("click", cancelfun);
  cartbutton.addEventListener("click", cancelfun);
};

let cancelfun = function (e) {
  getamount.textContent =
    total - Number(e.path[1].children[1].children[3].textContent) + "MMK";

  e.path[1].children[2].children[0].style.display = "block";
  e.path[1].children[0].style.filter = "blur(0)";
  e.target.parentElement.style.border = "none";
  e.target.style.display = "none";
  y = getbadge.textContent;
  y--;
  getbadge.textContent = y--;

  itemnum = Number(e.path[1].children[1].children[2].textContent);

  cancelnum = Number(addtocartnum.textContent);
  let spanvar;

  for (let k = 0; k < e.path[3].children[3].children.length; k++) {
    spanvar = e.path[3].children[3].children[k].children[1].textContent;

    if (+spanvar == itemnum) {
      e.path[3].children[3].children[k].remove();
    }
  }

  console.warn(total);
  console.warn(Number(e.path[1].children[1].children[3].textContent));
  console.log(total - Number(e.path[1].children[1].children[3].textContent));

  priceCancel = total - Number(e.path[1].children[1].children[3].textContent);
  total = priceCancel;
};
