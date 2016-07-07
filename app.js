//This is how to define a module
var myApp = angular.module("myApp", ["ngRoute", "ngAnimate"]);

//Adding routes for SPA - using routeProvider 
myApp.config(function($routeProvider) {
	// define route for SPA which will be used by links where # is present
	$routeProvider.when("/books", {
		//url to a page
		templateUrl:"partials/book-list.html",
		//controller which will handle it
		controller: "BookListCtrl"
	})
	.when("/cart", {
		templateUrl:"partials/cart-list.html",
		controller: "CartListCtrl"
	})
	// fallback
	.otherwise({
		redirectTo: "/books"
	});
});

// here the location is passed - the location where we are on the site
myApp.controller("HeaderControl", function($scope, $location) {
		$scope.appDetails =  {
			title:"Book Cart",
			tagline:"This is tagline"
		};
		
		$scope.nav = {};
		$scope.nav.isActive = function(path) {
				if (path ===$location.path()) {
					return true;
				}
				return false;
			}
			
		
});

// here the bookService service dependency is injected
myApp.controller("BookListCtrl", function($scope, bookService, cartService) {
	
	
	$scope.books = bookService.getBooks();
	// function defined in a scope of this controller that can be used in the template
	$scope.addToCart = function(book) {
		cartService.addToCart(book);
	}
});

myApp.controller("CartListCtrl", function($scope, cartService) {
	// using injected service to get data
	$scope.cart=cartService.getCart();
	// function defined in a scope of this controller that can be used in the template
	$scope.buy = function(book) {
		// using the injected service to buy a book
		cartService.buy(book);
	}
});

// definition of the service that can be used for DI
myApp.factory("bookService", function() {
	var books = [
		{
			imgUrl: "adultery.jpeg",
			name: "Adultery",
			price: 205,
			rating: 4,
			binding: "Paperback",
			publisher: "Random House India",
			releaseDate: "12-08-2014",
			details: "Linda, in her thirties, begins to question the routine and predictability of her days. In everybodys eyes, she has a perfect life-happy marriage, children and a career. Yet what she feels is an eno... <a href='#'>View More<a>"
		},
		{
			imgUrl: "geronimo.jpeg",
			name: "Geronimo Stilton Spacemice#2 : You're Mine, Captain!",
			price: 168,
			rating: 5,
			binding: "Paperback",
			publisher: "Scholastic",
			releaseDate: "01-07-2014",
			details: "Geronimo Stilton meets outer space in this cosmically fun spin-off series!Meet Geronimo StiltonixHe is a spacemouse - the Geronimo Stilton of a parallel universe! He is captain of the spaceship Mou... View More"
		},
		{
			imgUrl: "life-or-death.jpeg",
			name: "Life or Death",
			price: 339,
			rating: 4,
			binding: "Paperback",
			publisher: "Hachette India",
			releaseDate: "01-04-2014",
			details: "Why would a man escape from prison the day before he's due to be released? Audie Palmer has spent a decade in prison for an armed robbery in which four people died, including two of his gang. Five... View More"
		},
		{
			imgUrl: "playing.jpeg",
			name: "Playing It My Way : My Autobiography",
			price: 599,
			rating: 5,
			binding: "Hardcover",
			publisher: "Hodder & Stoughton",
			releaseDate: "01-08-2014",
			details: "I knew that if I agreed to write my story, I would have to be completely honest, as thats the way I have always played the game and that would mean talking about a number of things I have not addr... View More"
		},
		{
			imgUrl: "the-fault.jpeg",
			name: "The Fault in Our Stars",
			price: 227,
			rating: 4.5,
			binding: "Paperback",
			publisher: "Penguin Books Ltd",
			releaseDate: "25-01-2013",
			details: "Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist n... View More"
		},
		{
			imgUrl: "wings-of-fire.jpeg",
			name: "Wings of Fire: An Autobiography",
			price: 124,
			rating: 5,
			binding: "Paperback",
			publisher: "Universities Press",
			releaseDate: "25-08-2000",
			details: "Wings of Fire traces the life and times of India's former president A.P.J. Abdul Kalam. It gives a glimpse of his childhood as well as his growth as India's Missile Man. Summary of the Book Wings... View More"
		}
	];
	return {
		// definition of "methods"
		getBooks:function() {
			return books;
		}
	}
});

myApp.factory("cartService", function() {
	var cart = [];
	
	return {
		getCart: function() {
			return cart;
		},
		addToCart: function(book) {
			cart.push(book);
		},
		buy: function(book) {
			alert("Thanks for buying!", book.name);
		}
		
	}
});