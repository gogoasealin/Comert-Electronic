function ClickHandler() {
    var doAsyncGet = function (partialUrl) {
        var authorityToken = "";
        var fullUrl = 'http://localhost:50209' + partialUrl;
        return $.ajax({
            url: fullUrl,
            headers: {
                "Authority": authorityToken
            },
            dataType: "json"
        });
    };

    this.getAllProducts = function () {
        var allGamesReq = "/api/products/GetProducts/";
        console.log(allGamesReq);
        return doAsyncGet(allGamesReq);
    };

    ClickHandler.instance = this;
}

// When the user scrolls the page, execute myFunction 
window.onscroll = function () { myFunction()};

// Get the header
var header = document.getElementById("myHeader");

// Get the offset position of the navbar
//var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}