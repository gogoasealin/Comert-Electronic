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

function HideLogin()
{
    document.getElementById('id01').style.display = 'none';
}


function DialogBox() {
    //$("#dialog").append('var retVal = confirm("Do you want to continue ?");if (retVal == true) {document.write("User wants to continue!");return true;}else {document.write("User does not want to continue!");return false;}')
    //document.getElementById('id01').style.display = 'none';
    $("#dialog").append('<form class="w3-container" id="loginform"><div class="w3-section"><label><b>The Account donut exist do you want to create one ?</b></label><input type="button" value="Yes" onclick="Register();" class="w3-button w3-block w3-green w3-section w3-padding" /></div></form>');
}

function Post(data, url) {
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

function Login() {
    var loginDate = JSON.stringify($(loginform).serializeArray());
    loginDate = JSON.parse(loginDate);

    var result = Post(loginDate, 'https://localhost:44371/api/Users/Login');
    result.done(
        function (response) {
            if (response == "Fail") {
                DialogBox();
            } else {
                LoginApply(loginDate[0]["value"]);
            }
        });   
}

function Register() {
    var loginDate = JSON.stringify($(loginform).serializeArray());
    loginDate = JSON.parse(loginDate);

    var result = Post(loginDate, 'https://localhost:44371/api/Users/Register');
    result.done(
        function (response) {
            HideLogin();
            Login();// ce se intampla dupa login
        }
        );
}

function LoginApply(id) {
    GetSignedInUser(id);
   
    //AdminState(acces);
    //$("#logOut").append(' <a asp-area="" asp-controller="Home" asp-action="AdminPanel"><span class="glyphicon glyphicon-log-out"> </span></a>');
    
}

function GetSignedInUser(id){
    var result = $.ajax({
        type: "POST",
        url: '/api/users/GetLoggedInUser',
        dataType: "text",
        contentType: "application/json",
    });
    result.done(
        function (response) {
            if ($("#loggedInUser").empty()) {
                if (response != null) {
                    $("#loggedInUser").append(response);
                    document.getElementById('id01').style.display = 'none';
                    $("#login").hide();
                    var accesLevel = Post(id, 'https://localhost:44371/api/Users/GetAccesLevel');
                    accesLevel.done(
                        function (response) {
                            var acces = response;
                            if (acces == "1" || acces =="2") {
                                $("#admin").show();
                            }
                        }
                    )
                    $("#logOut").show();
                }

            }  
        }
    );   
}

function logout() {
    var authorityToken = "";
    var fullUrl = 'http://localhost:50209/api/users/LogOut';
    return $.ajax({
        url: fullUrl,
        headers: {
            "Authority": authorityToken
        },
        dataType: "json"
    });
}

//function AdminState(acces) {
//    if (acces == 0) {
//        $("#admin").hide();
//    }
//    //get admin state 
//}