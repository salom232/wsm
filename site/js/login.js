async function loginuser(){
    if(document.getElementById("username").value == "" || document.getElementById("password").value == ""){
		alert("Favor de ingresar usuario y contraseña");
    }else{
        jQuery.support.cors = true;
        $.ajax({
            headers: {"Access-Control-Allow-Headers": "X-Requested-With"
                     ,"Access-Control-Allow-Origin": "*"},
            dataType: "JSON",
            type: "POST",
            crossDomain: true,
            url: `${URIMIDREST}/gandhimiddlewarerest/catalogo_gandhi/users/validate`,
            contentType: 'application/json',
            async: false,
            data: JSON.stringify({
                "userName": document.getElementById("username").value,
                "password": document.getElementById("password").value
            }),
            statusCode: {
                200: function (response) {
                   //console.log(response);
                },
                201: function (response) {
                    //console.log(response);
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
                (typeof data.code !== "undefined" && data.code == 1) ? window.location.replace("index.html?tempToken="+data.data.data) : alert(data.data) ;
            },
            error: function(e){
                alert(e);
            }
        });
    }
}