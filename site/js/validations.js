$(document).ready(async function() {
    $FamiliesObject = [];
    $ProductPrivileges = [];
    $ProductPrivilegesBtt = [];
    $ProductPrivilegesAtt = [];
    $UserRoles = [];
    ValidationToken();
});

function ValidationToken(){
    jQuery.support.cors = true;
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
            if(data.Status == "Failed"){
                window.location.replace(`${URIGANDHIPORT}`);
            }
            sessionStorage.setItem('UserId', data.UserData.UserId);
            sessionStorage.setItem('UserFName', data.UserData.UserFName);
            sessionStorage.setItem('UserIDProv', data.UserData.UserSupID);
            var Roles = [];
            for(var ix in data.UserData.UserRol){
                $UserRoles.push(data.UserData.UserRol[ix].RolID);
                Roles.push(data.UserData.UserRol[ix].RolDesc);
            }
            $("#UserNameRol").text(data.UserData.UserFName);
            $("#UserRol").text(Roles.join());

            var MenuPrivileges =  data.UserPrivileges.Privileges.filter(ObjectPrivileges => ObjectPrivileges.PrivilegeType == "M");
            GenerateMenu(MenuPrivileges);
            $ProductPrivileges =  data.UserPrivileges.Privileges.filter(ObjectPrivileges => ObjectPrivileges.PrivilegeType == "P");
            $ProductPrivilegesBtt =  data.UserPrivileges.Privileges.filter(ObjectPrivileges => ObjectPrivileges.PrivilegeType == "B");
            $ProductPrivilegesAtt =  data.UserPrivileges.Privileges.filter(ObjectPrivileges => ObjectPrivileges.PrivilegeType == "A");
        },
        error: function(e){
            window.location.replace(`${URIGANDHIPORT}`);
            console.log(e.status);
        }
    });
}

function GenerateMenu(PrivilegesObject){
    var menuhtml = "";
    menuhtml = menuhtml + '<li><a href="main.html"><i class="fas fa-home"></i>&nbsp;Inicio</a></li>';
    for(var i in PrivilegesObject){
        switch(PrivilegesObject[i].PrivilegeID){
            case "MALT":
                menuhtml = menuhtml + '<li><a href="alta.html"><i class="fas fa-file-alt"></i>&nbsp;Alta</a></li>';
                break;
            case "MCON":
                menuhtml = menuhtml + '<li><a href="consulta.html"><i class="fas fa-search"></i>&nbsp;Consulta y Modificación</a></li>';
                break;
            case "MCMA":
                menuhtml = menuhtml + '<li><a href="cargamasiva.html"><i class="fas fa-folder-plus"></i>&nbsp;Carga Masiva</a></li>';
                break;
            case "MPRIV":
                menuhtml = menuhtml + '<li><a href="privileges.html"><i class="fas fa-users-cog"></i>&nbsp;Administrar</a></li>';
                break;
            case "MCPA":
                menuhtml = menuhtml + '<li><a href="autorizaconcambioprecio.html"><i class="fas fa-clipboard"></i>&nbsp;Solicitudes</a></li>';
                break;
            case "MCMU":
                menuhtml = menuhtml + '<li><a href="actualizacionmasiva.html"><i class="fas fa-scroll"></i>&nbsp;Actualizacion Masiva</a></li>';
                break;
            case "MCMI":
                menuhtml = menuhtml + '<li><a href="cargamasivaimagenes.html"><i class="fas fa-scroll"></i>&nbsp;Carga Masiva Imagen</a></li>';
                break;
            default:
                break;
        }
    }
    menuhtml = menuhtml + '<li><a href="end.html"><i class="fas fa-door-open"></i>&nbsp;Salir</a></li>';
    $("#NavBarMenu").append(menuhtml);
}