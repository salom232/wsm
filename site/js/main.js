$(document).ready(async function() {
    getUserData();
});
function getUserData(){
    jQuery.support.cors = true;
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"
                ,"Authorization": "Bearer " + sessionStorage.getItem('Token')},
        dataType: "JSON",
        type: "POST",
        crossDomain: true,
        url: `${URIMIDREST}/gandhimiddlewarerest/catalogo_gandhi/users/status`,
        contentType: 'application/json',
        async: false,
        statusCode: {
            200: function (response) {
                //console.log(response);
            },
            201: function (response) {
                //console.log(response);
            },
            400: function (response) {
                //console.log(response);
            },
            403: function (response) {
                //console.log(response);
                },
            404: function (response) {
                //console.log(response);
            }
        },
        success: function (data){
            $.ajax({
                headers: {"Access-Control-Allow-Headers": "X-Requested-With"
                        ,"Authorization": "Bearer " + sessionStorage.getItem('Token')},
                dataType: "JSON",
                type: "POST",
                crossDomain: true,
                url: `${URI}/getUsrC`,
                contentType: 'application/json',
                async: false,
                statusCode: {
                    200: function (response) {
                        //console.log(response);
                    },
                    201: function (response) {
                        //console.log(response);
                    },
                    400: function (response) {
                        //console.log(response);
                    },
                    403: function (response) {
                        //console.log(response);
                        },
                    404: function (response) {
                        //console.log(response);
                    }
                },
                success: function (data){
                    sessionStorage.setItem('UserId', data.UserData.UserId);
                    sessionStorage.setItem('UserName', data.UserData.UserFName);
                    sessionStorage.setItem('UserFName', data.UserData.UserFName);
                    sessionStorage.setItem('UserIDProv', data.UserData.UserSupID);
                    sessionStorage.setItem('UserRoles', data.UserData.UserRol);
                    sessionStorage.setItem('UserProv', "N");
                    for(var res in data.UserData.UserRol){
                        if (data.UserData.UserRol[res].RolDesc == "PROVEEDOR" && sessionStorage.getItem('UserProv') == "N"){
                            sessionStorage.setItem('UserProv', "Y");
                        }
                    }
                    console.log(sessionStorage.getItem('UserProv'));
                    axios.post(`${URI}/Log/`, {
                        responseType: 'json',
                        data: {
                            USERID: sessionStorage.getItem('UserId'),
                            ACTIONDESC: 'Entro a pantalla princripal.'
                          }
                    });
                },
                error: function(e){
                    console.log(e)
                }
            });
        },
        error: function(e){
            window.location.replace(`${URIGANDHIPORT}`);
            console.log(e.status);
        }
    });
}