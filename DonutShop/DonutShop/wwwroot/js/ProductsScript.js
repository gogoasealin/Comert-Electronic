function postRequest(data, url) {
    return $.ajax({
        type: "POST",
        url: url,
        //dataType: "text",
        contentType: "application/json",
        data: JSON.stringify(data),

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function getRequest(url) {
    var authorityToken = "";
    return $.ajax({
        type: 'GET',
        url: url
        //headers: {
        //    'Authorization': 'Bearer ' + authorityToken
        //},

    });
}

function deleteRequest(data, url) {
    return $.ajax({
        type: "DELETE",
        url: url,
        dataType: "text",
        contentType: "application/json",
        data: JSON.stringify(data),
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function updateRequest(data, url) {
    return $.ajax({
        type: "PUT",
        url: url,
        dataType: "text",
        contentType: "application/json",
        data: JSON.stringify(data),
        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}


function AddProduct() {
    var data = JSON.stringify($('#addProductForm').serializeArray());
    data = JSON.parse(data);

    url = 'https://localhost:44317/api/Products/AddProduct';
    var result = postRequest(data, url);
    result.done(
        function (response) {
            if (response === "Succes") {
               // document.getElementById('add-product').style.display = "none";
            }
            else {
                alert(response);
            }
        }
    );
}

function RemoveProduct() {
    var data = JSON.stringify($('#removeProductForm').serializeArray());
    data = JSON.parse(data);

    url = 'https://localhost:44317/api/Products/RemoveProduct';
    var result = deleteRequest(data, url);
    result.done(
        function (response) {
            if (response === "Succes") {
                alert("Product deleted");
                //document.getElementById('remove-product').style.display = "none";
            }
            else {
                alert(response);
            }
        }
    );
}

function UpdateProduct() {
    var data = JSON.stringify($('#updateProductForm').serializeArray());
    data = JSON.parse(data);

    url = 'https://localhost:44317/api/Products/UpdateProduct';
    var result = updateRequest(data, url);
    result.done(
        function (response) {
            if (response === "Succes") {
                alert("Product updated");
            }
            else {
                alert(response);
            }
        }
    );
}

function AddToCart(productName, price)
{
    var cartName = document.getElementById("userName").innerText;
    var data = {
        cartName: cartName,
        productName: productName,
        price: price
    };

    data = JSON.stringify(data);
    data = JSON.parse(data);

    url = 'https://localhost:44317/api/ShoppingCart/AddProduct';

    var result = postRequest(data, url);
    result.done(
        function (response) {
            if (response === "Succes") {
                alert("Product added to ShoppingCart");
            }
            else {
                alert(response);
            }
        }
    );
}

function RemoveFromCart(productName)
{
    var cartName = document.getElementById("userName").innerText;
    var data = {
        cartName: cartName ,
        productName: productName
    };

    data = JSON.stringify(data);
    data = JSON.parse(data);

    url = 'https://localhost:44317/api/ShoppingCart/RemoveProduct';

    var result = deleteRequest(data, url);
    result.done(
        function (response) {
            if (response === "Succes") {
                location.reload();
                //alert("Product added to ShoppingCart");
            }
            else {
                alert(response);
            }
        }
    );
}



function GetProducts() {
    url = 'https://localhost:44317/api/Products/GetProducts';
    getRequest(url);
}

function Checkout() {
    var cartName = document.getElementById("userName").innerText;
    var product = $('#addProductForm').serializeArray();
    var data = {
        product: product,
        cartName: cartName
    };
    data = JSON.stringify(data);
    data = JSON.parse(data);

    url = 'https://localhost:44317/api/ShoppingCart/Checkout';

    var result = deleteRequest(data, url);
    result.done(
        function (response) {
            if (response === "Succes") {
                location.reload();
                //alert("Checkout sent");
            }
            else {
                alert(response);
            }
        }
    );
}



$(document).ready(function () {


    url = 'https://localhost:44317/api/Menu/AutoComplete';
    var result = getRequest(url);
    result.done(function (response) {
        autocomplete(document.getElementById("search"), response);
    });


    //$("#search").autocomplete({
    //    source: function (request, response) {
    //        $.ajax({
    //            url: "https://localhost:44317/api/Menu/AutoComplete",
    //            type: "POSt",
    //            dataType: "json",
    //            data: { Prefix: request, term },
    //            succes: function (data) {
    //                response($.map(data, function (item) {
    //                    return { label: item.Title, value: item.Title };
    //                }));
    //            }
    //        });
    //    },
    //    messages: {
    //        noResults: "", results: ""
    //    }
    //});

    //$('.add-cart-button').click(function () {
    //    var name = $(this).closest('.ProductTitle').find('.productName').innerHTML;
    //});

    //$('.updt-quantity').on("change keyup", function () {

    //    var productQuantity = document.getElementById("quantity");
    //    var productName = document.getElementById("productName");

    //    url = 'https://localhost:44317/api/ShoppingCart/UpdateQuantity';

    //    var productToAdd = {
    //        productName: productName,
    //        productQuantity: productQuantity
    //    };
    //    /// pentru cantitate si verificare cantitate maxima din baza de date 

    //    result = postRequest(productToAdd, url);
    //    result.done(function (response) {
    //        if (response == "Success") {
    //            location.reload();
    //        }
    //        else {
    //            alert(response);
    //        }
    //    });
    //}
 });

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}



function Search() {
    var data = $('#search').serializeArray();
    data = JSON.stringify(data);
    data = JSON.parse(data);

    var url = 'https://localhost:44317/api/Menu/Search';

    var result = postRequest(data, url);
    result.done(
        function (response) {
            $('#productContainer').html("");
            var a = response.length;
            for (var i = 0; i < response.length; i++) {
                $('#productContainer').append('<div class="product col-md-4" style="text-align:center"><div class="ProductImage"><img src=' + response[i].productImage + ' /></div><div class="ProductTitle" > <p class="productName">' + response[i].productName + '</p></div > <div class="ProductIngredients"><p>' + response[i].productDescription + '</p></div> <div class="ProductPrice"><p>' + response[i].productPrice + '</p></div><button class="add-cart-button btn btn-warning" onclick="AddToCart(' + response[i].productName + ',' + response[i].productPrice + ')">Add To Cart</button></div > ');
            }
        }
    );

    return false;
}

function UpdateQuantity(productName, newValue) {

    var cartName = document.getElementById("userName").innerText;
    
    var data = {
        cartName: cartName,
        productName: productName,
        currentQuantity: newValue
    };


    data = JSON.stringify(data);
    data = JSON.parse(data);
    var url = 'https://localhost:44317/api/ShoppingCart/UpdateQuantity';

    var result = updateRequest(data, url);
    result.done(
        function (response) {
            if (response === "Succes") {
                location.reload();
                //alert("Checkout sent");
            }
            else {
                alert(response);
            }
        }
    );
}