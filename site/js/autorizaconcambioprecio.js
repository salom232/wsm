$(document).ready(function() {
    $(".overlay").show();
    $ROLID = "";
    $counter = 0;
    getChangePricesForAuth();
    /*$(".js_check_btn_a").click(function(e) {
    e.preventDefault();
    
    var check_box_checked = "";
    var check_box_no_checked = "";
    $(".js_data_tables").DataTable().rows().every(function () {
        var rowNode = this.node();
        $(rowNode).find(".sensor_checkbox").each(function () {
            if ($(this).is(":checked")) {
                if (check_box_checked != "") {
                    check_box_checked += ",";
                }
                check_box_checked += $(this).val();
            }else{
                if (check_box_no_checked != "") {
                    check_box_no_checked += ",";
                }
                check_box_no_checked += $(this).val();
            }
        });
    });
    AuthDecCanghePrices(check_box_checked, 1);
    });
    $(".js_check_btn_d").click(function(e) {
    e.preventDefault();
    
    var check_box_checked = "";
    var check_box_no_checked = "";
    $(".js_data_tables").DataTable().rows().every(function () {
        var rowNode = this.node();
        $(rowNode).find(".sensor_checkbox").each(function () {
            if ($(this).is(":checked")) {
                if (check_box_checked != "") {
                    check_box_checked += ",";
                }
                check_box_checked += $(this).val();
            }else{
                if (check_box_no_checked != "") {
                    check_box_no_checked += ",";
                }
                check_box_no_checked += $(this).val();
            }
        });
    });
    AuthDecCanghePrices(check_box_checked, 2);
    });*/
    axios.post(`${URI}/Log/`, {
        responseType: 'json',
        data: {
            USERID: sessionStorage.getItem('UserId'),
            ACTIONDESC: 'Entro a sección AUTORIZACION DE CAMBIO DE PRECIO.'
            }
    });
});

