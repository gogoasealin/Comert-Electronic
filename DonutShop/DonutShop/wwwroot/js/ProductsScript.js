function postRequest(data, url) {
    return $.ajax({
        type: "POST",
        url: url,
        dataType: "text",
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
}




function GetProducts() {
    url = 'https://localhost:44398/api/Products/GetProducts';
    getRequest(url);
}

function AppendProducts() {

}

$(document).ready(function () {
    $('.add-cart-button').click(function () {
        var name = $(this).closest('.ProductTitle').find('.productName').innerHTML;
        var n = 23;
    });
});


function Search() {

}