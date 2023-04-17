//const { getCatUsers } = require("../../APICalls");

$(document).ready(function() {
    $(".overlay").show();
    $ROLID = "";
    $IDUSER = "";
    $CATROLES = [];
    $ObjectRol = [];
    GetCatRoles();
    GetCatProvs();
    getCatUser();
    getAkeneoRoles();
    $(".js_check_btn").click(async function(e) {
    e.preventDefault();
    
    $check_box_checked = "";
    $check_box_no_checked = "";

    $(".js_data_tables").DataTable().rows().every(function () {
        var rowNode = this.node();
        $(rowNode).find(".sensor_checkbox").each(function () {
            if ($(this).is(":checked")) {
                if ($check_box_checked != "") {
                    $check_box_checked += ",";
                }
                $check_box_checked += $(this).val();
            }else{
                if ($check_box_no_checked != "") {
                    $check_box_no_checked += ",";
                }
                $check_box_no_checked += $(this).val();
            }
        });
    });
    const resultadd = await AddRemovePrivilegesToRol($ROLID,$check_box_checked,$check_box_no_checked);
    //const resultremov = await RemovePrivilegesFromRol($ROLID,$check_box_no_checked);
    CleanData();  
    });

    $(".js_check_btnuser").click(async function(e) {
        e.preventDefault();
        
        $check_box_checked_user = "";
        $check_box_no_checked_user = "";
        $(".js_data_tables_user").DataTable().rows().every(function () {
            var rowNode = this.node();
            $(rowNode).find(".sensor_checkbox_user").each(function () {
                if ($(this).is(":checked")) {
                    if ($check_box_checked_user != "") {
                        $check_box_checked_user += ",";
                    }
                    $check_box_checked_user += $(this).val();
                }else{
                    if ($check_box_no_checked_user != "") {
                        $check_box_no_checked_user += ",";
                    }
                    $check_box_no_checked_user += $(this).val();
                }
            });
        });
        const resultadd = await AddRemoveRolToUser($IDUSER,$check_box_checked_user,$check_box_no_checked_user);
        //AddRolToUser($IDUSER,check_box_checked_user);
        //RemoveRolFromUser($IDUSER,check_box_no_checked_user);
        CleanData();
    });

    $('.select2-plug').select2({
		theme: 'bootstrap4',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
        placeholder: $(this).data('placeholder'),
        allowClear: Boolean($(this).data('allow-clear'))
    });
    axios.post(`${URI}/Log/`, {
        responseType: 'json',
        data: {
            USERID: sessionStorage.getItem('UserId'),
            ACTIONDESC: 'Entro a sección ADMINISTRACION.'
            }
    });
});

