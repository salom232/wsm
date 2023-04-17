$(document).ready(function() {
    $(".overlay").show();
    //hide(document.querySelectorAll('.MainBodyContent'));
    $FamiliesObject = [];
    getListFamilies();
    $XLSXDataSet = [];
    $(".overlay").hide();
    axios.post(`${URI}/Log/`, {
        responseType: 'json',
        data: {
            USERID: sessionStorage.getItem('UserId'),
            ACTIONDESC: 'Entro a sección CARGA MASIVA DE IMAGENES.'
            }
    });

    
});
window.onload = function(){
    if(window.File && window.FileList && window.FileReader)
    {
        var filesInput = document.getElementById("files");
        
        filesInput.addEventListener("change", async function(event){
            
            var files = event.target.files; //FileList object
            var output = document.getElementById("result");
            
            for(var i = 0; i< files.length; i++)
            {
                const restult = await generatediv(files, output, i);
            }
           
        });
    }
    else
    {
        console.log("Your browser does not support File API");
    }
}

async function generatediv (files, output, i){
    var file = files[i];
    var imageSizeByte = file.size/1024;
    var filename = files[i].name;
    filename = filename.replace(".jpg","");
    var picReader = new FileReader();
    
    
    picReader.addEventListener("load",function(event){
        var picFile = event.target;
        var img = new Image();
        img.onload = function() {
            var messagedimensions = "";
            var messagesize = "";
            if(this.width >= 690 && this.width <= 800 && this.height >= 840 && this.height <= 1200){
                messagedimensions = 'Cumple';
            }else{
                messagedimensions = "Las dimensiones de la imagen no son validas, favor de elegir otra imagen. Dimensiones : " + this.width + 'x' + this.height;
            }

            if(imageSizeByte <= 1024){
                messagesize = "Cumple";
            }else{
                messagesize = "La imagen pesa mas de 1mb, favor de elegir otra. Peso : " + imageSizeByte;
            }

            $("#DataToImport tbody").append("<tr id ='DESROW" + filename + "'>"
            + "<td id='CI" + filename + "'>" +filename+ "</td>"
            + "<td id='CI" + filename + "'><img  class='thumbnail' src='" + picFile.result + "'" + "title='" + filename + "' id='"+filename+"'/></td>"
            + "<td id='CI" + filename + "'>" +messagedimensions+ "</td>"
            + "<td id='CI" + filename + "'>" +messagesize+ "</td>"
            + "<td scope='row' id='CATROWBTT" + filename + "' align='center'><button class='btn buttonm-background buttonm-font-color buttonm' type='button' id='BLOADT"+filename+"' title='Detalle'>Eliminar</button></td>"
            + "</tr>");

            $("#BLOADT"+filename).click(function() {
                $('#DESROW'+filename).remove();
            });
        };
        img.src = picFile.result;
    });
    
    picReader.readAsDataURL(file);
}

