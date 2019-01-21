// Initial array of animals
var topics = ["DOG", "CAT", "PARROT", "RABBIT"];
var favAnimalArray = [];
var fav = 0;

// Function for dumping the JSON content for each button into the div
function displayanimalGifi() {

    // Here we construct our URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr('data-name') + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            //take the image url from response

            var imageStill = results[i].images.original_still.url;
            var imageAnimate = results[i].images.fixed_height.url;
            var title = results[i].title;

            //rating
            var rating = $('<span>').text('Rating: ' + results[i].rating);
            $('.info').append(rating);

            //anchor tag to download gifi
            var anchorElem = $('<a>');
            anchorElem.attr('href', imageStill);
            anchorElem.attr('download', title);
            anchorElem.attr('media',"min-width: 320px");
            anchorElem.html('<img src="' + imageStill + '" class="gif styleimage display"><i class="fa fa-arrow-down" aria-hidden="true">');
            rating.append(anchorElem);

            //create an image tag in html
            var imageTag = $("<img>");
            //set attributes to image tag
            imageTag.attr("src", imageStill);
            imageTag.attr("data-still", imageStill);
            imageTag.attr("data-animate", imageAnimate);
            imageTag.attr("data-state", 'still');
            imageTag.attr("alt", "aniaml image");
            imageTag.addClass("gif styleimage");
            rating.append(imageTag);

            //to add favourite list
            var favElement = $('<span>');
            favElement.addClass('favourite');
            favElement.attr('data-still', imageStill);
            favElement.attr('data-animate', imageAnimate);
            favElement.attr('data-rating', results[i].rating);
            favElement.attr('id', results[i].id);
            favElement.html('<i class="fa fa-heart" aria-hidden="true"></i>');
            rating.append(favElement);

            $('.info').prepend(rating);

        }
    });
}
// Function to pause and animate the images
function changeState() {

    var state = $(this).attr('data-state');
    if (state === 'still') {

        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', "animate");

    }
    else {

        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', "still");
    }
}
//Function to add image to Favourite list
function addToFavList() {

    var stillUrl = $(this).attr('data-still');
    var animateUrl = $(this).attr('data-animate');
    var rating = $(this).attr('data-rating');
    var id = $(this).attr('id');

    //create an object for favourite image
    var favgif = {
        id: id,
        src: stillUrl,
        animateUrl: animateUrl,
        rating: rating
       
    };
 
    if(favAnimalArray.indexOf(id) === -1){

    favAnimalArray.push(favgif);
    $("#" + id).addClass("fav");
    //alert("Added to the Favourite List!!");

    }
    else
    alert('Image already added to the favourite list'); 

}
//Function to display favourite Gifis
function displayFavouriteGifi() {

    $('.info').empty();

    for (var i = 0; i < favAnimalArray.length; i++) {
        //take the image url from response

        var imageStill = favAnimalArray[i].src;
        var imageAnimate = favAnimalArray[i].animateUrl;

        //rating
        var rating = $('<span>').text('Rating: ' + favAnimalArray[i].rating);
        $('.info').append(rating);

        //anchor tag to download gifi
        var anchorElem = $('<a>');
        anchorElem.attr('href', imageStill);
        anchorElem.attr('download', 'file');
        anchorElem.html('<img src="' + imageStill + '" class="gif styleimage display"><i class="fa fa-arrow-down" aria-hidden="true">');
        rating.append(anchorElem);

        //create an image tag in html
        var imageTag = $("<img>");
        //set attributes to image tag
        imageTag.attr("src", imageStill);
        imageTag.attr("data-still", imageStill);
        imageTag.attr("data-animate", imageAnimate);
        imageTag.attr("data-state", 'still');
        imageTag.attr("alt", "aniaml image");
        imageTag.addClass("gif styleimage");
        rating.append(imageTag);
    }
    $('.info').prepend(rating);

}

// Function for displaying Animal named button
function renderButtons() {

    // Deleting the buttons prior to adding new animal name               
    $("#buttons-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each aniaml in the array
        var a = $("<button>");
        // Adding a class to our button
        a.addClass("animal btn btn-warning");
        // Adding a data-attribute
        a.attr("data-name", topics[i]).attr('type', 'button');
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-animal").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox and clear the box
    var newAnimal = $("#animal-input").val().trim().toUpperCase();
    $("#animal-input").val('');

    //if not already added to the array and not a blank space
    if (topics.indexOf(newAnimal) === -1 && newAnimal !== '') {

        // To add new animal into the animal array
        topics.push(newAnimal);
    }
    else if (newAnimal === '') {

        alert('Blank space');
    }
    else {
        alert(newAnimal + " Already added to the list");
    }

    // Calling renderButtons which handles the processing of our animal array
    renderButtons();

});

// Generic function for displaying the animalGifi
$(document).on("click", ".animal", displayanimalGifi);
$(document).on("click", ".gif", changeState);
$(document).on("click", ".favourite", addToFavList);
$(document).on("click", "#fav-buttons-view", displayFavouriteGifi);

// Calling the renderButtons function to display the intial buttons
renderButtons();