function getAkeneoRoles(){
    jQuery.support.cors = true;
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "GET",
        crossDomain: true,
        url: `${URI}/getAkeneoRoles/`,
        contentType: 'application/json',
        async: true,
        success: function (data){
            $('#DataPrivileges').DataTable().destroy();
            $('#DataPrivileges tbody').empty();
            for (var i in data) {
                if(data[i].RolActive === "Y"){
                    $("#DataPrivileges tbody").append("<tr id ='DESROW" + data[i].RolID + "'>"
                    + "<td id='REGID'"+data[i].RolID+">" +data[i].RolID+ "</td>"
                    + "<td id='REGID'"+data[i].RolID+">" +data[i].RolDesc+ "</td>"
                    + "<td scope='row' id='DESROWBTT" + data[i].RolID + "' align='center'><button class='btn buttonm-background buttonm-font-color buttonm' type='button' id='BTT"+data[i].RolID+"' title='Detalle'>Detalles</button></td>"
                    + "<td scope='row' id='DESROWBTT" + data[i].RolID + "' align='center'><button class='btn buttonm-background buttonm-font-color buttonm' type='button' id='BTD"+data[i].RolID+"' title='Detalle'>Desactivar</button></td>"
                    + "<td scope='row' id='DESROWBTT" + data[i].RolID + "' align='center'><button class='btn buttonm-background buttonm-font-color buttonm' type='button' id='BTE"+data[i].RolID+"' title='Detalle'>Eliminar</button></td>"
                    + "</tr>");

                    $("#BTT"+data[i].RolID).click(function() {
                        funeditrol($(this).parents("tr").find("td")[0].innerHTML);
                    });
                    $("#BTD"+data[i].RolID).click(function() {
                        funeditrolAD($(this).parents("tr").find("td")[0].innerHTML, 'N', null, null);
                    });
                    $("#BTE"+data[i].RolID).click(function() {
                        funeditrolAD($(this).parents("tr").find("td")[0].innerHTML, 'D', null, null);
                    });
                }else{
                    $("#DataPrivileges tbody").append("<tr id ='DESROW" + data[i].RolID + "'>"
                    + "<td id='REGID'"+data[i].RolID+">" +data[i].RolID+ "</td>"
                    + "<td id='REGID'"+data[i].RolID+">" +data[i].RolDesc+ "</td>"
                    + "<td scope='row' id='DESROWBTT" + data[i].RolID + "' align='center'><button class='btn buttonm-background buttonm-font-color buttonm' type='button' id='BTT"+data[i].RolID+"' title='Detalle'>Detalles</button></td>"
                    + "<td scope='row' id='DESROWBTT" + data[i].RolID + "' align='center'><button class='btn buttonm-background buttonm-font-color buttonm' type='button' id='BTD"+data[i].RolID+"' title='Detalle'>Activar</button></td>"
                    + "<td scope='row' id='DESROWBTT" + data[i].RolID + "' align='center'><button class='btn buttonm-background buttonm-font-color buttonm' type='button' id='BTE"+data[i].RolID+"' title='Detalle'>Eliminar</button></td>"
                    + "</tr>");

                    $("#BTT"+data[i].RolID).click(function() {
                        funeditrol($(this).parents("tr").find("td")[0].innerHTML);
                    });
                    $("#BTD"+data[i].RolID).click(function() {
                        funeditrolAD($(this).parents("tr").find("td")[0].innerHTML, 'Y', null, null);
                    });
                    $("#BTE"+data[i].RolID).click(function() {
                        funeditrolAD($(this).parents("tr").find("td")[0].innerHTML, 'D', null, null);
                    });
                }
            }

            $('#DataPrivileges tfoot th').each( function () {
                var title = $(this).text();
                $(this).html( '<input type="text" placeholder="Buscar '+title+'" />' );
            });
            $('#DataPrivileges').DataTable( {
                "bPaginate": true,
                "lengthChange": false,
                "bLengthChange": true,
                "bFilter": true,
                "bInfo": true,
                "bAutoWidth": true,
                "scrollX": true,
                "scrollY": true,
                "scrollY": "36vh",
                "scrollCollapse": true,
                "paging": true,
                initComplete: function () {
                this.api().columns().every( function () {
                    var that = this;
                    $( 'input', this.footer() ).on( 'keyup change clear', function () {
                        if ( that.search() !== this.value ) {
                            that
                                .search( this.value )
                                .draw();
                        }
                    } );
                } );
                }
            });
            //$(".overlay").hide();
		},
        error: function(e){
            $(".overlay").hide();
            console.log(e)
        }
    });
}