function UploadImages(){
    $(".overlay").show();
    if($("#ItemType option:selected").val() === 'NV'){
        $(".overlay").hide();
        $('#MessageModal').modal('toggle');
        $('#MessageModal').modal('show');
        $('#ModalTitle').text('Tipo de producto');
        $('#ModalBody').text('Favor de elegir el tipo de producto.');
    }else{
        if( document.getElementById("files").files.length == 0 ){
            $(".overlay").hide();
            $('#MessageModal').modal('toggle');
            $('#MessageModal').modal('show');
            $('#ModalTitle').text('Imanges');
            $('#ModalBody').text('Favor de elegir al menos una imagen.');
        }else{
            var counter = 0;
            $("#DataToImport tbody tr").each(function () {
                counter += 1;
            });
            if(counter == 0){
                $(".overlay").hide();
                $('#MessageModal').modal('toggle');
                $('#MessageModal').modal('show');
                $('#ModalTitle').text('No hay imagenes');
                $('#ModalBody').text('Favor de elegir al menos una imagen.');
            }else{
                var validateok = "";
                $("#DataToImport tbody tr").each(function () {
                    if ($(this).find("td").eq(2).text() !== "Cumple" || $(this).find("td").eq(3).text() !== "Cumple"){
                        validateok = "N";
                    }
                });
                if(validateok == "N"){
                    $(".overlay").hide();
                    $('#MessageModal').modal('toggle');
                    $('#MessageModal').modal('show');
                    $('#ModalTitle').text('Errores');
                    $('#ModalBody').text('Algunas de las imagenes no cumplen con los requisitos, favor de verificar.');
                }else{
                    var jsonDataObject = [];
                    $("#DataToImport tbody tr").each(function () {
                        var base64img = document.getElementById($(this).find("td").eq(0).text()).src;
                        base64img.replace("data:image/jpeg;base64,", "");
                        var ObjectData = {
                            type : $("#ItemType option:selected").val(),
                            user : sessionStorage.getItem('UserId'),
                            sku : $(this).find("td").eq(0).text(),
                            uri : base64img.replace("data:", "").replace(/^.+,/, "")
                        }
                        jsonDataObject.push(ObjectData);
                    });
                    var jsonData = JSON.stringify(jsonDataObject);

                    $.ajax({
                        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
                        dataType: "JSON",
                        type: "POST",
                        crossDomain: true,
                        url: `${URI}/postAkeneoCover/`,
                        contentType: 'application/json',
                        data: jsonData,
                        async: true,
                        success: function (data){
                            $("#fileUpload").prop('disabled', true);
                            $("#btnProcess").prop('disabled', true);
                            $("#DataToImport").remove();
                            var ObjectElement = document.querySelectorAll('.MainBodyContent');
                            show(ObjectElement, 'inline-block');
                            for (var i in data) {
                                if(data[i].statuscode === 500){
                                    $('#MessageModal').modal('toggle');
                                    $('#MessageModal').modal('show');
                                    $('#ModalTitle').text('Archivo vacío');
                                    $('#ModalBody').text('Favor de cargar un archivo con información.');
                                    $("#DataToImportRes tbody").append("<tr>"
                                    + "<td id='PMCON'>Vacío</td>"
                                    + "<td id='PMAPE'>Vacío</td>"
                                    + "</tr>");
                                }
                                else if(data[i].statuscode === 201){
                                    $("#DataToImportRes tbody").append("<tr>"
                                    + "<td id='PMCON" + data[i].identifier + "'>" +data[i].identifier+ "</td>"
                                    + "<td id='PMAPE" + data[i].identifier + "'>" +data[i].message+ "</td>"
                                    + "</tr>");
                                }else{
                                    $("#DataToImportRes tbody").append("<tr>"
                                    + "<td id='PMCON" + data[i].identifier + "'>" +data[i].identifier+ "</td>"
                                    + "<td id='PMAPE" + data[i].identifier + "'>" +formatmessage(data[i].message,data[i].errors)+ "</td>"
                                    + "</tr>");
                                }
                            }

                            $('#DataToImportRes tfoot th').each( function () {
                                var title = $(this).text();
                                $(this).html( '<input type="text" placeholder="Buscar '+title+'" />' );
                            });
                            $('#DataToImportRes').DataTable( {
                                "bPaginate": true,
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
            }
        }
    }
}

function getListFamilies(){
    $("<option value='NV'>Elija una opción</option>").appendTo("#ItemType");
    $('#ItemType').val('NV').prop('selected', true);
    jQuery.support.cors = true;
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "GET",
        crossDomain: true,
        url: `${URI}/getListFamiliesAkeneo/`,
        contentType: 'application/json',
        async: true,
        success: function (data){
            for (var i in data) {
                switch(data[i].value){
                    case "accessories":
                        var ExistOp = $ProductPrivileges.find(opList => opList.PrivilegeID === "OTACC");
                        if(typeof ExistOp !== "undefined"){
                            $("<option value='"+data[i].value+"'>"+data[i].label+"</option>").appendTo("#ItemType");
                        }
                        break;
                    case "audio":
                        var ExistOp = $ProductPrivileges.find(opList => opList.PrivilegeID === "OTAUD");
                        if(typeof ExistOp !== "undefined"){
                            $("<option value='"+data[i].value+"'>"+data[i].label+"</option>").appendTo("#ItemType");
                        }
                        break;
                    case "books":
                        var ExistOp = $ProductPrivileges.find(opList => opList.PrivilegeID === "OTLIB");
                        if(typeof ExistOp !== "undefined"){
                            $("<option value='"+data[i].value+"'>"+data[i].label+"</option>").appendTo("#ItemType");
                        }
                        break;
                    case "video":
                        var ExistOp = $ProductPrivileges.find(opList => opList.PrivilegeID === "OTPRV");
                        if(typeof ExistOp !== "undefined"){
                            $("<option value='"+data[i].value+"'>"+data[i].label+"</option>").appendTo("#ItemType");
                        }
                        break;
                    case "virtual_products":
                        var ExistOp = $ProductPrivileges.find(opList => opList.PrivilegeID === "OTVID");
                        if(typeof ExistOp !== "undefined"){
                            $("<option value='"+data[i].value+"'>"+data[i].label+"</option>").appendTo("#ItemType");
                        }
                        break;
                    default:
                        break;
                }
            }
		},
        error: function(e){
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

function sendExcelObjectToApi(ExcelObject){
    if($("#ItemType option:selected").val() === 'NV'){
        $(".overlay").hide();
        $('#MessageModal').modal('toggle');
        $('#MessageModal').modal('show');
        $('#ModalTitle').text('Tipo de producto');
        $('#ModalBody').text('Favor de elegir el tipo de producto.');
    }else{
        var jsonDataObject = new Object();
        jsonDataObject.BinaryData = ExcelObject;
        jsonDataObject.Supplier = '';
        jsonDataObject.SupplierID = sessionStorage.getItem('UserIDProv');
        jsonDataObject.ItemType  = $("#ItemType option:selected").val();
        jsonDataObject.UserID  = sessionStorage.getItem('UserId');
        var jsonData = JSON.stringify(jsonDataObject);
        console.log(jsonData);
        console.log($("#ItemType option:selected").val());
        $.ajax({
            headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
            dataType: "JSON",
            type: "POST",
            crossDomain: true,
            url: `${URI}/postUploadExcelDataToAkeneo/`,
            contentType: 'application/json',
            data: jsonData,
            async: true,
            success: function (data){
                $("#fileUpload").prop('disabled', true);
                $("#btnProcess").prop('disabled', true);
                console.log(data);
                var ObjectElement = document.querySelectorAll('.MainBodyContent');
                show(ObjectElement, 'inline-block');
                for (var i in data) {
                    if(data[i].statuscode === 500){
                        $('#MessageModal').modal('toggle');
                        $('#MessageModal').modal('show');
                        $('#ModalTitle').text('Archivo vacío');
                        $('#ModalBody').text('Favor de cargar un archivo con información.');
                        $("#DataToImport tbody").append("<tr>"
                        + "<td id='PMCON'>Vacío</td>"
                        + "<td id='PMNAM'>Vacío</td>"
                        + "<td id='PMAPE'>Vacío</td>"
                        + "</tr>");
                    }
                    else if(data[i].statuscode === 200){
                        $("#DataToImport tbody").append("<tr>"
                        + "<td id='PMCON" + data[i].identifier + "'>" +data[i].identifier+ "</td>"
                        + "<td id='PMNAM" + data[i].identifier + "'>" +data[i].title+ "</td>"
                        + "<td id='PMAPE" + data[i].identifier + "'>" +data[i].message+ "</td>"
                        + "</tr>");
                    }else{
                        $("#DataToImport tbody").append("<tr>"
                        + "<td id='PMCON" + data[i].identifier + "'>" +data[i].identifier+ "</td>"
                        + "<td id='PMNAM" + data[i].identifier + "'>" +data[i].title+ "</td>"
                        + "<td id='PMAPE" + data[i].identifier + "'>" +formatmessage(data[i].message,data[i].errors)+ "</td>"
                        + "</tr>");
                    }
                }

                $('#DataToImport tfoot th').each( function () {
                    var title = $(this).text();
                    $(this).html( '<input type="text" placeholder="Buscar '+title+'" />' );
                  });
                  $('#DataToImport').DataTable( {
                      "bPaginate": true,
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
  }


function CleanData(){
    location.reload();
}

function formatmessage(MessageData, ObjectErrors){
    var messageTable = "<font color='red'>Se encontraron los siguientes errores, favor de corregirlos:</font>";
    
    if(ObjectErrors === "N"){
        messageTable = "Carga Exitosa" + '<br>' + MessageData;
    }else{
        if (typeof MessageData === 'object'){
            for(var ii in MessageData){
                if (ii == 0){
                    messageTable = messageTable + '<br>' + MessageData[ii];
                }else{
                    messageTable = messageTable + '<br>' + MessageData[ii];
                }
            }
        }else{
            messageTable = messageTable + '<br>' + MessageData;
        }
    }
    
    return messageTable;
}