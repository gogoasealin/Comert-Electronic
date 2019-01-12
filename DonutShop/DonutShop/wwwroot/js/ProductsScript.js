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

    url = 'https://localhost:44398/api/Products/AddProduct';
    var result = postRequest(data, url);
    result.done(
        function (response) {
            if (response === "Success") {
                document.getElementById('add-product').style.display = "none";
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

    url = 'https://localhost:44398/api/Products/RemoveProduct';
    var result = deleteRequest(data, url);
    result.done(
        function (response) {
            if (response === "Success") {
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

    url = 'https://localhost:44398/api/Products/UpdateProduct';
    var result = updateRequest(data, url);
    result.done(
        function (response) {
            if (response === "Success") {
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

    url = 'https://localhost:44398/api/ShoppingCart/AddProduct';

    var result = postRequest(data, url);
    result.done(
        function (response) {
            if (response === "Success") {
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

    url = 'https://localhost:44398/api/ShoppingCart/RemoveProduct';

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
    url = 'https://localhost:44398/api/Products/GetProducts';
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

    url = 'https://localhost:44398/api/ShoppingCart/Checkout';

    var result = deleteRequest(data, url);
    result.done(
        function (response) {
            if (response == "Success") {
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
    $('.add-cart-button').click(function () {
        var name = $(this).closest('.ProductTitle').find('.productName').innerHTML;
        var n = 23;
    });
});


function Search() {
    var data = $('#search').serializeArray();
    data = JSON.stringify(data);
    data = JSON.parse(data);

    var url = 'https://localhost:44398/api/Menu/Search';

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