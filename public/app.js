$(document).ready( () => {

	$.getJSON("/api/wine")
	.then(addWines)
	.catch(handleError);

	$("#wineInput").keypress( (event) => {
		if(event.which == 13){
			createWine();
		}
	});

	$(".list").on("click", "span", function(event) {
		event.stopPropagation();
		var wineToRemove = $(this).parent();
		removeWine(wineToRemove);
	});

	$(".list").on("click", "li", function(event) {
		updateWine($(this));
	});
});

var addWines = (wines) => {
	// add wines to page here
	wines.forEach( (wine) => {
		addWine(wine);
	});
};

var addWine = (wine) => {
	// setup the element to be added to the page
	var newWine = $(`<li class='wine'>${wine.name}<span>X</span></li>`);

	// add values to data to use with the api
	// these values are attached to the jquery selectors
	newWine.data("id", wine._id);
	newWine.data("completed", wine.completed);

	// apply a class "done" to style the finished wines
	if( wine.completed ){
		newWine.addClass("done");
	}

	// add the wine listing to the page here
	$(".list").append(newWine);
};

var createWine = (wine) => {

	// get the wine input from user
	var userInput = $("#wineInput").val();
	var wineObj = {
		name: userInput
	};
	var createURL = "/api/wine"

	// send the request to make new wine
	$.post(createURL, wineObj)
	.then( (newWine) => {
		addWine(newWine);
		$("#wineInput").val("");
	})
	.catch(handleError);
};

var removeWine = (wine) => {

	var deleteURL = "/api/wine/" + wine.data("id");
	$.ajax({
		method: "DELETE",
		url: deleteURL
	})
	.then( () => {
		// remove wine from view
		wine.remove();
	})
	.catch(handleError);
};

var updateWine = (wine) => {
	var putURL = "/api/wine/" + wine.data("id");
	var isFinished = !wine.data("completed");
	var updateData = {completed: isFinished};
	$.ajax({
		method: "PUT",
		url: putURL,
		data: updateData
	})
	.then( (updatedWine) => {
		wine.toggleClass("done");
		wine.data("completed", isFinished);
	})
	.catch(handleError);
};

var handleError = (err) => {
	console.log(err);
}