const getfoodcontainer = document.querySelector(".foodcontainer");
const getbadge = document.querySelector("#badgevalue");
const getcartbox = document.querySelector("#cartbox");
const getcart = document.querySelector(".cart");
const getamount = document.querySelector("#amount");
const getclosebtn = document.querySelector(".close");

let mainDish;
let dessertDish;
let i;
let y = 1;
let total = 0;

let trashicon;
let image;
let firsttextrow;
let itemname, itemtext;
let price, priceMMk;
let addtocart, addtocartimg;

let itemwrapper;
let cartprice,
  cartdiv,
  cartimg,
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
  const response = await fetch("http://127.0.0.1:5501/data.json");
  mainDish = await response.json();

  actionOnMain();
}
getMainMenu();

async function getDessertMenu() {
  const response = await fetch("http://127.0.0.1:5501/dessertdata.json");
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

    antiDRYfun();
  }
}

const getdessrt = document.querySelector("#dessert");
const getmain = document.querySelector("#Main");

getdessrt.addEventListener("click", function () {
  // console.log("i am working");
  getDessertMenu();
});

getmain.addEventListener("click", function () {
  actionOnMain();
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

  //2.Price
  price = document.createElement("h3");
  price.textContent = priceMMk + "MMK";
  price.style.color = "orange";

  firsttextrow.append(itemname, price);

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
  // e.path[4].children[3].children[removecartitem].id = `${removecartitem}`;

  removecartfilter = e.path[2].children[0];
  removecartfilter.style.filter = "blur(2px)";
  e.path[2].children[3].style.display = "block";

  removecart = e.path[2].children[2].children[0];
  removecart.style.display = "none";

  cartdiv = document.createElement("div");
  cartimg = document.createElement("img");
  cartitemprice = document.createElement("h4");
  cartcontent = document.createElement("h4");

  cartcontent.textContent = e.path[2].children[1].children[0].textContent;

  cartitemprice.textContent = e.path[2].children[1].children[1].textContent;
  cartdiv.classList.add("cartdiv");

  cartdiv.append(cartimg, cartcontent, cartitemprice);
  cartimagesrc = e.path[2].children[0].src;

  console.log(cartimagesrc);
  cartimg.src = cartimagesrc;
  getcartbox.append(cartdiv);

  getbadge.textContent = y++;

  console.log(removecartitem);
  console.log(e.path[4].children[3].children[removecartitem]);

  cartid = e.path[4].children[3].children[removecartitem];
  cartid.id = removecartitem;
  removecartitem++;

  cancelbtn = e.path[2].children[3];
  e.path[2].style.border = "3px solid orange";
  cancelbtn.style.display = "block";
  cancelbtn.addEventListener("click", cancelfun);

  cartprice = Array.from(e.path[2].children[1].children[1].textContent);
  let splicedcartprice = cartprice.splice(0, 3);

  // total += Number(eachitem);
  getamount.textContent = total + " " + "MMk";
};

let cancelfun = function (e) {
  console.log(e.path[3].children[3].children[2].id);
};
