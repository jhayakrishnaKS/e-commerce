// initial products
let products = [
  {
    id: 1,
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 790.5,
    thumbnail:
      "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp",
    description: "GoPro HERO6 4K Action Camera - Black",
  },
  {
    id: 2,
    name: "Canon camera 20x zoom, Black color EOS 2000",
    price: 320.0,
    description: "Canon camera 20x zoom, Black color EOS 2000",
    thumbnail:
      "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/2.webp",
  },
  {
    id: 3,
    name: " Xiaomi Redmi 8 Original Global Version 4GB",
    price: 120.0,
    description: " Xiaomi Redmi 8 Original Global Version 4GB",
    thumbnail:
      "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/3.webp",
  },
  {
    id: 4,
    name: "Apple iPhone 12 Pro 6.1 RAM 6GB 512GB Unlocked",
    price: 900,
    description: "Apple iPhone 12 Pro 6.1 RAM 6GB 512GB Unlocked",
    thumbnail:
      "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/4.webp",
  },
  {
    id: 5,
    name: "Apple Watch Series 1 Sport Case 38mm Black",
    price: 790.0,
    description: "Apple Watch Series 1 Sport Case 38mm Black",
    thumbnail:
      "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp",
  },
  {
    id: 6,
    name: "samsung active 4 black",
    price: 120.0,
    description: "samsung active 4 black",
    thumbnail:
      "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/6.webp",
  },
  {
    id: 7,
    name: " Gaming Headset 32db Blackbuilt in mic",
    price: 99.5,
    description: "Gaming Headset 32db Blackbuilt in mic",
    thumbnail:
      "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp",
  },
  {
    id: 8,
    name: " blue awesome bag for women",
    price: 99.5,
    description: "blue awesome bag for women",
    thumbnail:
      "https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/8.webp",
  },
];
// localStorage.setItem("initialproducts", JSON.stringify(products));

// New users
let users = [
  {
    id: 1,
    email: "admin@gmail.com",
    password: "admin",
  },
  {
    id: 2,
    email: "krish@gmail.com",
    password: "krish",
  },
  {
    id: 3,
    email: "jkay@gmail.com",
    password: "jkay",
  },
];
// localStorage.setItem("newUsers", JSON.stringify(users));
// adding the load fuction for products and users.
window.addEventListener("load", () => {
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
  }
  if (location.pathname === "/index.html") {
    loadcustomerprod();
  }
  if (location.pathname === "/Aindex.html") {
    loadAdminProd();
  }
  if (
    location.pathname === "/index.html" ||
    location.pathname === "/orders.html" ||
    location.pathname === "/addtocart.html"
  ) {
    updateCartCount();
  }
  if (location.pathname === "/addtoCart.html") {
    loadCartPage();
  }
});

// creating random num
const randomNum = (max = 1000) => {
  return Math.floor(Math.random() * max);
};

// Creating a new user ID
const getRandomId = () => {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  for (let i = 0; i < 10000; i++) {
    const randomId = randomNum();
    const checkingId = users.find((user) => user.id === randomId);
    if (!checkingId) {
      return randomId;
    }
  }
};
// login validation*
//
const validateLogin = () => {
  const email = document.getElementById("typeEmailX").value;
  const password = document.getElementById("typePasswordX").value;
  const error = document.getElementById("error");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.length > 0 && password.length > 0) {
    if (!emailRegex.test(email)) {
      error.innerText = "Invalid Email Format";
    } else {
      let usersFromStorage = JSON.parse(localStorage.getItem("users"));
      const loggedUser = usersFromStorage.find(
        (user) =>
          user.email.toLowerCase() === email && user.password === password
      );

      if (!loggedUser) {
        error.innerText = "Invalid Credentials";
      } else {
        sessionStorage.setItem("userId", loggedUser.id);
        if (email === "admin@gmail.com")
          location.replace("/Aindex.html");
        else location.replace("/index.html");
      }
    }
  } else {
    error.innerText = "Both Email and Password are required";
  }
};

// sign up validation

const validateSignIn = () => {
  const Uname = document.getElementById("name").value;
  const Umail = document.getElementById("YourEmail").value;
  const passwd = document.getElementById("Password").value;
  const Rpassword = document.getElementById("repeatPassword").value;
  const error = document.getElementById("error");

  if (Uname > 0 && Umail > 0 && passwd > 0 && Rpassword > 0) {
    if (passwd !== Rpassword) {
      error.innerText = "Both passwords must be the same!";
    } else {
      let users = JSON.parse(localStorage.getItem("users"));
      users.push({
        id: getRandomId(),
        name: Uname,
        email: Umail,
        password: passwd,
      });
      localStorage.setItem("users", JSON.stringify(users));
      location.href = "/login.html";
    }
  } else {
    error.innerText = "All fields are required!";
  }
};
// user signout
const userSignOut = () => {
  location.replace("/login.html");
};

