import products from "./db 2.js";

var table = document.getElementById("ProductTable")
var tableBody = table.getElementsByTagName('tbody')[0]
var priceAsc = false
var categoryAsc = false
var nameAsc = false
var currentTable = products
var currentPage = 0
var searchPriceDif = 0
var searchCategory = ""

export function clearSearch() {
	currentTable = products
	layoutTable()
	document.getElementById("idInput").value = ""
	document.getElementById("priceDifference").value = ""
	ItemInfoDisplay.innerHTML = ""
}

export function searchItems() {
	var productCount = document.getElementById("productCount").value
	var searchId = document.getElementById("idInput").value
	var returnArray = []
	var absArray = []

	for (var i = 0; i < products.length; i++) {
		if ((products[i]["category"] == searchCategory)) {
			if (searchId != products[i]["id"]) {
				returnArray.push(products[i])
			}
		}
	}

	for (var i = 0; i < returnArray.length; i++) {
		var id = returnArray[i]["id"]
		var price = returnArray[i]["price"]
		var category = returnArray[i]["category"]
		var name = returnArray[i]["name"]
		var absPrice = Math.abs(searchPriceDif - parseInt(price))
		absArray.push({"id": id, "absPrice": absPrice, "price": price, "name": name, "category": category})
	}

	var sortedArray = absArray.sort(function(a, b) {return a.absPrice - b.absPrice})

	tableBody.innerHTML = ""

	console.log(productCount)
	console.log(sortedArray)

	for (var i = 0; i < productCount; i++) {
		var row = tableBody.insertRow(i)
                var cell1 = row.insertCell(0)
                var cell2 = row.insertCell(1)
                var cell3 = row.insertCell(2)    
                        
                cell1.innerHTML = sortedArray[i]["name"]
                cell2.innerHTML = sortedArray[i]["category"]
                cell3.innerHTML = sortedArray[i]["price"]
	}

}

export function displayItemInfo() {
	console.log("ARHO")
	var ItemInfoDisplay = document.getElementById("IdReturnInfo")
	var searchId = document.getElementById("idInput").value
	var Name = ""
	var Price = ""
	for (var i = 0; i < products.length; i++) {
		if (searchId == products[i]["id"]) {
			console.log("SUCCESS!")
			Name = products[i]["name"]
			Price = products[i]["price"]
			console.log(Name + ": " + Price)
			ItemInfoDisplay.innerHTML = Name + ": " + Price	
			searchPriceDif = parseInt(Price)
			searchCategory = products[i]["category"]
		}
	}
}

export function addItem() {
	var nameIn = document.getElementById("nameInput").value
	var categoryIn = document.getElementById("categoryInput").value
	var priceIn = document.getElementById("priceInput").value
	
	var newItem = {
		id: 'hArHeEHOo-123456789',
		name: nameIn,
		category: categoryIn,
		price: priceIn
	};
	products.push(newItem)
	layoutTable()
}	
  
export function layoutTable() {
	tableBody.innerHTML = ""
        for (var i = 0; i < 24; i++) {
		if ((i * currentPage) < currentTable.length) {
			var row = tableBody.insertRow(i)
                	var cell1 = row.insertCell(0)
                	var cell2 = row.insertCell(1)
                	var cell3 = row.insertCell(2)
                
                	cell1.innerHTML = currentTable[i + (currentPage * 24)]["name"]
	                cell2.innerHTML = currentTable[i + (currentPage * 24)]["category"]
        	        cell3.innerHTML = currentTable[i + (currentPage * 24)]["price"]
		}
        }
}

export function paging(n) {
	if (n == 1) {
		if ((24 + (currentPage * 24)) < currentTable.length) {
			currentPage = currentPage + 1
	                layoutTable()
		}
	} else {
		if (currentPage >= 0) {
			currentPage = currentPage - 1
			layoutTable()
		}
	}
}



export function sortTable(n) {
        if (n == 3) {
                priceAsc = !priceAsc
                if (priceAsc == true) {
                        var productsa = currentTable.sort(function(a, b) {return a.price - b.price})
			currentTable = productsa
			currentPage = 0
			layoutTable()
                } else {
			var productsa = currentTable.sort(function(a, b) {return b.price - a.price})
			currentTable = productsa
			currentPage = 0
			layoutTable()
		}
        }

	if (n == 2) {
		categoryAsc = !categoryAsc
		if (categoryAsc == true) {
			var productsb = currentTable.sort((a, b) => a.category.localeCompare(b.category))
			currentTable = productsb
			currentPage = 0
			layoutTable()
		} else {
			var productsb = currentTable.sort((a, b) => b.category.localeCompare(a.category)) 
			currentTable = productsb
			currentPage = 0
			layoutTable()
		}
	}
	if (n == 1) {
		nameAsc = !nameAsc
		if (nameAsc == true) {
                        var productsc = currentTable.sort((a, b) => a.name.localeCompare(b.name))
			currentTable = productsc
			currentPage = 0
			layoutTable()
                } else {
                        var productsc = currentTable.sort((a, b) => b.name.localeCompare(a.name))
			currentTable = productsc
			currentPage = 0
			layoutTable()
                }
	
	}

console.log(products)

}
                



export function greet() {
console.log(products)
console.log("AHORT")
}
