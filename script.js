const form = document.querySelector("form");
const itemInput = document.getElementById("item-input");
const removeButton = document.querySelector("button.remove");
const ul = document.querySelector("ul");
const clearButton = document.querySelector("button.clr-btn");
const filterContainer = document.querySelector(".filter");
let searchBox = document.getElementById("search-box");
const submitButton = document.getElementById("submit-button");
checkUI();
let isEditMode = false;
function displayFromStorage() {
  let itemFromStorage = getItemFromStorage();
  itemFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}
function addItem(e) {
  e.preventDefault();
  removeItem;
  const itemData = itemInput.value;
  if (itemData === "") {
    alert("Please Enter an Item");
    return;
  }

  if (isEditMode) {
    const itemToBeRemoved = ul.querySelector(".edit-mode");
    removeItem(itemToBeRemoved);
    isEditMode = false;
    submitButton.innerHTML = ` <i class="fa-solid fa-plus"></i> Add Item`;
    submitButton.style.backgroundColor = "#333";
  } else {
    const itemFromStorage = getItemFromStorage();
    for (i of itemFromStorage) {
      if (i.toLowerCase() === itemData.toLowerCase()) {
        alert("The Item is already Present !");
        itemInput.focus();
        return;
      }
    }
  }
  addItemToDOM(itemData);
  addItemToStorage(itemData);
  checkUI();
  itemInput.value = "";
}
function createElement(tag, classes) {
  const elem = document.createElement(tag);
  elem.className = classes;
  return elem;
}
function addItemToDOM(itemData) {
  const li = createElement("li", "item");
  li.appendChild(document.createTextNode(itemData));
  const button = createElement("button", "remove");
  const cross = createElement("i", "fa-solid fa-xmark");
  button.appendChild(cross);
  li.appendChild(button);
  ul.appendChild(li);
}
function addItemToStorage(item) {
  let itemFromStorage = getItemFromStorage();
  itemFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
}

function getItemFromStorage() {
  let itemFromStorage = localStorage.getItem("items");
  if (itemFromStorage === null) itemFromStorage = [];
  else itemFromStorage = JSON.parse(itemFromStorage);
  return itemFromStorage;
}
function onClickItem(e) {
  if (e.target.tagName === "I" || e.target.tagName === "BUTTON") {
    if (confirm("Are you sure,you want to delete?")) {
      removeItem(e.target.parentElement.parentElement);
    }
  } else {
    updateItem(e);
  }
}
function updateItem(e) {
  isEditMode = true;
  const data = e.target.innerText;
  const itemList = ul.querySelectorAll("li");
  itemList.forEach((i) => i.classList.remove("edit-mode"));
  e.target.classList.add("edit-mode");
  submitButton.innerHTML = ` <i class="fa-solid fa-pen"></i> Update Item`;
  submitButton.style.backgroundColor = "#228B22";
  itemInput.focus();

  itemInput.value = data;
}
function removeItem(item) {
  item.remove();
  let itemFromStorage = getItemFromStorage();
  itemFromStorage = itemFromStorage.filter((i) => i !== item.innerText);
  localStorage.setItem("items", JSON.stringify(itemFromStorage));

  checkUI();
}
function removeAll(e) {
  const allItems = document.querySelectorAll("ul li");
  allItems.forEach((item) => item.remove());
  checkUI();
  localStorage.removeItem("items");
}

function checkUI() {
  const flag = ul.querySelectorAll("li");
  if (flag.length === 0) {
    searchBox.value = "";
    filterContainer.style.display = "none";
  } else {
    filterContainer.style.display = "block";
  }
}

function search(e) {
  const allItems = ul.querySelectorAll("li");
  console.log("search success", allItems);
  allItems.forEach((item) => {
    const search = e.target.value.toLowerCase();
    const liData = item.innerText.toLowerCase();
    console.log(item, search, liData);
    if (!liData.includes(search)) {
      console.log("doesnt contain");
      item.style.display = "none";
    } else {
      console.log("it contains");
      item.style.display = "flex";
    }
  });
}

form.addEventListener("submit", addItem);
ul.addEventListener("click", onClickItem);
clearButton.addEventListener("click", removeAll);
searchBox.addEventListener("input", search);
document.addEventListener("DOMContentLoaded", displayFromStorage);