function getChangePricesForAuth(){
    jQuery.support.cors = true;
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "GET",
        crossDomain: true,
        url: `${URI}/getChangePricesForAuth/`,
        contentType: 'application/json',
        async: true,
        success: function (data){
            $('#ChangePriceAuthorization').DataTable().destroy();
            $('#ChangePriceAuthorization tbody').empty();
            /*for (var i in data) {
                var rowiddesc = data[i].Articulo + '-' + data[i].PrecioNuevo + '-' + data[i].MonedaNueva;
                $("#ChangePriceAuthorization tbody").append("<tr id ='DESROW" + rowiddesc + "'>"
                + "<td id='REGID'"+data[i].Articulo+">" +data[i].Origen+ "</td>"
                + "<td id='REGID'"+data[i].Articulo+">" +data[i].Articulo+ "</td>"
                + "<td id='REGID'"+data[i].Articulo+">" +data[i].Proveedor+ "</td>"
                + "<td id='REGID'"+data[i].Articulo+">" +data[i].ProveedorDesc+ "</td>"
                + "<td id='REGID'"+data[i].Articulo+">" +data[i].Titulo+ "</td>"
                + "<td id='REGID'"+data[i].Articulo+">" +data[i].BISAC+ "</td>"
                + "<td id='REGID'"+data[i].Articulo+">" +data[i].Autor+ "</td>"
                + "<td id='REGID'"+data[i].Articulo+">" +data[i].FechaSolicitud+ "</td>"
                + "<td id='REGID'"+data[i].Articulo+">" +data[i].PrecioActual+ "</td>"
                + "<td id='REGID'"+data[i].Articulo+">" +data[i].MonedaActual+ "</td>"
                + "<td id='REGID'"+data[i].Articulo+">" +data[i].PrecioNuevo+ "</td>"
                + "<td id='REGID'"+data[i].Articulo+">" +data[i].MonedaNueva+ "</td>"
                //+ "<td scope='row' id='DESROWBTT" + data[i].Articulo + "' align='center'><button class='btn buttonm-background buttonm-font-color buttonm' type='button' id='BTTA"+data[i].Articulo+"' title='Detalle'>Autorizar</button></td>"
                //+ "<td scope='row' id='DESROWBTT" + data[i].Articulo + "' align='center'><button class='btn buttonm-background buttonm-font-color buttonm' type='button' id='BTTD"+data[i].Articulo+"' title='Detalle'>Rechazar</button></td>"
                + "</tr>");

                /*$("#BTTA"+data[i].Articulo).click(function() {
                    console.log($(this).parents("tr").find("td")[1].innerHTML);
                    AuthDecChange($(this).parents("tr").find("td")[1].innerHTML,1,
                    $(this).parents("tr").find("td")[10].innerHTML,
                    $(this).parents("tr").find("td")[11].innerHTML);
                });
                $("#BTTD"+data[i].Articulo).click(function() {
                    console.log($(this).parents("tr").find("td")[1].innerHTML);
                    AuthDecChange($(this).parents("tr").find("td")[1].innerHTML,2);
                });*/
            //}
                
            $('#ChangePriceAuthorization tfoot th').each( function () {
                var title = $(this).text();
                $(this).html( '<input type="text" placeholder="Buscar '+title+'" />' );
            });
            const dataSet = data;
            var table;
            table = $('#ChangePriceAuthorization').DataTable( {
                "data": dataSet,
                "columns": [
                    { "data": "Origen" },
                    { "data": "Articulo" },
                    { "data": "Proveedor" },
                    { "data": "ProveedorDesc" },
                    { "data": "Titulo" },
                    { "data": "BISAC" },
                    { "data": "Autor" },
                    { "data": "Formato" },
                    { "data": "Descuento" },
                    { "data": "FechaSolicitud" },
                    { "data": "PrecioActual" },
                    { "data": "MonedaActual" },
                    { "data": "PrecioNuevo" },
                    { "data": "MonedaNueva" },
                    { "data": "Existence" },
                    { "data": "Categoria" },
                    { "data": "Familia" },
                    { "data": "Grupo" },
                    { "data": "CreditNote" }
                ],
                "bPaginate": true,
                "select": true,
                "buttons": [
                    //'copyHtml5',
                    'excelHtml5',
                    'csvHtml5',
                    //'pdfHtml5'
                    {
                        text: 'Seleccionar todo',
                        action: function() {
                          table.rows({
                            page: 'current'
                          }).select();
                        }
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
                "orderClasses": false,
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
            table.draw();
            $(".overlay").hide();
            // un-lock scroll position
            var html = jQuery('html');
            var scrollPosition = html.data('scroll-position');
            html.css('overflow', html.data('previous-overflow'));
            if(typeof scrollPosition !== "undefined"){
                window.scrollTo(scrollPosition[0], scrollPosition[1])
            }
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

function AuthDecChange(SKU,Action,Price,Currency){
    $(".overlay").show();
    var jsonDataObject = new Object();
    jsonDataObject.SKU = SKU;
    jsonDataObject.STATUS = Action;
    jsonDataObject.PRICE = Price;
    jsonDataObject.CURENCY = Currency;
    var jsonData = JSON.stringify(jsonDataObject);

    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "POST",
        crossDomain: true,
        url: `${URI}/authDecPriceChange/`,
        contentType: 'application/json',
        data: jsonData,
        async: true,
        success: function (data){
            $('#MessageModal').modal('toggle');
            $('#MessageModal').modal('show');
            $('#ModalTitle').text('Proceso Terminado Correctamente');
            $('#ModalBody').text(data[1]);
            axios.post(`${URI}/Log/`, {
                responseType: 'json',
                data: {
                    USERID: sessionStorage.getItem('UserId'),
                    ACTIONDESC: 'El usuario ' + (Action == 1) ? 'autorizo' : 'rechazo'  + ' la solicitud de cambio de precio del producto "' + SKU
                    }
            });
            getChangePricesForAuth();
        },
        error: function(e){
            console.log(e)
        }
    });
}

/*function AuthDecCanghePrices(Object, Action){
    var PriceObject = [];
    PriceObject.push(Object.split(','));
    for(var i in PriceObject[0]){
        var splitObject = PriceObject[0][i];
        var newsplitobject = splitObject.split('-')
        AuthDecChangeMas(newsplitobject[0],Action,newsplitobject[1],newsplitobject[2]);
    }
    $('#MessageModal').modal('toggle');
    $('#MessageModal').modal('show');
    $('#ModalTitle').text('Proceso Terminado Correctamente');
    $('#ModalBody').text();
    getChangePricesForAuth();
}*/

async function AuthDecChangeMas(SKU,Action,Price,Currency){

    return new Promise(async function(resolve, reject) {
        try {
            var jsonDataObject = new Object();
            jsonDataObject.SKU = SKU;
            jsonDataObject.STATUS = Action;
            jsonDataObject.PRICE = Price;
            jsonDataObject.CURENCY = Currency;
            jsonDataObject.USUARIO = sessionStorage.getItem('UserId');
            var jsonData = JSON.stringify(jsonDataObject);

            $.ajax({
                headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
                dataType: "JSON",
                type: "POST",
                crossDomain: true,
                url: `${URI}/authDecPriceChange/`,
                contentType: 'application/json',
                data: jsonData,
                async: true,
                success: function (data){
                    axios.post(`${URI}/Log/`, {
                        responseType: 'json',
                        data: {
                            USERID: sessionStorage.getItem('UserId'),
                            ACTIONDESC: 'El usuario ' + (Action == 1) ? 'autorizo' : 'rechazo'  + ' la solicitud de cambio de precio del producto "' + SKU
                            }
                    });
                    /*var table = $('#ChangePriceAuthorization').DataTable();
                        table
                            .rows('.selected')
                            .data()
                            .each( function ( value, index ) {
                                console.log(value.Articulo);
                            });*/
                            resolve(data[0]);
                },
                error: function(e){
                    console.log(e)
                }
            });
        } catch (err) {
          console.log('Error occurred', err);
          reject(err);
        }
      });
}

function AcceptSelected(){
    var table = $('#ChangePriceAuthorization').DataTable();
	var count = table.rows('.selected').count();
    $counter = 0;
    if (table.rows('.selected').count() == 0){
        $('#MessageModal').modal('toggle');
        $('#MessageModal').modal('show');
        $('#ModalTitle').text('Datos incompletos');
        $('#ModalBody').text('Favor de seleccionar al menos un registro.');
    }else{
        $(".overlay").show();
        $(document).ready(function(){
            $(this).scrollTop(0); 
        });
        var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
        ];
        var html = jQuery('html');
        html.data('scroll-position', scrollPosition);
        html.data('previous-overflow', html.css('overflow'));
        html.css('overflow', 'hidden');
        if(typeof scrollPosition !== undefined){
            window.scrollTo(scrollPosition[0], scrollPosition[1]);
        }
        table
            .rows('.selected')
            .data()
            .each(async function ( value, index ) {
                /*eachrecord = value + '-';
                splittedrecord = eachrecord.split(',');*/
                const resultauth = await AuthDecChangeMas(value.Articulo,1,value.PrecioNuevo,value.MonedaNueva);
                console.log(resultauth);
                $counter+=1;
                if ($counter == count){
                    $('#MessageModal').modal('toggle');
                    $('#MessageModal').modal('show');
                    $('#ModalBody').text();
                    $('#ModalTitle').text('Proceso Terminado Correctamente');
                    $('#ModalBody').text();
                    getChangePricesForAuth();
                }
            });
    }
}
function DeclineSelected(){
    var table = $('#ChangePriceAuthorization').DataTable();
	var count = table.rows('.selected').count();
    if (table.rows('.selected').count() == 0){
        $('#MessageModal').modal('toggle');
        $('#MessageModal').modal('show');
        $('#ModalTitle').text('Datos incompletos');
        $('#ModalBody').text('Favor de seleccionar al menos un registro.');
    }else{
        $(".overlay").show();
        $(document).ready(function(){
            $(this).scrollTop(0);
        });
        var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
        ];
        var html = jQuery('html');
        html.data('scroll-position', scrollPosition);
        html.data('previous-overflow', html.css('overflow'));
        html.css('overflow', 'hidden');
        if(typeof scrollPosition !== "undefined"){
            window.scrollTo(scrollPosition[0], scrollPosition[1]);
        }
        table
            .rows('.selected')
            .data()
            .each(async function ( value, index ) {
                /*eachrecord = value + '-';
                splittedrecord = eachrecord.split(',');*/
                const resultauth = await AuthDecChangeMas(value.Articulo,2,value.PrecioNuevo,value.MonedaNueva);
                console.log(resultauth);
                $counter+=1;
                if ($counter == count){
                    $('#MessageModal').modal('toggle');
                    $('#MessageModal').modal('show');
                    $('#ModalBody').text();
                    $('#ModalTitle').text('Proceso Terminado Correctamente');
                    $('#ModalBody').text();
                    getChangePricesForAuth();
                }
            });
    }
}