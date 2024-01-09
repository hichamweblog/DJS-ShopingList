const formEl = document.querySelector('#item-form');
const itemInputEl = document.querySelector('#item-input');
const submitBtnEl = document.querySelector('#btn');
const filterEl = document.querySelector('#filter');
const itemListEl = document.querySelector('#item-list');
const clearBtnEl = document.querySelector('#clear');

// Add items to the list
function handleInput(e) {
	e.preventDefault();
	const itemValue = itemInputEl.value.trim();

	if (itemValue) {
		itemListEl.appendChild(createItem(itemValue));
		checkUI();
	}

	addToStorage(itemValue);
	itemInputEl.value = '';
}

function createItem(value) {
	const itemEl = document.createElement('li');
	itemEl.textContent = value;

	const removeItemBtnEl = document.createElement('button');
	removeItemBtnEl.classList.add('remove-item', 'btn-link', 'text-red');
	removeItemBtnEl.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

	itemEl.appendChild(removeItemBtnEl);

	return itemEl;
}

// Remove and clear items
function handleItemClick(e) {
	if (e.target.parentElement.classList.contains('remove-item')) {
		const listItem = e.target.closest('li');
		listItem.remove();
		removeItemFromStorage(listItem.firstChild.textContent);
		checkUI();
	}
}

function removeItemFromStorage(itemToRemove) {
	let localItems = JSON.parse(localStorage.getItem('items')) || [];
	const updatedItems = localItems.filter((item) => item !== itemToRemove);
	localStorage.setItem('items', JSON.stringify(updatedItems));
}

function clearAll() {
	while (itemListEl.firstChild) {
		itemListEl.removeChild(itemListEl.firstChild);
	}
	localStorage.clear();
	checkUI();
}

function checkUI() {
	const items = itemListEl.querySelectorAll('li');

	if (items.length === 0 && localStorage.getItem('items') === null) {
		clearBtnEl.style.display = 'none';
		filterEl.style.display = 'none';
	} else {
		clearBtnEl.style.display = 'block';
		filterEl.style.display = 'block';
	}
}

// Filter items
function filter(e) {
	const text = e.target.value.toLocaleLowerCase();
	const items = itemListEl.querySelectorAll('li');

	items.forEach((item) => {
		const itemName = item.firstChild.textContent.toLocaleLowerCase();
		item.style.display = itemName.includes(text) ? 'flex' : 'none';
	});
}

// Add items to local storage
function addToStorage(item) {
	let itemsFromStorage = JSON.parse(localStorage.getItem('items')) || [];
	itemsFromStorage.push(item);
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Initialize items from storage
function initializeItemsFromStorage() {
	let localItems = JSON.parse(localStorage.getItem('items')) || [];
	localItems.forEach((item) => {
		itemListEl.appendChild(createItem(item));
	});
}

// Initialize UI on page load
function initializeUI() {
	formEl.addEventListener('submit', handleInput);
	itemListEl.addEventListener('click', handleItemClick);
	clearBtnEl.addEventListener('click', clearAll);
	filterEl.addEventListener('input', filter);
	initializeItemsFromStorage();
	checkUI();
}

initializeUI();