function funeditrol(RolID){
    $(".overlay").show();
    $ROLID = RolID;
    $('#MessageModal').modal('toggle');
    $('#MessageModal').modal('show');
    jQuery.support.cors = true;
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "GET",
        crossDomain: true,
        url: `${URI}/getAkeneoPrivilegesListByType/`+RolID,
        contentType: 'application/json',
        async: true,
        success: function (data){
            $('#DataPrivilegesEdit').DataTable().destroy();
            $('#DataPrivilegesEdit tbody').empty();
            
            for (var i in data) {
                var OptionActive = "N";
                if(data[i].PrivilegeActive === "Y"){
                    OptionActive = '<input class="form-check-input sensor_checkbox" type="checkbox" value="' + data[i].PrivilegeID + '" id="' + data[i].PrivilegeID + '" name="checkprivs" checked>';
                }else{
                    OptionActive = '<input class="form-check-input sensor_checkbox" type="checkbox" value="' + data[i].PrivilegeID + '" id="' + data[i].PrivilegeID + '" name="checkprivs">';
                }
                $("#DataPrivilegesEdit tbody").append("<tr id ='DESROW" + data[i].PrivilegeID + "'>"
                + "<td id='REGID'"+data[i].PrivilegeID+">" +data[i].PrivilegeID+ "</td>"
                + "<td id='REGID'"+data[i].PrivilegeID+">" +data[i].PrivilegeType+ "</td>"
                + "<td id='REGID'"+data[i].PrivilegeID+">" +data[i].PrivilegeDesc+ "</td>"
                + "<td>" + OptionActive + "</td>"
                + "</tr>");
            }

            $('#DataPrivilegesEdit tfoot th').each( function () {
                var title = $(this).text();
                $(this).html( '<input type="text" placeholder="Buscar '+title+'" />' );
            });
            $('#DataPrivilegesEdit').DataTable( {
                "bPaginate": true,
                "lengthChange": false,
                "bLengthChange": true,
                "bFilter": true,
                "bInfo": true,
                "bAutoWidth": true,
                "scrollX": true,
                "scrollY": true,
                "scrollY": "36vh",
                "scrollCollapse": true,
                "paging": true,
                initComplete: function () {
                this.api().columns().every( function () {
                    var that = this;
                    $( 'input', this.footer() ).on( 'keyup change clear', function () {
                        if ( that.search() !== this.value ) {
                            that
                                .search( this.value )
                                .draw();
                        }
                    } );
                } );
                }
            });
            $(".overlay").hide();
		},
        error: function(e){
            $(".overlay").hide();
            console.log(e)
        }
    });
}
function hide (elements) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = 'none';
  }
}

function show (elements, specifiedDisplay) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
      elements[index].style.display = specifiedDisplay || 'block';
  }
}

function ShowProgressBar(){
  $(".overlay").show();
}

function CleanData(){
    location.reload();
}

async function AddRemovePrivilegesToRol(RolID,ObjectToAdd, ObjectToRmv){
    $(".overlay").show();
    var jsonDataObject = new Object();
    jsonDataObject.Role = RolID;
    jsonDataObject.PrivilegeAdd = ObjectToAdd;
    jsonDataObject.PrivilegeRmv = ObjectToRmv;
    jsonDataObject.Action = "ADD";
    var jsonData = JSON.stringify(jsonDataObject);

    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "POST",
        crossDomain: true,
        url: `${URI}/AddDeleteAkeneoRolPrivilege/`,
        contentType: 'application/json',
        data: jsonData,
        async: true,
        success: function (data){
            console.log(data);
            axios.post(`${URI}/Log/`, {
                responseType: 'json',
                data: {
                    USERID: sessionStorage.getItem('UserId'),
                    ACTIONDESC: 'Agrego privilegios al ROL "' + RolID + '", los privilegios agregados fueron: ' + ObjectToAdd
                    }
            });
            
            $(".overlay").hide();
        },
        error: function(e){
            $(".overlay").hide();
            console.log(e)
        }
    });
}

async function AddRemoveRolToUser(UserID,ObjectToAdd, ObjectToRmv){
    $(".overlay").show();
    var jsonDataObject = new Object();
    jsonDataObject.UserID = UserID;
    jsonDataObject.RolAdd = ObjectToAdd;
    jsonDataObject.RolRem = ObjectToRmv;
    jsonDataObject.Action = "ADD";
    var jsonData = JSON.stringify(jsonDataObject);

    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "POST",
        crossDomain: true,
        url: `${URI}/AddDelUserRol/`,
        contentType: 'application/json',
        data: jsonData,
        async: true,
        success: function (data){
            console.log(data);
            axios.post(`${URI}/Log/`, {
                responseType: 'json',
                data: {
                    USERID: sessionStorage.getItem('UserId'),
                    ACTIONDESC: 'Agrego roles al usuario "' + UserID + '", los roles agregados fueron: ' + ObjectToAdd
                    }
            });
            
            $(".overlay").hide();
        },
        error: function(e){
            $(".overlay").hide();
            console.log(e)
        }
    });
}

