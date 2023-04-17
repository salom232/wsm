verifyToken(getParameterByName("tempToken"));
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

async function verifyToken(Token){
    console.log(Token);
    if(Token == "" || Token == null || Token.trim() == null){
		//window.location.replace(`${URIGANDHIPORT}`);
    }else{
        jQuery.support.cors = true;
        $.ajax({
            headers: {"Access-Control-Allow-Headers": "X-Requested-With"
                    ,"Access-Control-Allow-Origin": "*"
                    ,"Authorization": "Bearer " + Token},
            dataType: "JSON",
            type: "POST",
            crossDomain: true,
            url: `${URIMIDREST}/gandhimiddlewarerest/catalogo_gandhi/users/access`,
            contentType: 'application/json',
            async: false,
            statusCode: {
                200: function (response) {
                   console.log(response);
                },
                201: function (response) {
                    console.log(response);
                },
                400: function (response) {
                    console.log(response);
                },
                403: function (response) {
                    //console.log(response);
                 },
                404: function (response) {
                    //console.log(response);
                }
            },
            success: function (data){
                console.log(data);
                sessionStorage.setItem('Token', data.data.accesToken);
                window.location.replace("main.html");
            },
            error: function(e){
                console.log(e);
                //window.location.replace(`${URIGANDHIPORT}`);
            }
        });
    }
}