// saving and updating products
const loadcustomerprod = () => {
  const productRef = document.getElementById("row");
  const products = JSON.parse(localStorage.getItem("products"));

  let page = "";
  for (let product of products) {
    page += `
      <div class="col-lg-3 col-md-6 col-sm-6 mb-4">
        <div class="card w-100 my-2 shadow-2-strong">
          <img src="${product.thumbnail}" class="card-img-top" style="aspect-ratio: 1 / 1" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">$${product.price}</p>
          </div>
          <div class="card-footer d-flex justify-content-center pt-3 px-0 pb-0 mt-auto">
            <a href="#!" class="btn btn-dark shadow-0 me-1" onclick="addTocartHand(${product.id})">Add to cart</a>
          </div>
        </div>
      </div>`;
  }
  productRef.innerHTML = `<div class="row">${page}</div>`;
};
// const addTocartHand=(productId)=>{
//   console.log(productId)
// }
// loading products to the admin page
const loadAdminProd = () => {
  const productRef = document.getElementById("productsTableBody");
  const products = JSON.parse(localStorage.getItem("products"));

  let Apage = "";
  for (let product of products) {
    console.log(product);
    Apage += `<tr>
    <td><img src="${product.thumbnail}" alt="" class="img-fluid img-thumbnail" style="width:100px;height:"50px;" <td>
    <td>${product.name}</td>
    <td>${product.description}</td>
    <td>$ ${product.price}</td>
    <td class="d-flex justify-content-center">
      <button class="btn btn-dark me-2" onClick="editProductHandler(${product.id})">Edit</button>
      <button class="btn btn-danger" onClick="deleteProductHandler(${product.id})">Delete</button>
    </td>
    </tr>`;
  }
  productRef.innerHTML = Apage;
};

// deleting products in admin page

const deleteProductHandler = (id) => {
  const products = JSON.parse(localStorage.getItem("products"));
  const filteredProducts = products.filter((product) => product.id !== id);
  localStorage.setItem("products", JSON.stringify(filteredProducts));
  loadAdminProd();
};
// editing products in admin page
// const editProductHandler=(id)=>{
//   location.href=`/userpage/admin/AddingProd.html id=${id}`;
// }

// adding products
const AddingProd=(product)=>{
  const nameRef=document.getElementById("productName");
  const priceRef=document.getElementById("productPrice");
  const descripRef=document.getElementById("productDescription");
  const imgRef=document.getElementById("productImage");
  const buttonRef=document.getElementById

}

// add to cart in home page
const addTocartHand = (id) => {
  let products = JSON.parse(localStorage.getItem("products"));
  const product = products.find((product) => product.id === parseInt(id));
  if (!sessionStorage.getItem("userId")) {
    location.href = "/login.html";
  } else {
    let userId = parseInt(sessionStorage.getItem("userId"));
    // Initialize an empty array for the cart or retrieve existing cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartProductIndex = cart.findIndex(
      (c) => c.userId === userId && c.id === parseInt(id)
    );
    if (cartProductIndex !== -1) {
      cart[cartProductIndex].count += 1;
    } else {
      cart.push({ userId: userId, count: 1, ...product });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }
};

// updating cart
const updateCartCount = () => {
  const cartCountRef = document.getElementById("cartCount");
  if (sessionStorage.getItem("userId")) {
    const userId = parseInt(sessionStorage.getItem("userId"));
    let cartCount = 0;
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      cartCount = cart.reduce((acc, curr) => {
        if (curr.userId === userId) {
          acc += curr.count;
        }
        return acc;
      }, 0);
    }
    cartCountRef.innerText = `Your Cart - ${cartCount > 0 ? cartCount : ""}`;
  } else {
    location.href = "/login.html";
  }
};

// loadCartPage
const loadCartPage = () => {
  const cartTableRef = document.getElementById("cartTableBody");
  const totalRef = document.getElementById("total");
  const tableRef = document.getElementById("table");
  if (localStorage.getItem("cart")) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    if (sessionStorage.getItem("userId")) {
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userCart = cart.filter((c) => c.userId === userId);
      console.log(userCart);
      let body = "";
      let total = 0;
    
      for (let cartItem of userCart) {
        total = total + parseInt(cartItem.count) * parseInt(cartItem.price);
        const count = cartItem.count * cartItem.price;
        body += `<tr>
            <td>${cartItem.name}</td>
            <td>${cartItem.count}</td>
            <td>${cartItem.price}</td>
            <td>$ ${count}</td>
          </tr>`;
        console.log(total);
      }
      const cartTableRef = document.getElementById("yourCartTableId");
      const totalRef = document.getElementById("yourTotalId"); 
    
      cartTableRef.innerHTML = body;
      totalRef.innerHTML = `Total - $${total}`;
      console.log(totalRef);
    }
    
    else {
      location.href = "/login.html";
    }
  }
};