async function RemovePrivilegesFromRol(RolID,ObjectToRemove){
    $(".overlay").show();
    var jsonDataObject = new Object();
    jsonDataObject.Role = RolID;
    jsonDataObject.Privilege = ObjectToRemove;
    jsonDataObject.Action = "REMOVE";
    var jsonData = JSON.stringify(jsonDataObject);
    console.log(jsonData);
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "POST",
        crossDomain: true,
        url: `${URI}/AddDeleteAkeneoRolPrivilege/`,
        contentType: 'application/json',
        data: jsonData,
        async: true,
        success: function (data){
            axios.post(`${URI}/Log/`, {
                responseType: 'json',
                data: {
                    USERID: sessionStorage.getItem('UserId'),
                    ACTIONDESC: 'Removio privilegios al ROL "' + RolID + '", los privilegios removidos fueron: ' + ObjectToRemove
                    }
            });
            $(".overlay").hide();
        },
        error: function(e){
            $(".overlay").hide();
            console.log(e)
        }
    });
}

function AddRolToUser(IDUser,ObjectToAdd){
    $(".overlay").show();
    var jsonDataObject = new Object();
    jsonDataObject.IdUser = IDUser;
    jsonDataObject.IdRol = ObjectToAdd;
    jsonDataObject.Action = "A";
    var jsonData = JSON.stringify(jsonDataObject);

    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "POST",
        crossDomain: true,
        url: `${URI}/AddDelUserRol/`,
        contentType: 'application/json',
        data: jsonData,
        async: true,
        success: function (data){
            console.log(data);
            axios.post(`${URI}/Log/`, {
                responseType: 'json',
                data: {
                    USERID: sessionStorage.getItem('UserId'),
                    ACTIONDESC: 'Agrego privilegios al usuario "' + IDUser + '", los privilegios agregados fueron: ' + ObjectToAdd
                    }
            });
            $(".overlay").hide();
        },
        error: function(e){
            $(".overlay").hide();
            console.log(e)
        }
    });
}

function RemoveRolFromUser(IDUser,ObjectToRemove){
    $(".overlay").show();
    var jsonDataObject = new Object();
    jsonDataObject.IdUser = IDUser;
    jsonDataObject.IdRol = ObjectToRemove;
    jsonDataObject.Action = "D";
    var jsonData = JSON.stringify(jsonDataObject);

    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "POST",
        crossDomain: true,
        url: `${URI}/AddDelUserRol/`,
        contentType: 'application/json',
        data: jsonData,
        async: true,
        success: function (data){
            console.log(data);
            axios.post(`${URI}/Log/`, {
                responseType: 'json',
                data: {
                    USERID: sessionStorage.getItem('UserId'),
                    ACTIONDESC: 'Removio privilegios al usuario "' + IDUser + '", los privilegios removidos fueron: ' + ObjectToAdd
                    }
            });
            $(".overlay").hide();
        },
        error: function(e){
            $(".overlay").hide();
            console.log(e)
        }
    });
}

function GetCatRoles(){
    $("<option value='NV'>Elija una opción</option>").appendTo("#InRol");
    $('#InRol').val('NV').prop('selected', true);
    $("<option value='0'>Elija una opción</option>").appendTo("#InCatRol");
    $('#InCatRol').val('NV').prop('selected', true);
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "GET",
        crossDomain: true,
        url: `${URI}/getCatRoles/`,
        contentType: 'application/json',
        async: true,
        success: function (data){
            for(var i in data){
                $CATROLES.push(data[i]);
                $("<option value='"+data[i].IdRol+"'>"+data[i].DescripcionRol+"</option>").appendTo("#InRol");
                $("<option value='"+data[i].IdRol+"'>"+data[i].DescripcionRol+"</option>").appendTo("#InCatRol");
            }
        },
        error: function(e){
            console.log(e)
        }
    });
}

