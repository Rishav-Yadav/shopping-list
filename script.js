const form = document.querySelector("form");
const itemInput = document.getElementById("item-input");
const removeButton = document.querySelector("button.remove");
const ul = document.querySelector("ul");
const clearButton = document.querySelector("button.clr-btn");

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
  itemInput.value = "";
}
function createElement(tag, classes) {
  const elem = document.createElement(tag);
  elem.className = classes;
  return elem;
}
function removeItem(e) {
  if (e.target.tagName === "I" || e.target.tagName === "BUTTON") {
    const itemToBeRemoved = e.target.parentElement.parentElement;
    itemToBeRemoved.remove();
  }
}
function removeAll(e) {
  const allItems = document.querySelectorAll("ul li");
  allItems.forEach((item) => item.remove());
}
form.addEventListener("submit", addItem);
ul.addEventListener("click", removeItem);
clearButton.addEventListener("click", removeAll);
