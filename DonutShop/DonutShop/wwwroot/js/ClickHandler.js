function ClickHandler() {
    var doAsyncGet = function (partialUrl) {
        var authorityToken = "";
        var fullUrl = 'http://localhost:44371' + partialUrl;
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
window.onscroll = function () { myFunction();};

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

function Login() {
    var loginDate = JSON.stringify($(loginform).serializeArray());
    loginDate = JSON.parse(loginDate);

    $.ajax({
        type: "POST",
        url: 'https://localhost:44371/api/Users/Login',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ userLogin: loginDate}),

        failure: function (errMsg) {
            alert(errMsg);
        }
    });
}

function CreateAccountBox() {
    $('<div title="Confirm Box"></div>').dialog({
        open: function (event, ui) {
            $(this).html("The Account donsn't exist do you want to create one?");
        },
        close: function () {
            $(this).remove();
        },
        resizable: true,
        height: 140,
        modal: true,
        buttons: {
            'Yes': function () {
                $(this).dialog('close');
                var loginDate = JSON.stringify($(loginform).serializeArray());
                loginDate = JSON.parse(loginDate);

                $.ajax({
                    type: "POST",
                    url: 'https://localhost:44371/api/Users/Register',
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify({ userLogin: loginDate }),
                    success: function (data) {
                        alert(data);
                    },
                    failure: function (errMsg) {
                        alert(errMsg);
                    }
                });

            },
            'No': function () {
                $(this).dialog('close');
            }
        }
    });
}