function GetCatProvs(){
    $("<option value='NV'>Elija una Proveedor</option>").appendTo("#InProvs");
    $('#InProvs').val('NV').prop('selected', true);
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "GET",
        crossDomain: true,
        url: `${URI}/Provs/`,
        contentType: 'application/json',
        async: true,
        success: function (data){
            for(var i in data){
                $("<option value='"+data[i].Proveedor+"'>"+data[i].Nombre+"</option>").appendTo("#InProvs");
            }
        },
        error: function(e){
            console.log(e)
        }
    });
}

function getCatUser(){
    $(".overlay").show();
    jQuery.support.cors = true;
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "GET",
        crossDomain: true,
        url: `${URI}/getCatUsers/0`,
        contentType: 'application/json',
        async: true,
        success: function (data){
            $('#DataUsers').DataTable().destroy();
            $('#DataUsers tbody').empty();
            for (var i in data) {
                $("#DataUsers tbody").append("<tr id ='DESROW" + data[i].IdUsuario + "'>"
                + "<td id='REGID'"+data[i].IdUsuario+">" +data[i].IdUsuario+ "</td>"
                + "<td id='REGID'"+data[i].IdUsuario+">" +data[i].LoginUsuario+ "</td>"
                + "<td id='REGID'"+data[i].IdUsuario+">" +data[i].NombreUsuario+ " " +data[i].ApellidoPatUsuario+ " " +data[i].ApellidoMatUsuario+ "</td>"
                + "<td id='REGID'"+data[i].IdUsuario+">" +data[i].IdProveedor+ "</td>"
                + "<td scope='row' id='DESROWBTT" + data[i].IdUsuario + "' align='center'><button class='btn buttonm-background buttonm-font-color buttonm' type='button' id='BTTCP"+data[i].IdUsuario+"' title='Detalle'>Cambiar</button></td>"
                + "<td scope='row' id='DESROWBTT" + data[i].IdUsuario + "' align='center'><button class='btn buttonm-background buttonm-font-color buttonm' type='button' id='BTTCR"+data[i].IdUsuario+"' title='Detalle'>Detalles</button></td>"
                + "</tr>");

                $("#BTTCP"+data[i].IdUsuario).click(function() {
                    showChangePassModal($(this).parents("tr").find("td")[0].innerHTML);
                });
                $("#BTTCR"+data[i].IdUsuario).click(function() {
                    funeditcatrol($(this).parents("tr").find("td")[0].innerHTML);
                });
            }

            $('#DataUsers tfoot th').each( function () {
                var title = $(this).text();
                $(this).html( '<input type="text" placeholder="Buscar '+title+'" />' );
            });
            $('#DataUsers').DataTable( {
                "bPaginate": true,
                "lengthChange": false,
                "bLengthChange": true,
                "bFilter": true,
                "bInfo": true,
                "bAutoWidth": true,
                "scrollX": true,
                "scrollY": true,
                "scrollY": "36vh",
                "scrollCollapse": true,
                "paging": true,
                initComplete: function () {
                this.api().columns().every( function () {
                    var that = this;
                    $( 'input', this.footer() ).on( 'keyup change clear', function () {
                        if ( that.search() !== this.value ) {
                            that
                                .search( this.value )
                                .draw();
                        }
                    } );
                } );
                }
            });
            $(".overlay").hide();
		},
        error: function(e){
            $(".overlay").hide();
            console.log(e)
        }
    });
}

