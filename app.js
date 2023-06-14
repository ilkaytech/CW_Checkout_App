const taxRate = 0.18;
const shippingPrice = 25;
const shippingFreePrice = 3000;

window.addEventListener("load", () => {
  localStorage.setItem("taxRate", taxRate);
  localStorage.setItem("shippingPrice", shippingPrice);
  localStorage.setItem("shippingFreePrice", shippingFreePrice);

  //show chart totals on window load!
  calculateCartPrice();
});

const productsDiv = document.querySelector("#product-painel");
const deleteProducts = document.querySelector(".nav__list");

deleteProducts.addEventListener("click", (e) => {
  if (
    e.target.getAttribute("class") == "nav__list--btn" ||
    e.target.getAttribute("class") == "fa-regular fa-trash-can"
  ) {
    productsDiv.innerHTML = "<p>No products!</p>";
    calculateCartPrice();
    console.log(e.target.parentElement);
    deleteProducts.innerText = "My Cart";
  }
});
//Capturing ==> Static closest Parent ------> Children
productsDiv.addEventListener("click", (e) => {
  //e.target vs. e.currentTarget
  // alert(e.target.tagName);
  // alert(e.currentTarget.className);
  console.log(e.target);
  if (e.target.className === "fa-solid fa-minus") {
    // alert("minus btn clicked");
    if (e.target.nextElementSibling.innerText > 1) {
      e.target.nextElementSibling.innerText--;
      calculateProductPrice(e.target);
    } else {
      //innerText vs. textContent(whitespaces)
      if (
        confirm(
          `${
            e.target.closest(".product-info").querySelector("h2").innerText
          } will be removed!`
        )
      ) {
        e.target.closest(".product").remove();
      }
    }
    calculateCartPrice();
  } else if (e.target.classList.contains("fa-plus")) {
    // alert("plus btn clicked");
    e.target.parentElement.querySelector("#quantity").innerText++;
    calculateProductPrice(e.target);
    calculateCartPrice();
  } else if (e.target.getAttribute("id") == "remove-product") {
    console.log(e.target.getAttribute("id"));
    // alert("remove btn clicked");
    if (
      confirm(
        `${
          e.target.closest(".main__product-info").querySelector("h2").innerText
        } will be removed!`
      )
    ) {
      e.target.closest(".main__product").remove();
    }
    calculateCartPrice();
  } else {
    alert("other element clicked");
  }
  console.log(e.target.getAttribute("id"));
});

const calculateProductPrice = (target) => {
  //each product total calculation
  //productTotalPrice => quantity * price
  const productInfoDiv = target.closest(".main__product-info");
  console.log(productInfoDiv);
  //unit price
  //div.class vs. .class as performance
  const price = productInfoDiv.querySelector(
    "div.main__product-price strong"
  ).innerText;
  //quantity
  const quantity = productInfoDiv.querySelector("p#quantity").innerText;
  productInfoDiv.querySelector(".main__product-line-price").innerText = (
    price * quantity
  ).toFixed(2);
};

const calculateCartPrice = () => {
  //cart total calculation from all products
  //NodeList
  const productLinePriceDivs = document.querySelectorAll(
    ".main__product-line-price"
  );

  //reduce vs. foreach !!!!! homework!!
  let subtotal = 0;
  //forEach => array + nodeList
  productLinePriceDivs.forEach((div) => {
    subtotal += parseFloat(div.innerText);
  });
  console.log(subtotal);

  const taxPrice = subtotal * localStorage.getItem("taxRate");
  console.log(taxPrice);

  const shippingPrice = parseFloat(
    subtotal > 0 && subtotal < localStorage.getItem("shippingFreePrice")
      ? localStorage.getItem("shippingPrice")
      : 0
  );
  console.log(shippingPrice);

  const totalPrice = subtotal + taxPrice + shippingPrice;
  console.log(totalPrice);

  document.querySelector(".main__sum-price").innerText = subtotal.toFixed(2);

  document.getElementById("cart-tax").children[1].innerText =
    taxPrice.toFixed(2);

  document.querySelector("#cart-shipping span:nth-child(2)").innerText =
    shippingPrice.toFixed(2);

  document.querySelector("#cart-total span:last-child").innerText =
    totalPrice.toFixed(2);
};
