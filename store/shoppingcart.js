let productsInCart = JSON.parse(localStorage.getItem('shoppingCart'));
if(!productsInCart){
	productsInCart = [];
}

// Hieronder worden variableen gemaakt voor de producten die je kan kopen en de prijs.
const parentElement = document.querySelector('#buyItems');
const cartSumPrice = document.querySelector('#sum-prices');
const products = document.querySelectorAll('.product-under');

// Hieronder heb je een functie waarbij de prijs word berekend. Het begin aantal is 0 en elk item heeft een prijs die word opgeteld bij die 0 wanneer het item in het winkelwagen komt.

const countTheSumPrice = function () { // 4
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.price;
	});
	return sum;
}

// In deze functie word in de localstorage gecontroleerd of er een item in de winkelwagen zit, zo ja dan laat hij het product met de prijs en beschrijving zien.
// Zo nee dan staat er in de winkelwagen "Je winkelwagen is leeg"

const updateShoppingCartHTML = function () {  // 3
	localStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
		let result = productsInCart.map(product => {
			return `
				<li class="buyItem">
					<img src="${product.image}">
					<div>
						<h5>${product.name}</h5>
						<h6>$${product.price}</h6>
						<div>
							<button class="button-minus" data-id=${product.id}>-</button>
							<span class="countOfProduct">${product.count}</span>
							<button class="button-plus" data-id=${product.id}>+</button>
						</div>
					</div>
				</li>`
		});
		parentElement.innerHTML = result.join('');
		document.querySelector('.checkout').classList.remove('hidden');
		cartSumPrice.innerHTML = '€' + countTheSumPrice();

	}

	// Wanneer er geen items in de winkelwagen zitten komt er te staan "Je winkelwagen is leeg". De prijs word dan ook onzichtbaar.

	else {
		document.querySelector('.checkout').classList.add('hidden');
		parentElement.innerHTML = '<h4 class="empty">Je winkelwagen is leeg</h4>';
		cartSumPrice.innerHTML = '';
	}
}

// Deze functie kijkt naar of een product met dezelfde ID al in de winkelwagen zit, als dat is dan word het aantal aangepast in de HTML code.

function updateProductsInCart(product) { // 2
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
			return;
		}
	}
	productsInCart.push(product);
}

// Voor elk item word hier in de winkelwagen toegevoegd. Hiervoor word verschillende informatie opgevraagd zoals de naam en de prijs.

products.forEach(item => {   // 1
	item.addEventListener('click', (e) => {
		if (e.target.classList.contains('addToCart')) {
			const productID = e.target.dataset.productId;
			const productName = item.querySelector('.productName').innerHTML;
			const productPrice = item.querySelector('.priceValue').innerHTML;
			const productImage = item.querySelector('img').src;
			let product = {
				name: productName,
				image: productImage,
				id: productID,
				count: 1,
				price: +productPrice,
				basePrice: +productPrice,
			}
			updateProductsInCart(product);
			updateShoppingCartHTML();
		}
	});
});

// Met deze functie kun je meer of minder items in de winkelwagen toevoegen door de plus of min knop

parentElement.addEventListener('click', (e) => { // Last
	const isPlusButton = e.target.classList.contains('button-plus');
	const isMinusButton = e.target.classList.contains('button-minus');
	if (isPlusButton || isMinusButton) {
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1
				}
				else if (isMinusButton) {
					productsInCart[i].count -= 1
				}

				// Hier word de prijs berekend door het aantal 

				productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

			}

			// Als je minder dan 1 item hebt dan word de winkelwagen leeggemaakt

			if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
		updateShoppingCartHTML();
	}
});

updateShoppingCartHTML();