function funeditcatrol(IDUser){
    $(".overlay").show();
    $IDUSER = IDUser;
    $('#MessageModaluser').modal('toggle');
    $('#MessageModaluser').modal('show');
    jQuery.support.cors = true;
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "GET",
        crossDomain: true,
        url: `${URI}/getUserRoles/`+IDUser,
        contentType: 'application/json',
        async: true,
        success: function (data){
            $('#DataUserRolesEdit').DataTable().destroy();
            $('#DataUserRolesEdit tbody').empty();
            
            for (var i in data) {
                var OptionActive = "N";
                if(data[i].RolActive === "Y"){
                    OptionActive = '<input class="form-check-input sensor_checkbox_user" type="checkbox" value="' + data[i].RolID + '" id="' + data[i].RolID + '" name="checkprivs" checked>';
                }else{
                    OptionActive = '<input class="form-check-input sensor_checkbox_user" type="checkbox" value="' + data[i].RolID + '" id="' + data[i].RolID + '" name="checkprivs">';
                }
                $("#DataUserRolesEdit tbody").append("<tr id ='DESROW" + data[i].RolID + "'>"
                + "<td id='REGID'"+data[i].RolID+">" +data[i].RolID+ "</td>"
                + "<td id='REGID'"+data[i].RolID+">" +data[i].RolDesc+ "</td>"
                + "<td>" + OptionActive + "</td>"
                + "</tr>");
            }

            $('#DataUserRolesEdit tfoot th').each( function () {
                var title = $(this).text();
                $(this).html( '<input type="text" placeholder="Buscar '+title+'" />' );
            });
            $('#DataUserRolesEdit').DataTable( {
                "bPaginate": true,
                "lengthChange": false,
                "bLengthChange": true,
                "bFilter": true,
                "bInfo": true,
                "bAutoWidth": true,
                "scrollX": true,
                "scrollY": true,
                "scrollY": "36vh",
                "scrollCollapse": true,
                "paging": true,
                initComplete: function () {
                this.api().columns().every( function () {
                    var that = this;
                    $( 'input', this.footer() ).on( 'keyup change clear', function () {
                        if ( that.search() !== this.value ) {
                            that
                                .search( this.value )
                                .draw();
                        }
                    } );
                } );
                }
            });
            $(".overlay").hide();
		},
        error: function(e){
            $(".overlay").hide();
            console.log(e)
        }
    });
}

function funeditrolAD(RolID, Action, IntRol, RolDesc){
    $ObjectRol.shift();
    
    $('#UpdateModal').modal('toggle');
    $('#UpdateModal').modal('show');
    if(Action === "Y"){
        $('#ModalBodyUpd').text("Esta a punto de activar el Rol " + RolID + ", ¿desea continuar?");
        var ObjectOptions = {
            RolID : RolID,
            Action : Action,
            IntRol : IntRol,
            RolDesc : RolDesc
        }
        $ObjectRol.push(ObjectOptions);
    }else if(Action === "N"){
        $('#ModalBodyUpd').text("Esta a punto de desactivar el Rol " + RolID + ", ¿desea continuar?");
        var ObjectOptions = {
            RolID : RolID,
            Action : Action,
            IntRol : IntRol,
            RolDesc : RolDesc
        }
        $ObjectRol.push(ObjectOptions);
    }else if(Action === "D"){
        $('#ModalBodyUpd').text("Esta a punto de eliminar el Rol " + RolID + ", ¿desea continuar?");
        var ObjectOptions = {
            RolID : RolID,
            Action : Action,
            IntRol : IntRol,
            RolDesc : RolDesc
        }
        $ObjectRol.push(ObjectOptions);
    }else{
        
    }
}

