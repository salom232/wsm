$(document).ready(function() {
    $(".overlay").show();
    hide(document.querySelectorAll('.MainBodyContent'));
    $FamiliesObject = [];
    getListFamilies();
    $XLSXDataSet = [];
    $(".overlay").hide();
    axios.post(`${URI}/Log/`, {
        responseType: 'json',
        data: {
            USERID: sessionStorage.getItem('UserId'),
            ACTIONDESC: 'Entro a sección CARGA MASIVA.'
            }
    });
});

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

function ProcessFile() {
    $(".overlay").show();
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    sendExcelObjectToApi(e.target.result);
                    //ProcessExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    sendExcelObjectToApi(data);
                    //ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        $(".overlay").hide();
        $('#MessageModal').modal('toggle');
        $('#MessageModal').modal('show');
        $('#ModalTitle').text('Archivo faltante');
        $('#ModalBody').text('Por favor elija un archivo de excel válido.');
    }
};

function ProcessExcel(data) {
    console.log(data);
  var workbook = XLSX.read(data, {
      type: 'binary'
  });
  var firstSheet = workbook.SheetNames[0];
  var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
  
  for (var i = 0; i < excelRows.length; i++) {
      var DataObjet = [];
      DataObjet = [excelRows[i].Id,excelRows[i].Nombre,excelRows[i].Apellido]
      $XLSXDataSet.push(DataObjet);
  }
  console.log($XLSXDataSet);
  
  var ObjectElement = document.querySelectorAll('.MainBodyContent');
  show(ObjectElement, 'inline-block');
};

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
                    "buttons": [
                        {
                            extend: 'excelHtml5',
                            text: 'Export'
                        }
                    ],
                    "lengthChange": false,
                    "bLengthChange": true,
                    "bFilter": true,
                    "bInfo": true,
                    "bAutoWidth": true,
                    "scrollX": true,
                    "scrollY": true,
                    "scrollY": "36vh",
                    "pageLength": 50,
                    "scrollCollapse": true,
                    "paging": true,
                    "dom": 'Bfrtip',
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

function CleanData(){
    location.reload();
}