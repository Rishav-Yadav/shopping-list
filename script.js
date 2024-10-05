const form = document.querySelector("form");
const itemInput = document.getElementById("item-input");
const removeButton = document.querySelector("button.remove");
const ul = document.querySelector("ul");
const clearButton = document.querySelector("button.clr-btn");

const filterContainer = document.querySelector(".filter");
checkUI();
function addItem(e) {
  e.preventDefault();
  const itemData = itemInput.value;
  if (itemData === "") {
    alert("Please Enter an Item");
    return;
  }
  const li = createElement("li", "item");
  li.appendChild(document.createTextNode(itemData));
  const button = createElement("button", "remove");
  const cross = createElement("i", "fa-solid fa-xmark");
  button.appendChild(cross);
  li.appendChild(button);
  ul.appendChild(li);
  checkUI();
  itemInput.value = "";
}
function createElement(tag, classes) {
  const elem = document.createElement(tag);
  elem.className = classes;
  return elem;
}
function removeItem(e) {
  if (e.target.tagName === "I" || e.target.tagName === "BUTTON") {
    if (confirm("Are you sure,you want to delete?")) {
      const itemToBeRemoved = e.target.parentElement.parentElement;
      itemToBeRemoved.remove();
    }
  }
  checkUI();
}
function removeAll(e) {
  const allItems = document.querySelectorAll("ul li");
  allItems.forEach((item) => item.remove());
  checkUI();
}
function checkUI() {
  const flag = ul.querySelectorAll("li");
  if (flag.length === 0) {
    filterContainer.style.display = "none";
  } else {
    filterContainer.style.display = "block";
  }
}
form.addEventListener("submit", addItem);
ul.addEventListener("click", removeItem);
clearButton.addEventListener("click", removeAll);