function ExecfuneditrolAD(){
    $('#UpdateModal').modal('hide');
    $(".overlay").show();
    var jsonDataObject = new Object();
    jsonDataObject.Role = $ObjectRol[0].RolID;
    jsonDataObject.Action = $ObjectRol[0].Action;
    jsonDataObject.IntRol = $ObjectRol[0].IntRol;
    jsonDataObject.RolDesc = $ObjectRol[0].RolDesc;
    var jsonData = JSON.stringify(jsonDataObject);

    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "POST",
        crossDomain: true,
        url: `${URI}/AdminAkeneoRol/`,
        contentType: 'application/json',
        data: jsonData,
        async: true,
        success: function (data){
            $(".overlay").hide();
            $('#ProcessModal').modal('toggle');
            $('#ProcessModal').modal('show');
            $('#ProcessModalBody').text("Cambios realizados correctamente.");
            var ActionUser = "";
            switch($ObjectRol[0].Action){
                case 'Y':
                    ActionUser = 'activo';
                case 'N':
                    ActionUser = 'desactivo';
                case 'D':
                    ActionUser = 'elimino';
                default:
                    break;
            }
            axios.post(`${URI}/Log/`, {
                responseType: 'json',
                data: {
                    USERID: sessionStorage.getItem('UserId'),
                    ACTIONDESC: 'El usuario "' + ActionUser + '", el rol: ' + $ObjectRol[0].RolID
                    }
            });
            CleanData();
        },
        error: function(e){
            $(".overlay").hide();
            $('#ProcessModal').modal('toggle');
            $('#ProcessModal').modal('show');
            $('#ProcessModalBody').text(e);
        }
    });
}

function ExecfuneditrolADNew(){
    if(document.getElementById("RolID").value.trim() === "" || document.getElementById("RolDesc").value.trim() === "" || $("#InRol option:selected").val() === "NV"){
        $('#NewRolModal').modal('hide');
        $('#ProcessModal').modal('toggle');
        $('#ProcessModal').modal('show');
        $('#ProcessModalBody').text("Favor de completar los campos.");
    }else{
        $('#UpdateModal').modal('hide');
        $(".overlay").show();
        var jsonDataObject = new Object();
        jsonDataObject.Role = document.getElementById("RolID").value;
        jsonDataObject.Action = "A";
        jsonDataObject.IntRol = $("#InRol option:selected").val();
        jsonDataObject.RolDesc = document.getElementById("RolDesc").value;
        var jsonData = JSON.stringify(jsonDataObject);
    
        $.ajax({
            headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
            dataType: "JSON",
            type: "POST",
            crossDomain: true,
            url: `${URI}/AdminAkeneoRol/`,
            contentType: 'application/json',
            data: jsonData,
            async: true,
            success: function (data){
                $(".overlay").hide();
                $('#ProcessModal').modal('toggle');
                $('#ProcessModal').modal('show');
                $('#ProcessModalBody').text("Cambios realizados correctamente.");
                axios.post(`${URI}/Log/`, {
                    responseType: 'json',
                    data: {
                        USERID: sessionStorage.getItem('UserId'),
                        ACTIONDESC: 'El usuario dio de alta el ROL"' + document.getElementById("RolID").value + '", con el ROL de INTELISIS: ' + $("#InRol option:selected").val()
                        }
                });
                CleanData();
            },
            error: function(e){
                $(".overlay").hide();
                $('#ProcessModal').modal('toggle');
                $('#ProcessModal').modal('show');
                $('#ProcessModalBody').text(e);
            }
        });
    }
}

function showNewUserModal(IDUser){
    //$('#NewUserModal').modal('toggle');
    //$('#NewUserModal').modal('show');
    $('#MessageModaluser').modal('toggle');
    $('#MessageModaluser').modal('show');
}

function showChangePassModal(IDUser){
    $IDUSER = IDUser;
    $('#ChangePassModal').modal('toggle');
    $('#ChangePassModal').modal('show');
}


function AddNewUser(){
    if(document.getElementById("IdUser").value.trim() === "" || document.getElementById("IdPass").value.trim() === "" || $("#InCatRol option:selected").val() === "NV" || document.getElementById("RolUsrName").value.trim() === "" || document.getElementById("RolUsrLastNP").value.trim() === "" || document.getElementById("RolUsrLastNM").value.trim() === ""){
        $('#NewUserModal').modal('hide');
        $('#ProcessModal').modal('toggle');
        $('#ProcessModal').modal('show');
        $('#ProcessModalBody').text("Favor de completar los campos.");
    }else{
        $('#NewUserModal').modal('hide');
        $(".overlay").show();
        var Prov = 0;
        if ($("#InProvs option:selected").val() == "NV"){
            Prov = 0
        }else{
            Prov = $("#InProvs option:selected").val();
        }
        var jsonDataObject = new Object();
        jsonDataObject.IdRol = $("#InCatRol option:selected").val();
        jsonDataObject.Option = 1;
        jsonDataObject.Username = document.getElementById("IdUser").value;
        jsonDataObject.Pass = document.getElementById("IdPass").value;
        jsonDataObject.Name = document.getElementById("RolUsrName").value;
        jsonDataObject.LastNamep = document.getElementById("RolUsrLastNP").value;
        jsonDataObject.LastNamem = document.getElementById("RolUsrLastNM").value;
        jsonDataObject.IdProv = Prov;
        jsonDataObject.IdUser = 0;
        jsonDataObject.ViewDoc = 0;
        var jsonData = JSON.stringify(jsonDataObject);

        $.ajax({
            headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
            dataType: "JSON",
            type: "POST",
            crossDomain: true,
            url: `${URI}/AddUsers/`,
            contentType: 'application/json',
            data: jsonData,
            async: true,
            success: function (data){
                console.log(data);
                $(".overlay").hide();
                $('#ProcessModal').modal('toggle');
                $('#ProcessModal').modal('show');
                $('#ProcessModalBody').text("Usuario creado correctamente.");
                axios.post(`${URI}/Log/`, {
                    responseType: 'json',
                    data: {
                        USERID: sessionStorage.getItem('UserId'),
                        ACTIONDESC: 'El usuario creo el usuario"' + document.getElementById("IdUser").value + '", con el ROL de INTELISI: ' + $("#InCatRol option:selected").val()
                        }
                });
                CleanData();
            },
            error: function(e){
                console.log(e);
                $(".overlay").hide();
                $('#ProcessModal').modal('toggle');
                $('#ProcessModal').modal('show');
                $('#ProcessModalBody').text(e);
            }
        });
    }
}


function ChangePass(){
    if(document.getElementById("NewPass").value.trim() !== document.getElementById("NewPassConf").value.trim()|| document.getElementById("NewPass").value.trim() === ""){
        $('#ChangePassModal').modal('hide');
        $('#ProcessModal').modal('toggle');
        $('#ProcessModal').modal('show');
        $('#ProcessModalBody').text("Favor de completar los campos.");
    }else{
        $('#ChangePassModal').modal('hide');
        $(".overlay").show();
        var jsonDataObject = new Object();
        jsonDataObject.IdUser = $IDUSER;
        jsonDataObject.NewPass = document.getElementById("NewPass").value;
        var jsonData = JSON.stringify(jsonDataObject);

        jQuery.support.cors = true;
        $.ajax({
            headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
            dataType: "JSON",
            type: "POST",
            crossDomain: true,
            url: `${URI}/ChangePassProvs/`,
            contentType: 'application/json',
            data: jsonData,
            async: true,
            success: function (data){
                $(".overlay").hide();
                $('#ProcessModal').modal('toggle');
                $('#ProcessModal').modal('show');
                $('#ProcessModalBody').text("Password actualizado correctamente.");
                axios.post(`${URI}/Log/`, {
                    responseType: 'json',
                    data: {
                        USERID: sessionStorage.getItem('UserId'),
                        ACTIONDESC: 'El usuario cambio la contraseña del usuario "' + $IDUSER
                        }
                });
                CleanData();
            },
            error: function(e){
                $(".overlay").hide();
                $('#ProcessModal').modal('toggle');
                $('#ProcessModal').modal('show');
                $('#ProcessModalBody').text(e);
            }
        });
    }
}