$(document).ready(async function() {
    $(".overlay").show();
    funDisableElements();
    $FamiliesObject = [];
    $AllList = [];
    $AllCategories = [];
    $ObjPublishers = [];
    $ObjManufacturer = [];
    $ObjBrand = [];
    $buttonOPGEN = 0;
    $buttonOPEDIC = 0;
    $buttonOPCHAR = 0;
    $buttonOPPRCLA = 0;
    $buttonOPCOIMP = 0;
    $buttonOPDES = 0;
    $buttonOPOTH = 0;
    $buttonOPSINP= 0;
    getListFamilies();
    funDisplayBtts();
    getAllCategories();
    let resultlist = await getAllList();

    $('.select2-plug').select2({
		theme: 'bootstrap4',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
        placeholder: $(this).data('placeholder'),
        allowClear: Boolean($(this).data('allow-clear'))
    });

    $("#Year").inputmask("9999",{ "clearIncomplete": true });
    $("#publication_date").inputmask("9999-99-99",{ "clearIncomplete": true });

    $('#datepick input').datepicker({
        format: "yyyy-mm-dd",
        language: "es",
        multidate: true,
        calendarWeeks: true
    });

    hoverbuttonscolors();
    axios.post(`${URI}/Log/`, {
        responseType: 'json',
        data: {
            USERID: sessionStorage.getItem('UserId'),
            ACTIONDESC: 'Entro a sección CONSULTA.'
            }
    });

    funDisableCopyCutPaste();
});

function funDisableElements(){
    $("#Active_ID").prop('disabled', true);
    $("#Collection").prop('disabled', true);
    $("#Country").prop('disabled', true);
    $("#Discount").prop('disabled', true);
    $("#EAN").prop('disabled', true);
    $("#Edition").prop('disabled', true);
    $("#EditionType").prop('disabled', true);
    $("#Extras").prop('disabled', true);
    $("#Formats").prop('disabled', true);
    $("#Height").prop('disabled', true);
    $("#ISBN").prop('disabled', true);
    $("#Language").prop('disabled', true);
    $("#Lenght").prop('disabled', true);
    $("#Pages").prop('disabled', true);
    $("#Price").prop('disabled', true);
    $("#Run_time").prop('disabled', true);
    $("#SAT").prop('disabled', true);
    $("#Serie").prop('disabled', true);
    $("#Stock").prop('disabled', true);
    $("#Tax").prop('disabled', true);
    $("#Translator").prop('disabled', true);
    $("#Weight").prop('disabled', true);
    $("#Width").prop('disabled', true);
    $("#Year").prop('disabled', true);
    $("#abridged").prop('disabled', true);
    $("#author_lastname").prop('disabled', true);
    $("#author_lastnamem").prop('disabled', true);
    $("#author_name").prop('disabled', true);
    $("#buy_bet").prop('disabled', true);
    $("#currency").prop('disabled', true);
    //$("#description").prop('disabled', true);
    $("#ImageBtt").prop('disabled', true);
    $("#image").prop('disabled', true);
    $("#name").prop('disabled', true);
    $("#narrator").prop('disabled', true);
    $("#publication_date").prop('disabled', true);
    $("#publisher").prop('disabled', true);
    $("#single_price_law").prop('disabled', true);
    $("#sku").prop('disabled', true);
    $("#subtitle").prop('disabled', true);
    $("#supplier").prop('disabled', true);
    $("#url").prop('disabled', true);
    $("#chanelmenu").prop('disabled', true);

    //Estas listas van a ir de acuerdo a los roles, esta opcion se va a gregar despues
    $("#categories").prop('disabled', true);
    $("#CategoriesTB").prop('disabled', true);
    $("#categoriesB").prop('disabled', true);
    $("#Destiny").prop('disabled', true);
    $("#DestinyTB").prop('disabled', true);
    $("#DestinyB").prop('disabled', true);
    $("#ColofonDate").prop('disabled', true);

    $("#Additional_features").prop('disabled', true);
    $("#Ages").prop('disabled', true);
    $("#Brand").prop('disabled', true);
    $("#Manufacturer").prop('disabled', true);
    $("#director").prop('disabled', true);
    $("#Apellido_Director").prop('disabled', true);
    $("#Package").prop('disabled', true);
    $("#Rating").prop('disabled', true);
    $("#artist").prop('disabled', true);
    $("#apellido_artista").prop('disabled', true);
    $("#Batteries").prop('disabled', true);
    $("#Bluetooth").prop('disabled', true);
    $("#Customer_support").prop('disabled', true);
    $("#Material").prop('disabled', true);
    $("#Storage").prop('disabled', true);
    $("#Warranty").prop('disabled', true);
    $("#Waterproof").prop('disabled', true);
    $("#in_the_box").prop('disabled', true);
    $("#nb_pieces").prop('disabled', true);
    $("#wifi").prop('disabled', true);

    $("#bisac").prop('disabled', true);

    //("#supplierID").prop('disabled', true);
}

function getItemByIdAndType(){
    if($("#ItemType option:selected").val() === "NV"){
        $('#MessageModal').modal('toggle');
        $('#MessageModal').modal('show');
        $('#ModalTitle').text('Tipo de producto faltante');
        $('#ModalBody').text('Favor de seleccionar un tipo de producto.');
    }else{
        if(document.getElementById("SKUFS").value.trim() === ""){
            $('#MessageModal').modal('toggle');
            $('#MessageModal').modal('show');
            $('#ModalTitle').text('Campo faltante');
            $('#ModalBody').text('El campo de busqueda esta vacío, favor de ingresar un valor.');
        }else{
            console.log($("#ItemTypeSearch option:selected").val());
            if($("#ItemTypeSearch option:selected").val() == "searchsku"){
                hide(document.querySelectorAll('.MainBodySearch'));
                $(".overlay").show();
                console.log('Entra aca');
                fungetitemdata(document.getElementById("SKUFS").value);
            }else{
                hide(document.querySelectorAll('.MainBodySearch'));
                $(".overlay").show();
                fungetitemdatabytype();
            }
        }
    }
}

function getAkeneoChanels(CategoriesObject){
    var menuhtml = "";
    menuhtml = '<ul id="Chanels"><li><span class="caret"><i class="bi bi-journals"></i>CANALES GANDHI</span><ul class="nested"';
    var ObjectData = [];
    jQuery.support.cors = true;
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "GET",
        crossDomain: true,
        url: `${URI}/getAkeneoChanels`,
        contentType: 'application/json',
        async: false,
        success: function (data){
			ObjectData = data;
		},
        error: function(e){
            console.log(e)
        }
    });
    for(var l1 in ObjectData.ObjectByLevel1){
        var father1 = ObjectData.ObjectByLevel1[l1].CodeOp;
        if(CategoriesObject.includes(ObjectData.ObjectByLevel1[l1].CodeOp)){
            menuhtml = menuhtml + '<li><span class="caret"></span>&nbsp;<input class="form-check-input" type="checkbox" value="'+ObjectData.ObjectByLevel1[l1].CodeOp+'" id="'+ObjectData.ObjectByLevel1[l1].CodeOp+'" name="checkchanels" checked>&nbsp;<i class="bi bi-journals"></i>&nbsp;'+ObjectData.ObjectByLevel1[l1].DesOp+'<ul class="nested">';
        }else{
            menuhtml = menuhtml + '<li><span class="caret"></span>&nbsp;<input class="form-check-input" type="checkbox" value="'+ObjectData.ObjectByLevel1[l1].CodeOp+'" id="'+ObjectData.ObjectByLevel1[l1].CodeOp+'" name="checkchanels">&nbsp;<i class="bi bi-journals"></i>&nbsp;'+ObjectData.ObjectByLevel1[l1].DesOp+'<ul class="nested">';
        }
        
        for(var l2 in ObjectData.ObjectByLevel2){
            if(ObjectData.ObjectByLevel2[l2].Father === father1){
                var father2 = ObjectData.ObjectByLevel2[l2].CodeOp;
                if (CategoriesObject.includes(ObjectData.ObjectByLevel2[l2].CodeOp)){
                    menuhtml = menuhtml + '<li><span class="caret"></span>&nbsp;<input class="form-check-input" type="checkbox" value="'+ObjectData.ObjectByLevel2[l2].CodeOp+'" id="chanels'+ObjectData.ObjectByLevel2[l2].CodeOp+'" name="checkchanels" checked>&nbsp;<i class="bi bi-journals"></i>&nbsp;'+ObjectData.ObjectByLevel2[l2].DesOp+'<ul class="nested">';
                }else{
                    menuhtml = menuhtml + '<li><span class="caret"></span>&nbsp;<input class="form-check-input" type="checkbox" value="'+ObjectData.ObjectByLevel2[l2].CodeOp+'" id="chanels'+ObjectData.ObjectByLevel2[l2].CodeOp+'" name="checkchanels">&nbsp;<i class="bi bi-journals"></i>&nbsp;'+ObjectData.ObjectByLevel2[l2].DesOp+'<ul class="nested">';
                }
                
                for(var l3 in ObjectData.ObjectByLevel3){
                    if(ObjectData.ObjectByLevel3[l3].Father === father2){
                        if (CategoriesObject.includes(ObjectData.ObjectByLevel3[l3].CodeOp)){
                            menuhtml = menuhtml + '<li>&nbsp;<input class="form-check-input" type="checkbox" value="'+ObjectData.ObjectByLevel3[l3].CodeOp+'" id="chanels'+ObjectData.ObjectByLevel3[l3].CodeOp+'" name="checkchanels" checked>&nbsp;<i class="bi bi-journals"></i>&nbsp;'+ObjectData.ObjectByLevel3[l3].DesOp+'</li>';
                        }else{
                            menuhtml = menuhtml + '<li>&nbsp;<input class="form-check-input" type="checkbox" value="'+ObjectData.ObjectByLevel3[l3].CodeOp+'" id="chanels'+ObjectData.ObjectByLevel3[l3].CodeOp+'" name="checkchanels">&nbsp;<i class="bi bi-journals"></i>&nbsp;'+ObjectData.ObjectByLevel3[l3].DesOp+'</li>';
                        }
                    }
                }
                menuhtml = menuhtml + '</ul></li>';
            }
        }
        menuhtml = menuhtml + '</ul></li>';
    }
    menuhtml = menuhtml + '</ul></li></ul>';

    $("#chanelmenu").append(menuhtml);
    $('head').append('<link href="css/chanelsmenu.css" rel="stylesheet">');
    var toggler = document.getElementsByClassName("caret");
    var i;
    for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function() {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
        });
    }
    $(".overlay").hide();
}

function fungetitemdata(SKU){
    jQuery.support.cors = true;
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "GET",
        crossDomain: true,
        url: `${URI}/getAkeneoItemForGI/`+$("#ItemType").val()+"/"+SKU+"/"+sessionStorage.getItem('UserIDProv')+"/"+$UserRoles,
        contentType: 'application/json',
        async: true,
        success: function (data){
            if(data === false){
                $('#MessageModal').modal('toggle');
                $('#MessageModal').modal('show');
                $('#ModalTitle').text('Libro No Existente');
                $('#ModalBody').text('El libro que busca no existe, favor de ingresar uno nuevo.');
                hide(document.querySelectorAll('.MainBodyContent'));
                axios.post(`${URI}/Log/`, {
                    responseType: 'json',
                    data: {
                        USERID: sessionStorage.getItem('UserId'),
                        ACTIONDESC: 'Busco el producto ' + SKU + ', de tipo ' + $("#ItemType option:selected").text() + ' ,No existe.'
                        }
                });
                $(".overlay").hide();
            }else{
                if(typeof data.responsedata !== "undefined"){
                    $('#MessageModal').modal('toggle');
                    $('#MessageModal').modal('show');
                    $('#ModalTitle').text('Libro Existente');
                    $('#ModalBody').text('El libro que busca ya se encuentra registrado con otro proveedor, favor de ingresar uno nuevo.');
                    hide(document.querySelectorAll('.MainBodyContent'));
                    axios.post(`${URI}/Log/`, {
                        responseType: 'json',
                        data: {
                            USERID: sessionStorage.getItem('UserId'),
                            ACTIONDESC: 'Busco el producto ' + SKU + ', de tipo ' + $("#ItemType option:selected").text() + ' ,Ya fue registrado por otro proveedor.'
                            }
                    });
                    $(".overlay").hide();
                }else{
                    cleanData();
                axios.post(`${URI}/Log/`, {
                    responseType: 'json',
                    data: {
                        USERID: sessionStorage.getItem('UserId'),
                        ACTIONDESC: 'Busco el producto ' + SKU + ', de tipo ' + $("#ItemType option:selected").text() + ' ,Si existe.'
                        }
                });
                //getAllCategories();
                $("input[name='checkchanels']").attr("disabled", true);
                var ObjectElement = document.querySelectorAll('.MainBodyContent');
                show(ObjectElement, 'inline-block');

                $("#CoverTitle").text((typeof data[0].values.name !== "undefined") ? data[0].values.name[0].data : null);
                $("#CoverISBN").text((typeof data[0].values.ISBN !== "undefined") ? data[0].values.ISBN[0].data : null);
                $("#CoverSKU").text((typeof data[0].identifier !== "undefined") ? data[0].identifier : null);
                $("#CoverPrice").text((typeof data[0].values.Price !== "undefined") ? data[0].values.Price[0].data[0].amount : null);
                $("#CoverCurrency").text((typeof data[0].values.currency !== "undefined") ? data[0].values.currency[0].data : null);

                $("#sku").val((typeof data[0].identifier !== "undefined") ? data[0].identifier : null);
                $("#ISBN").val((typeof data[0].values.ISBN !== "undefined") ? data[0].values.ISBN[0].data : null);
                $("#EAN").val((typeof data[0].values.EAN !== "undefined") ? data[0].values.EAN[0].data : null);
                $("#name").val((typeof data[0].values.name !== "undefined") ? data[0].values.name[0].data : null);
                $("#subtitle").val((typeof data[0].values.subtitle !== "undefined") ? data[0].values.subtitle[0].data : null);
                $("#author_name").val((typeof data[0].values.author_name !== "undefined") ? data[0].values.author_name[0].data : null);
                if(typeof data[0].values.author_lastname !== "undefined"){
                    var lastname = data[0].values.author_lastname[0].data.split(" ");
                    $("#author_lastname").val(lastname[0]);
                    $("#author_lastnamem").val(lastname[1]);
                }
                /*if(typeof data[0].values.publisher !== "undefined"){
                    console.log(data[0].values.publisher);
                    var ListPub = $ObjPublishers.filter(ObjParents => ObjParents.value == data[0].values.publisher[0].data);
                    $( "#publisher" ).val( ListPub[0].label );
                    $( "#publisher" ).attr("data-value",ListPub[0].value);
                }*/
                $("#publisher").val((typeof data[0].values.publisher !== "undefined") ? data[0].values.publisher[0].data : null);
                $("#Collection").val((typeof data[0].values.Collection !== "undefined") ? data[0].values.Collection[0].data : null);
                $("#publication_date").val((typeof data[0].values.publication_date !== "undefined") ? data[0].values.publication_date[0].data : null);
                if(typeof data[0].values.Edition !== "undefined"){
                    $('#Edition').val(data[0].values.Edition[0].data).prop('selected', true);
                    $('#Edition').trigger('change');
                }
                if(typeof data[0].values.EditionType !== "undefined"){
                    $('#EditionType').val(data[0].values.EditionType[0].data).prop('selected', true);
                    $('#EditionType').trigger('change');
                }
                if(typeof data[0].values.Country !== "undefined"){
                    $('#Country').val(data[0].values.Country[0].data).prop('selected', true);
                    $('#Country').trigger('change');
                }
                if(typeof data[0].values.Formats !== "undefined"){
                    $('#Formats').val(data[0].values.Formats[0].data).prop('selected', true);
                    $('#Formats').trigger('change');
                }
                if(typeof data[0].values.Language !== "undefined"){
                    $('#Language').val(data[0].values.Language[0].data).prop('selected', true);
                    $('#Language').trigger('change');
                }
                $("#Weight").val((typeof data[0].values.Weight !== "undefined") ? data[0].values.Weight[0].data.amount : null);
                $("#Height").val((typeof data[0].values.Height !== "undefined") ? data[0].values.Height[0].data.amount : null);
                $("#Width").val((typeof data[0].values.Width !== "undefined") ? data[0].values.Width[0].data.amount : null);
                $("#Lenght").val((typeof data[0].values.Lenght !== "undefined") ? data[0].values.Lenght[0].data.amount : null);
                $("#Pages").val((typeof data[0].values.Pages !== "undefined") ? data[0].values.Pages[0].data : null);
                if(typeof data[0].values.Stock !== "undefined"){
                    $('#Stock').val(data[0].values.Stock[0].data).prop('selected', true);
                    $('#Stock').trigger('change');
                }
                if(typeof data[0].values.supplier !== "undefined"){
                    $('#supplier').val(data[0].values.supplier[0].data).prop('selected', true);
                    $('#supplier').trigger('change');
                    //var CategoriID = data[0].values.supplier[0].data;
                    //$("#supplierID").val(CategoriID+'_ID');
                    //$('#supplierID').trigger('change');
                }
                if(typeof data[0].values.currency !== "undefined"){
                    $('#currency').val(data[0].values.currency[0].data).prop('selected', true);
                    $('#currency').trigger('change');
                    $("#currencyOrig").val((typeof data[0].values.currency[0].data !== "undefined") ? data[0].values.currency[0].data : null);
                }
                $("#Price").val((typeof data[0].values.Price !== "undefined") ? data[0].values.Price[0].data[0].amount : null);
                $("#PriceOrig").val((typeof data[0].values.Price !== "undefined") ? data[0].values.Price[0].data[0].amount : null);
                if(typeof data[0].values.Tax !== "undefined"){
                    if(data[0].values.Tax[0].data){
                        $( "#Tax" ).prop( "checked", true );
                    }else{
                        $( "#Tax" ).prop( "checked", false );
                    }
                }
                if(typeof data[0].values.single_price_law !== "undefined"){
                    if(data[0].values.single_price_law[0].data){
                        $( "#single_price_law" ).prop( "checked", true );
                    }else{
                        $( "#single_price_law" ).prop( "checked", false );
                    }
                }
                //$("#ColofonDate").val((typeof data[0].values.single_price_law[0].data !== "undefined") ? data[0].values.single_price_law[0].data : null);
                if(typeof data[0].values.SAT !== "undefined"){
                    $('#SAT').val(data[0].values.SAT[0].data).prop('selected', true);
                    $('#SAT').trigger('change');
                }
                $("#url").val((typeof data[0].values.url !== "undefined") ? data[0].values.url[0].data : null);
                $("#Year").val((typeof data[0].values.Year !== "undefined") ? data[0].values.Year[0].data : null);
                $("#Discount").val((typeof data[0].values.Discount !== "undefined") ? data[0].values.Discount[0].data : 0);
                $("#Serie").val((typeof data[0].values.Serie !== "undefined") ? data[0].values.Serie[0].data : null);
                $("#Run_time").val((typeof data[0].values.Run_time !== "undefined") ? data[0].values.Run_time[0].data.amount : null);
                if(typeof data[0].values.buy_bet !== "undefined"){
                    $('#buy_bet').val(data[0].values.buy_bet[0].data).prop('selected', true);
                    $('#buy_bet').trigger('change');
                }
                $("#Active_ID").val((typeof data[0].values.Active_ID !== "undefined") ? data[0].values.Active_ID[0].data : null);
                $("#Translator").val((typeof data[0].values.Translator !== "undefined") ? data[0].values.Translator[0].data : null);
                $("#narrator").val((typeof data[0].values.narrator !== "undefined") ? data[0].values.narrator[0].data : null);
                if(typeof data[0].values.abridged !== "undefined"){
                    if(data[0].values.abridged[0].data){
                        $( "#abridged" ).prop( "checked", true );
                    }else{
                        $( "#abridged" ).prop( "checked", false );
                    }
                }
                $("#Extras").val((typeof data[0].values.Extras !== "undefined") ? data[0].values.Extras[0].data : null);
                //$("#description").val((typeof data[0].values.description !== "undefined") ? data[0].values.description[0].data : null);
                nicEditors.findEditor("description").setContent((typeof data[0].values.description !== "undefined") ? data[0].values.description[0].data : null);
                
                
                $("#Additional_features").val((typeof data[0].values.Additional_features !== "undefined") ? data[0].values.Additional_features[0].data : null);
                $("#Ages").val((typeof data[0].values.Ages !== "undefined") ? data[0].values.Ages[0].data : null);
                /*if(typeof data[0].values.Brand !== "undefined"){
                    var ListBran = $ObjBrand.filter(ObjParents => ObjParents.value == data[0].values.Brand[0].data);
                    $( "#Brand" ).val( ListBran[0].label );
                    $( "#Brand" ).attr("data-value",ListBran[0].value);
                }
                if(typeof data[0].values.Manufacturer !== "undefined"){
                    var ListManuf = $ObjManufacturer.filter(ObjParents => ObjParents.value == data[0].values.Manufacturer[0].data);
                    $( "#Manufacturer" ).val( ListManuf[0].label );
                    $( "#Manufacturer" ).attr("data-value",ListManuf[0].value);
                }*/
                $("#Brand").val((typeof data[0].values.Brand !== "undefined") ? data[0].values.Brand[0].data : '');
                $("#Manufacturer").val((typeof data[0].values.Manufacturer !== "undefined") ? data[0].values.Manufacturer[0].data : null);

                $("#director").val((typeof data[0].values.director !== "undefined") ? data[0].values.director[0].data : null);
                $("#Apellido_Director").val((typeof data[0].values.Apellido_Director !== "undefined") ? data[0].values.Apellido_Director[0].data : null);
                $("#Package").val((typeof data[0].values.Package !== "undefined") ? data[0].values.Package[0].data : null);
                if(typeof data[0].values.Rating !== "undefined"){
                    $('#Rating').val(data[0].values.Rating[0].data).prop('selected', true);
                    $('#Rating').trigger('change');
                }
                $("#artist").val((typeof data[0].values.artist !== "undefined") ? data[0].values.artist[0].data : null);
                $("#apellido_artista").val((typeof data[0].values.apellido_artista !== "undefined") ? data[0].values.apellido_artista[0].data : null);
                $("#Batteries").val((typeof data[0].values.Batteries !== "undefined") ? data[0].values.Batteries[0].data : null);
                if(typeof data[0].values.Bluetooth !== "undefined"){
                    if(data[0].values.Bluetooth[0].data){
                        $( "#Bluetooth" ).prop( "checked", true );
                    }else{
                        $( "#Bluetooth" ).prop( "checked", false );
                    }
                }
                $("#Customer_support").val((typeof data[0].values.Customer_support !== "undefined") ? data[0].values.Customer_support[0].data : null);
                $("#Material").val((typeof data[0].values.Material !== "undefined") ? data[0].values.Material[0].data : null);
                $("#Storage").val((typeof data[0].values.Storage !== "undefined") ? data[0].values.Storage[0].data : null);
                $("#Warranty").val((typeof data[0].values.Warranty !== "undefined") ? data[0].values.Warranty[0].data : null);
                if(typeof data[0].values.Waterproof !== "undefined"){
                    if(data[0].values.Waterproof[0].data){
                        $( "#Waterproof" ).prop( "checked", true );
                    }else{
                        $( "#Waterproof" ).prop( "checked", false );
                    }
                }
                $("#in_the_box").val((typeof data[0].values.in_the_box !== "undefined") ? data[0].values.in_the_box[0].data : null);
                $("#nb_pieces").val((typeof data[0].values.nb_pieces !== "undefined") ? data[0].values.nb_pieces[0].data : null);
                if(typeof data[0].values.wifi !== "undefined"){
                    if(data[0].values.wifi[0].data){
                        $( "#wifi" ).prop( "checked", true );
                    }else{
                        $( "#wifi" ).prop( "checked", false );
                    }
                }

                $("#bisac").val((typeof data[0].values.bisac !== "undefined") ? data[0].values.bisac[0].data : null);
                
                
                for (var i in data[0].categories) {
                    getCategorieDesc(data[0].categories[i]);
                    if(data[0].categories[i].includes('PN') || data[0].categories[i].includes('PE')){
                        $('#supplier').val(data[0].categories[i]).prop('selected', true);
                        $('#supplier').trigger('change');
                    }
                }
                if(typeof data[0].values.image !== "undefined"){
                    getCoverBook(data[0].identifier);
                }
                getAkeneoChanels(data[0].categories);
                }
            }
        },
        error: function(e){
            $(".overlay").hide();
            console.log(e)
        }
    });
}

function fungetitemdatabytype(){
    var searchatt;
    switch($("#ItemTypeSearch option:selected").val()){
        case 'searchname':
            searchatt = "name";
            break;
        case 'searchauthor':
            searchatt = "author_name";
            break;
        default:
            null;
    }
    jQuery.support.cors = true;
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "GET",
        crossDomain: true,
        url: `${URI}/getAkeneoItemsForGIByName/`+$("#ItemType option:selected").val()+"/"+searchatt+"/"+document.getElementById("SKUFS").value+"/"+sessionStorage.getItem('UserIDProv')+"/"+$UserRoles,
        contentType: 'application/json',
        async: true,
        success: function (data){
            if(data.length === 0){
                $('#MessageModal').modal('toggle');
                $('#MessageModal').modal('show');
                $('#ModalTitle').text('Sin resultados');
                $('#ModalBody').text('No se encontraron datos relacionados a su busqueda, favor de ingresar una nueva.');
                hide(document.querySelectorAll('.MainBodySearch'));
                axios.post(`${URI}/Log/`, {
                    responseType: 'json',
                    data: {
                        USERID: sessionStorage.getItem('UserId'),
                        ACTIONDESC: 'Busco productos con el texto "' + searchatt + '", de tipo ' + $("#ItemType option:selected").text() + ' , no se encontraron datos relacionados a la busqueda.'
                        }
                });
                $(".overlay").hide();
            }else{
                axios.post(`${URI}/Log/`, {
                    responseType: 'json',
                    data: {
                        USERID: sessionStorage.getItem('UserId'),
                        ACTIONDESC: 'Busco productos con el texto "' + searchatt + '", de tipo ' + $("#ItemType option:selected").text() + ' , se encontraron datos relacionados a la busqueda.'
                        }
                });
                var ObjectElement = document.querySelectorAll('.MainBodySearch');
                show(ObjectElement, 'inline-block');
                $('#SearchDataResult').DataTable().destroy();
                $('#SearchDataResult tbody').empty();
                
                for (var i in data) {
                    $("#SearchDataResult tbody").append("<tr id ='DESROW" + data[i].identifier + "'>"
                    + "<td id='REGID'"+data[i].identifier+">" +data[i].identifier+ "</td>"
                    + "<td id='REGIS'"+data[i].identifier+">" +data[i].ISBN+ "</td>"
                    + "<td id='REGEA'"+data[i].identifier+">" +data[i].EAN+ "</td>"
                    + "<td id='REGNA'"+data[i].identifier+">" +data[i].Name+ "</td>"
                    + "<td id='REGAU'"+data[i].identifier+">" +data[i].Author+ "</td>"
                    + "<td scope='row' id='DESROWBTT" + data[i].identifier + "' align='center'><button class='btn buttonm-background buttonm-font-color buttonm' type='button' id='BTT"+data[i].identifier+"' title='Detalle'>Detalles</button></td>"
                    + "</tr>");

                    $("#BTT"+data[i].identifier).click(function() {
                        hide(document.querySelectorAll('.MainBodySearch'));
                        fungetitemdata($(this).parents("tr").find("td")[0].innerHTML);
                    });
                }

                $('#SearchDataResult tfoot th').each( function () {
                    var title = $(this).text();
                    $(this).html( '<input type="text" placeholder="Buscar '+title+'" />' );
                });
                $('#SearchDataResult').DataTable( {
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
            }
        },
        error: function(e){
            $(".overlay").hide();
            console.log(e)
        }
    });
}

function cleanData(){
    hide(document.querySelectorAll('.MainBodyContent'));
    $("#Active_ID").val("");
    $("#Collection").val("");
    $("#Country").val('NV').prop('selected', true);
    $('#Country').trigger('change');
    $("#Discount").val("");
    $("#EAN").val("");
    $("#Edition").val('NV').prop('selected', true);
    $('#Edition').trigger('change');
    $("#EditionType").val('NV').prop('selected', true);
    $('#EditionType').trigger('change');
    $("#Extras").val("");
    $("#Formats").val('NV').prop('selected', true);
    $('#Formats').trigger('change');
    $("#Height").val("");
    $("#ISBN").val("");
    $("#Language").val('NV').prop('selected', true);
    $('#Language').trigger('change');
    $("#Lenght").val("");
    $("#Pages").val("");
    $("#Price").val("");
    $("#PriceOrig").val("");
    $("#Run_time").val("");
    $("#SAT").val('NV').prop('selected', true);
    $('#SAT').trigger('change');
    $("#Serie").val("");
    $("#Stock").val('NV').prop('selected', true);
    $('#Stock').trigger('change');
    $("#Tax").val("N");
    $('#Tax').prop('checked', false);
    $("#Translator").val("");
    $("#Weight").val("");
    $("#Width").val("");
    $("#Year").val("");
    $("#abridged").val("N");
    $('#abridged').prop('checked', false);
    $("#author_lastname").val("");
    $("#author_lastnamem").val("");
    $("#author_name").val("");
    $("#buy_bet").val('NV').prop('selected', true);
    $('#buy_bet').trigger('change');
    $("#currency").val('NV').prop('selected', true);
    $('#currency').trigger('change');
    $("#currencyOrig").val("");
    //$("#description").val("");
    nicEditors.findEditor("description").setContent('');
    $("#ImageBtt").val("");
    $("#image").val("");
    $("#name").val("");
    $("#narrator").val("");
    $("#publication_date").val("");
    //$("#publisher").val('NV').prop('selected', true);
    //$('#publisher').trigger('change');
    //$( "#publisher" ).val("");
    //$( "#publisher" ).attr("data-value","");
    $("#publisher").val("");

    $("#single_price_law").val("N");
    $('#single_price_law').prop('checked', false);
    $("#sku").val("");
    $("#subtitle").val("");
    $("#supplier").val('NV').prop('selected', true);
    $('#supplier').trigger('change');
    $("#url").val("");

    //Estas listas van a ir de acuerdo a los roles, esta opcion se va a gregar despues
    $("#categories").val("");
    $("#CategoriesTB").val("");
    $("#Destiny").val("");
    $("#DestinyTB").val("");
    $("#ColofonDate").val("");

    $("#Additional_features").val("");
    $("#Ages").val("");

    //$("#Brand").val('NV').prop('selected', true);
    //$('#Brand').trigger('change');
    //$("#Manufacturer").val('NV').prop('selected', true);
    //$('#Manufacturer').trigger('change');

    //$( "#Brand" ).val("");
    //$( "#Brand" ).attr("data-value","");
    //$( "#Manufacturer" ).val("");
    //$( "#Manufacturer" ).attr("data-value","");

    $("#Brand").val("");
    $("#Manufacturer").val("");

    $("#director").val("");
    $("#Apellido_Director").val("");
    $("#Package").val("");
    $("#Rating").val('NV').prop('selected', true);
    $('#Rating').trigger('change');
    $("#artist").val("");
    $("#apellido_artista").val("");
    $("#Batteries").val("");
    $("#Bluetooth").val("N");
    $('#Bluetooth').prop('checked', false);
    $("#Customer_support").val("");
    $("#Material").val("");
    $("#Storage").val("");
    $("#Warranty").val("");
    $("#Waterproof").val("N");
    $('#Waterproof').prop('checked', false);
    $("#in_the_box").val("");
    $("#nb_pieces").val("");
    $("#wifi").val("N");
    $('#wifi').prop('checked', false);

    $("#bisac").val("");

    $("#CategoriesTB > tr").remove();
    $("#CategoriesTB tr").remove();
    $("#DestinyTB > tr").remove();
    $("#DestinyTB tr").remove();

    //$("#supplierID").val('NV').prop('selected', true);
    //$('#supplierID').trigger('change');

    $("#chanelmenu").empty();
    $('#image').val('');
    $("#coverimg" ).remove();
    $('#imagea').prepend('<img src="" id="coverimg">');

    funDisableElements();

    var canvas = document.getElementById("coverbook");
    var ctx = canvas.getContext("2d");

    var image = new Image();
    image.onload = function() {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, 1, 1);
    };
    image.src = "data:image/png;base64,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";
}

function funenableatts(AreaID){
    if(AreaID == "collapseaddgen"){
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUskua') !== "undefined") ? $("#sku").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUISBNa') !== "undefined") ? $("#ISBN").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUEANa') !== "undefined") ? $("#EAN").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUnamea') !== "undefined") ? $("#name").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUsubtitlea') !== "undefined") ? $("#subtitle").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUauthor_namea') !== "undefined") ? $("#author_name").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUauthor_lastnamea') !== "undefined") ? $("#author_lastname").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUauthor_lastnamema') !== "undefined") ? $("#author_lastnamem").prop('disabled', false) : null;
    }
    if(AreaID == "collapseaddedit"){
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUpublishera') !== "undefined") ? $("#publisher").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUCollectiona') !== "undefined") ? $("#Collection").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUEditiona') !== "undefined") ? $("#Edition").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUEditionTypea') !== "undefined") ? $("#EditionType").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUCountrya') !== "undefined") ? $("#Country").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUYeara') !== "undefined") ? $("#Year").prop('disabled', false) : null;
    }
    if(AreaID == "collapseaddchar"){
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUFormatsa') !== "undefined") ? $("#Formats").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AULanguagea') !== "undefined") ? $("#Language").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUWeighta') !== "undefined") ? $("#Weight").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUHeighta') !== "undefined") ? $("#Height").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUWidtha') !== "undefined") ? $("#Width").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AULenghta') !== "undefined") ? $("#Lenght").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUPagesa') !== "undefined") ? $("#Pages").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUStocka') !== "undefined") ? $("#Stock").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUpublication_datea') !== "undefined") ? $("#publication_date").prop('disabled', false) : null;
    }
    if(AreaID == "collapseaddprov"){
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUsuppliera') !== "undefined") ? $("#supplier").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUsupplierIDa') !== "undefined") ? $("#supplierID").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUcategoriesa') !== "undefined") ? $("#categories").prop('disabled', false) : null;
        if(typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUCategoriesTBa') !== "undefined"){
            $("#CategoriesTB").prop('disabled', false);
            $("#categoriesB").prop('disabled', false);
            $("#CategoriesTB tbody tr").each(function () {
                $("#BLOADT"+$(this).find("td").eq(0).text()).prop('disabled', false);
            });
        }
    }
    if(AreaID == "collapseaddcost"){
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUcurrencya') !== "undefined") ? $("#currency").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUPricea') !== "undefined") ? $("#Price").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUTaxa') !== "undefined") ? $("#Tax").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUDestinya') !== "undefined") ? $("#Destiny").prop('disabled', false) : null;
        if(typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUDestinyTBa') !== "undefined"){
            $("#DestinyTB").prop('disabled', false);
            $("#DestinyB").prop('disabled', false);
            $("#DestinyTB tbody tr").each(function () {
                $("#BLOADTC"+$(this).find("td").eq(0).text()).prop('disabled', false);
            });
        }
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUsingle_price_lawa') !== "undefined") ? $("#single_price_law").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUSATa') !== "undefined") ? $("#SAT").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUDiscounta') !== "undefined") ? $("#Discount").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUColofonDatea') !== "undefined") ? $("#ColofonDate").prop('disabled', false) : null;
    }
    if(AreaID == "collapseaddest"){
        if(typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUchanles') !== "undefined"){
            $("input[name='checkchanels']").attr("disabled", false);
        }
    }
    if(AreaID == "collapseaddoth"){
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUurla') !== "undefined") ? $("#url").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUSeriea') !== "undefined") ? $("#Serie").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AURun_timea') !== "undefined") ? $("#Run_time").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUbuy_beta') !== "undefined") ? $("#buy_bet").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUActive_IDa') !== "undefined") ? $("#Active_ID").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUTranslatora') !== "undefined") ? $("#Translator").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUnarratora') !== "undefined") ? $("#narrator").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUabridgeda') !== "undefined") ? $("#abridged").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUExtrasa') !== "undefined") ? $("#Extras").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUAdditional_featuresa') !== "undefined") ? $("#Additional_features").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUAgesa') !== "undefined") ? $("#Ages").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUBranda') !== "undefined") ? $("#Brand").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUManufacturera') !== "undefined") ? $("#Manufacturer").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUdirectora') !== "undefined") ? $("#director").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUApellido_Directora') !== "undefined") ? $("#Apellido_Director").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUPackagea') !== "undefined") ? $("#Package").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AURatinga') !== "undefined") ? $("#Rating").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUartista') !== "undefined") ? $("#artist").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUapellido_artistaa') !== "undefined") ? $("#apellido_artista").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUBatteriesa') !== "undefined") ? $("#Batteries").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUBluetootha') !== "undefined") ? $("#Bluetooth").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUCustomer_supporta') !== "undefined") ? $("#Customer_support").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUMateriala') !== "undefined") ? $("#Material").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUStoragea') !== "undefined") ? $("#Storage").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUWarrantya') !== "undefined") ? $("#Warranty").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUWaterproofa') !== "undefined") ? $("#Waterproof").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUin_the_boxa') !== "undefined") ? $("#in_the_box").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUnb_piecesa') !== "undefined") ? $("#nb_pieces").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUwifia') !== "undefined") ? $("#wifi").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUbisaca') !== "undefined") ? $("#bisac").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUImageBtta') !== "undefined") ? $("#ImageBtt").prop('disabled', false) : null;
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUimagea') !== "undefined") ? $("#image").prop('disabled', false) : null;
    }
    if(AreaID == "collapseaddsinop"){
        (typeof $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AUdescriptiona') !== "undefined") ? /*$("#description").prop('disabled', false)*/nicEditors.findEditor("description").enable() : null;
    }
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

function getCoverBook(SKU){
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "GET",
        crossDomain: true,
        url: `${URI}/getAkeneoCoverBookForGI/`+SKU,
        contentType: 'application/json',
        async: true,
        success: function (data){
            var canvas = document.getElementById("coverbook");
            var ctx = canvas.getContext("2d");

            var image = new Image();
            image.onload = function() {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0, image.width, image.height);
            };
            image.src = 'data:image/png;base64,'+data;
            $(".overlay").hide();
            return 'OK';
		},
        error: function(e){
            $(".overlay").hide();
            console.log(e)
        }
    });
}

async function getAllList(){
    axios.get(`${URI}/getAkeneoAllList/`, {
    responseType: 'json'
  })
    .then(function(res) {
      if(res.status==200) {
        var Data = res.data;
        $AllList.push(Data);
      }
    })
    .catch(function(err) {
      console.log(err);
    })
    .then(function() {
        var ObjParents = $AllList[0].Parents;
        for (var xpar in ObjParents){
            if (ObjParents[xpar].OptionType !== "publisher" && ObjParents[xpar].OptionType !== "Manufacturer" && ObjParents[xpar].OptionType !== "Brand"){
                $("<option value='NV'>Elija una opción</option>").appendTo("#"+ObjParents[xpar].OptionType);
                $("#"+ObjParents[xpar].OptionType).val('NV').prop('selected', true);
                for(var editx in $AllList[0][ObjParents[xpar].OptionType]){
                    $("<option value='"+$AllList[0][ObjParents[xpar].OptionType][editx].value+"'>"+$AllList[0][ObjParents[xpar].OptionType][editx].label+"</option>").appendTo("#"+ObjParents[xpar].OptionType);
                }
            }
        }

        /*$ObjPublishers = $AllList[0].publisher;
        $( "#publisher" ).autocomplete({
            source: $ObjPublishers,
            minLength: 3,
            focus: function( event, ui ) {
              $( "#publisher" ).val( ui.item.label );
              return false;
            },
            select: function( event, ui ) {
              $( "#publisher" ).val( ui.item.label );
              $( "#publisher" ).attr("data-value",ui.item.value);
              return false;
            }
        });
        $( "#publisher" ).attr("data-value","");
        $ObjManufacturer = $AllList[0].Manufacturer;
        $( "#Manufacturer" ).autocomplete({
            source: $ObjManufacturer,
            minLength: 3,
            focus: function( event, ui ) {
              $( "#Manufacturer" ).val( ui.item.label );
              return false;
            },
            select: function( event, ui ) {
              $( "#Manufacturer" ).val( ui.item.label );
              $( "#Manufacturer" ).attr("data-value",ui.item.value);
              return false;
            }
        });
        $( "#Manufacturer" ).attr("data-value","");
        $ObjBrand = $AllList[0].Brand;
        $( "#Brand" ).autocomplete({
            source: $ObjBrand,
            minLength: 3,
            focus: function( event, ui ) {
              $( "#Brand" ).val( ui.item.label );
              return false;
            },
            select: function( event, ui ) {
              $( "#Brand" ).val( ui.item.label );
              $( "#Brand" ).attr("data-value",ui.item.value);
              return false;
            }
        });
        $( "#Brand" ).attr("data-value","");*/
        $(".overlay").hide();
    });
}

async function getAllCategories(){
    axios.get(`${URI}/getAkeneoAllCategories/`, {
    responseType: 'json'
  })
    .then(function(res) {
      if(res.status==200) {
        var Data = res.data;
        $AllCategories.push(Data);
      }
    })
    .catch(function(err) {
      console.log(err);
    })
    .then(function() {
        var ObjCAT = $AllCategories[0].CAT;
        var ObjPRV = $AllCategories[0].PRV;
        for(var catx in ObjCAT){
            $("<option value='"+ObjCAT[catx].CatCode+"'>"+ObjCAT[catx].CatValue+"</option>").appendTo("#categories");
        }
        for(var catx in ObjPRV){
            $("<option value='"+ObjPRV[catx].CatCode+"'>"+ObjPRV[catx].CatValue+"</option>").appendTo("#supplier");
        }
        //$('#supplier').val(sessionStorage.getItem('UserIDProv')).prop('selected', true);
        //$('#supplier').trigger('change');
    });
    $(".overlay").hide();
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
            $(".overlay").show();
            for (var i in data) {
                switch(data[i].value){
                    case "accessories":
                        var ExistOp = $ProductPrivileges.find(opList => opList.PrivilegeID === "OTACC");
                        if(typeof ExistOp !== "undefined"){
                            executelistfamilies(data[i]);
                        }
                        break;
                    case "audio":
                        var ExistOp = $ProductPrivileges.find(opList => opList.PrivilegeID === "OTAUD");
                        if(typeof ExistOp !== "undefined"){
                            executelistfamilies(data[i]);
                        }
                        break;
                    case "books":
                        var ExistOp = $ProductPrivileges.find(opList => opList.PrivilegeID === "OTLIB");
                        if(typeof ExistOp !== "undefined"){
                            executelistfamilies(data[i]);
                        }
                        break;
                    case "video":
                        var ExistOp = $ProductPrivileges.find(opList => opList.PrivilegeID === "OTPRV");
                        if(typeof ExistOp !== "undefined"){
                            executelistfamilies(data[i]);
                        }
                        break;
                    case "virtual_products":
                        var ExistOp = $ProductPrivileges.find(opList => opList.PrivilegeID === "OTVID");
                        if(typeof ExistOp !== "undefined"){
                            executelistfamilies(data[i]);
                        }
                        break;
                    default:
                        break;
                }
            }
            $(".overlay").hide();
		},
        error: function(e){
            console.log(e)
        }
    });
}

function executelistfamilies(data){
    $("<option value='"+data.value+"'>"+data.label+"</option>").appendTo("#ItemType");
                
    var FamiliesObjectOption = {}

    for(j = 0; j < data.Att.length; j++){
        FamiliesObjectOption ={
            FamilieFather : data.value,
            FamilieOption : 'Att',
            FamilieValue : data.Att[j]
        }
        $FamiliesObject.push(FamiliesObjectOption);
    }
    FamiliesObjectOption = {}                
    for(x = 0; x < data.AttReq.length; x++){
        FamiliesObjectOption ={
            FamilieFather : data.value,
            FamilieOption : 'AttReq',
            FamilieValue : data.AttReq[x]
        }
        $FamiliesObject.push(FamiliesObjectOption);
    }
    FamiliesObjectOption = {}
}

async function funDisplayBtts(){
    for(obl = 0; obl < $ProductPrivilegesBtt.length; obl++){
        $("."+$ProductPrivilegesBtt[obl].PrivilegeID).css("display", "block");
        //$("."+$ProductPrivilegesBtt[obl].PrivilegeID).addClass("visible");
        //$("."+$ProductPrivilegesBtt[obl].PrivilegeID).addClass("display:inline-block");
    }
}

function funGetAttOptions(){
    funHideElements();
    var ListTypeOption = $("#ItemType option:selected").val();
    for(xi = 0; xi < $FamiliesObject.length; xi++){
        if ($FamiliesObject[xi].FamilieFather == ListTypeOption){
            if($FamiliesObject[xi].FamilieOption == 'Att'){

                if($FamiliesObject[xi].FamilieValue == "image"){
                    var ExistAtt = $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === "ACImageBtt");
                    if(typeof ExistAtt !== "undefined"){
                        document.getElementById('ImageBtt').style.display = 'block';
                    }
                }
                
                if($FamiliesObject[xi].FamilieValue == "supplier"){
                    //document.getElementById('supplierIDa').style.display = 'block';
                }

                if(typeof $('#'+$FamiliesObject[xi].FamilieValue+'a').val() !== "undefined"){
                    var ExistAtt = $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AC'+$FamiliesObject[xi].FamilieValue+'a');
                    if(typeof ExistAtt !== "undefined"){
                        document.getElementById($FamiliesObject[xi].FamilieValue+'a').style.display = 'block';
                        if($FamiliesObject[xi].FamilieValue === 'author_lastname'){
                            var ExistAttma = $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AC'+$FamiliesObject[xi].FamilieValue+'ma');
                            if(typeof ExistAttma !== "undefined"){
                                document.getElementById($FamiliesObject[xi].FamilieValue+'ma').style.display = 'block';
                            }
                        }
                    }
                }
            }else{
                //agregar required a campos
                if(typeof $('#'+$FamiliesObject[xi].FamilieValue+'l').val() !== "undefined"){
                    document.getElementById($FamiliesObject[xi].FamilieValue+'l').style.display = 'block';
                    if($FamiliesObject[xi].FamilieValue === 'author_lastname'){
                        document.getElementById($FamiliesObject[xi].FamilieValue+'ml').style.display = 'block';
                    }
                }
                //$('#'+$FamiliesObject[xi].FamilieValue).prop('required',true);
            }
        }
    }
    //Estas listas van a ir de acuerdo a los roles, esta opcion se va a gregar despues
    var ExistAttcat = $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'ACcategoriesa');
    if(typeof ExistAttcat !== "undefined"){
        document.getElementById('categoriesa').style.display = 'block';
    }
    var ExistAttcatta = $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'ACCategoriesTBa');
    if(typeof ExistAttcatta !== "undefined"){
        document.getElementById('CategoriesTBa').style.display = 'block';
    }
    //document.getElementById('Destinya').style.display = 'block';
    //document.getElementById('DestinyTBa').style.display = 'block';
    var ExistAttchan = $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'ACchanles');
    if(typeof ExistAttchan !== "undefined"){
        document.getElementById('chanles').style.display = 'block';
    }
    var ExistAttcdt = $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'ACColofonDatea');
    if(typeof ExistAttcdt !== "undefined"){
        document.getElementById('ColofonDatea').style.display = 'block';
    }
    var ExistAttcdt = $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'ACsuppliera');
    if(typeof ExistAttcdt !== "undefined"){
        document.getElementById('suppliera').style.display = 'block';
    }
    //
}

function funHideElements(){
    document.getElementById('Active_IDa').style.display = 'none';
    document.getElementById('Collectiona').style.display = 'none';
    document.getElementById('Countrya').style.display = 'none';
    document.getElementById('Discounta').style.display = 'none';
    document.getElementById('EANa').style.display = 'none';
    document.getElementById('Editiona').style.display = 'none';
    document.getElementById('EditionTypea').style.display = 'none';
    document.getElementById('Extrasa').style.display = 'none';
    document.getElementById('Formatsa').style.display = 'none';
    document.getElementById('Heighta').style.display = 'none';
    document.getElementById('ISBNa').style.display = 'none';
    document.getElementById('Languagea').style.display = 'none';
    document.getElementById('Lenghta').style.display = 'none';
    document.getElementById('Pagesa').style.display = 'none';
    document.getElementById('Pricea').style.display = 'none';
    document.getElementById('Run_timea').style.display = 'none';
    document.getElementById('SATa').style.display = 'none';
    document.getElementById('Seriea').style.display = 'none';
    document.getElementById('Stocka').style.display = 'none';
    document.getElementById('Taxa').style.display = 'none';
    document.getElementById('Translatora').style.display = 'none';
    document.getElementById('Weighta').style.display = 'none';
    document.getElementById('Widtha').style.display = 'none';
    document.getElementById('Yeara').style.display = 'none';
    document.getElementById('abridgeda').style.display = 'none';
    document.getElementById('author_lastnamea').style.display = 'none';
    document.getElementById('author_lastnamema').style.display = 'none';
    document.getElementById('author_namea').style.display = 'none';
    document.getElementById('buy_beta').style.display = 'none';
    document.getElementById('currencya').style.display = 'none';
    document.getElementById('descriptiona').style.display = 'none';
    document.getElementById('ImageBtt').style.display = 'none';
    document.getElementById('imagea').style.display = 'none';
    document.getElementById('namea').style.display = 'none';
    document.getElementById('narratora').style.display = 'none';
    document.getElementById('publication_datea').style.display = 'none';
    document.getElementById('publishera').style.display = 'none';
    document.getElementById('single_price_lawa').style.display = 'none';
    document.getElementById('skua').style.display = 'none';
    document.getElementById('subtitlea').style.display = 'none';
    document.getElementById('suppliera').style.display = 'none';
    document.getElementById('urla').style.display = 'none';

    //Estas listas van a ir de acuerdo a los roles, esta opcion se va a gregar despues
    document.getElementById('categoriesa').style.display = 'none';
    document.getElementById('CategoriesTBa').style.display = 'none';
    //document.getElementById('Destinya').style.display = 'none';
    //document.getElementById('DestinyTBa').style.display = 'none';
    document.getElementById('ColofonDatea').style.display = 'none';

    document.getElementById('Additional_featuresa').style.display = 'none';
    document.getElementById('Agesa').style.display = 'none';
    document.getElementById('Branda').style.display = 'none';
    document.getElementById('Manufacturera').style.display = 'none';
    document.getElementById('directora').style.display = 'none';
    document.getElementById('Apellido_Directora').style.display = 'none';
    document.getElementById('Packagea').style.display = 'none';
    document.getElementById('Ratinga').style.display = 'none';
    document.getElementById('artista').style.display = 'none';
    document.getElementById('apellido_artistaa').style.display = 'none';
    document.getElementById('Batteriesa').style.display = 'none';
    document.getElementById('Bluetootha').style.display = 'none';
    document.getElementById('Customer_supporta').style.display = 'none';
    document.getElementById('Materiala').style.display = 'none';
    document.getElementById('Storagea').style.display = 'none';
    document.getElementById('Warrantya').style.display = 'none';
    document.getElementById('Waterproofa').style.display = 'none';
    document.getElementById('in_the_boxa').style.display = 'none';
    document.getElementById('nb_piecesa').style.display = 'none';
    document.getElementById('wifia').style.display = 'none';

    document.getElementById('bisaca').style.display = 'none';

    //document.getElementById('supplierIDa').style.display = 'none';

    //Labels de campos necesarios (*) en rojo
    document.getElementById('Active_IDl').style.display = 'none';
    document.getElementById('Collectionl').style.display = 'none';
    document.getElementById('Countryl').style.display = 'none';
    document.getElementById('Discountl').style.display = 'none';
    document.getElementById('EANl').style.display = 'none';
    document.getElementById('Editionl').style.display = 'none';
    document.getElementById('EditionTypel').style.display = 'none';
    document.getElementById('Extrasl').style.display = 'none';
    document.getElementById('Formatsl').style.display = 'none';
    document.getElementById('Heightl').style.display = 'none';
    document.getElementById('ISBNl').style.display = 'none';
    document.getElementById('Languagel').style.display = 'none';
    document.getElementById('Lenghtl').style.display = 'none';
    document.getElementById('Pagesl').style.display = 'none';
    document.getElementById('Pricel').style.display = 'none';
    document.getElementById('Run_timel').style.display = 'none';
    document.getElementById('SATl').style.display = 'none';
    document.getElementById('Seriel').style.display = 'none';
    document.getElementById('Stockl').style.display = 'none';
    document.getElementById('Taxl').style.display = 'none';
    document.getElementById('Translatorl').style.display = 'none';
    document.getElementById('Weightl').style.display = 'none';
    document.getElementById('Widthl').style.display = 'none';
    document.getElementById('Yearl').style.display = 'none';
    document.getElementById('abridgedl').style.display = 'none';
    document.getElementById('author_lastnamel').style.display = 'none';
    document.getElementById('author_lastnameml').style.display = 'none';
    document.getElementById('author_namel').style.display = 'none';
    document.getElementById('buy_betl').style.display = 'none';
    document.getElementById('currencyl').style.display = 'none';
    document.getElementById('descriptionl').style.display = 'none';
    document.getElementById('imagel').style.display = 'none';
    document.getElementById('namel').style.display = 'none';
    document.getElementById('narratorl').style.display = 'none';
    document.getElementById('publication_datel').style.display = 'none';
    document.getElementById('publisherl').style.display = 'none';
    document.getElementById('single_price_lawl').style.display = 'none';
    document.getElementById('skul').style.display = 'none';
    document.getElementById('subtitlel').style.display = 'none';
    document.getElementById('supplierl').style.display = 'none';
    document.getElementById('urll').style.display = 'none';

    //Estas listas van a ir de acuerdo a los roles, esta opcion se va a gregar despues

    document.getElementById('Additional_featuresl').style.display = 'none';
    document.getElementById('Agesl').style.display = 'none';
    document.getElementById('Brandl').style.display = 'none';
    document.getElementById('Manufacturerl').style.display = 'none';
    document.getElementById('directorl').style.display = 'none';
    document.getElementById('Apellido_Directorl').style.display = 'none';
    document.getElementById('Packagel').style.display = 'none';
    document.getElementById('Ratingl').style.display = 'none';
    document.getElementById('artistl').style.display = 'none';
    document.getElementById('apellido_artistal').style.display = 'none';
    document.getElementById('Batteriesl').style.display = 'none';
    document.getElementById('Bluetoothl').style.display = 'none';
    document.getElementById('Customer_supportl').style.display = 'none';
    document.getElementById('Materiall').style.display = 'none';
    document.getElementById('Storagel').style.display = 'none';
    document.getElementById('Warrantyl').style.display = 'none';
    document.getElementById('Waterproofl').style.display = 'none';
    document.getElementById('in_the_boxl').style.display = 'none';
    document.getElementById('nb_piecesl').style.display = 'none';
    document.getElementById('wifil').style.display = 'none';

    document.getElementById('bisacl').style.display = 'none';
    //
}

function funGetSupCat(){
    var CategoriID = $("#supplier option:selected").val();
    //$("#supplierID").val(CategoriID+'_ID');
    //$('#supplierID').trigger('change');
}

function previewFile() {
    var imageSizeByte = document.querySelector('input[type=file]').files[0].size/1024;
    if(imageSizeByte <= 1024){
        const preview = document.querySelector('#coverimg');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);
        
        console.log(imageSizeByte);
        if (file) {
            reader.readAsDataURL(file);
            preview.onload = function(){
                console.log(this.width);
                console.log(this.height);
                if(this.width >= 690 && this.width <= 800 && this.height >= 840 && this.height <= 1200){
                    console.log("Dimensiones validas");
                }else{
                    $('#MessageModal').modal('toggle');
                    $('#MessageModal').modal('show');
                    $('#ModalTitle').text('Imagen no valida');
                    $('#ModalBody').text("Las dimensiones de la imagen no son validas, favor de elegir otra imagen.");
                    $('#image').val('');
                    $("#coverimg" ).remove();
                    $('#imagea').prepend('<img src="" id="coverimg">');
                }
            }
        }
    }else{
        $('#MessageModal').modal('toggle');
        $('#MessageModal').modal('show');
        $('#ModalTitle').text('Imagen no valida');
        $('#ModalBody').text("La imagen pesa mas de 1mb, favor de elegir otra.");
        $('#image').val('');
        $("#coverimg" ).remove();
        $('#imagea').prepend('<img src="" id="coverimg">');
    }
}

function getDataUrl(img) {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	canvas.width = img.width;
	canvas.height = img.height;
	ctx.drawImage(img, 0, 0);
	return canvas.toDataURL('image/jpeg');
}

function funCheckNeccesaryFields(){
    var ListTypeOption = $("#ItemType option:selected").val();
    var NotAllFields = 'N';
    var LeftFiels = [];
    for(xx = 0; xx < $FamiliesObject.length; xx++){
        if ($FamiliesObject[xx].FamilieFather == ListTypeOption){
            if($FamiliesObject[xx].FamilieOption == 'AttReq'){
                ($FamiliesObject[xx].FamilieValue == "Country" && $("#Country option:selected").val() == "NV" && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('País de Edición') : null;
                ($FamiliesObject[xx].FamilieValue == "Edition" && $("#Edition option:selected").val().trim() == "NV"  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Número de Edición') : null;
                ($FamiliesObject[xx].FamilieValue == "EditionType" && $("#EditionType option:selected").val().trim() == "NV"  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Tipo de Edicion') : null;
                ($FamiliesObject[xx].FamilieValue == "Formats" && $("#Formats option:selected").val().trim() == "NV"  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Formato') : null;
                ($FamiliesObject[xx].FamilieValue == "Language" && $("#Language option:selected").val().trim() == "NV"  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Idioma') : null;
                ($FamiliesObject[xx].FamilieValue == "SAT" && $("#SAT option:selected").val().trim() == "NV"  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('SAT') : null;
                ($FamiliesObject[xx].FamilieValue == "Stock" && $("#Stock option:selected").val() == "NV"  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Disponibilidad') : null;
                ($FamiliesObject[xx].FamilieValue == "buy_bet" && $("#buy_bet option:selected").val().trim() == "NV"  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Apuesta de Compra') : null;
                ($FamiliesObject[xx].FamilieValue == "currency" && $("#currency option:selected").val().trim() == "NV"  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Moneda') : null;
                //($FamiliesObject[xx].FamilieValue == "publisher" && $( "#publisher" ).attr("data-value").trim().length == 0) ? LeftFiels.push('Editorial') : null;
                ($FamiliesObject[xx].FamilieValue == "publisher" && document.getElementById('publisher').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Editorial') : null;
                //($FamiliesObject[xx].FamilieValue == "supplier" && $("#supplier option:selected").val().trim() == "NV"  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Proveedor') : null;
                //($FamiliesObject[xx].FamilieValue == "Brand" && $( "#Brand" ).attr("data-value").trim().length == 0) ? LeftFiels.push('Marca') : null;
                //($FamiliesObject[xx].FamilieValue == "Manufacturer" && $( "#Manufacturer" ).trim().length == 0) ? LeftFiels.push('Fabricante') : null;
                
                //const stylebrand = document.getElementById(''+($FamiliesObject[xx].FamilieValue+'a').style);
                ($FamiliesObject[xx].FamilieValue == "Brand" && document.getElementById('Brand').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Marca') : null;
                ($FamiliesObject[xx].FamilieValue == "Manufacturer" && document.getElementById('Manufacturer').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Fabricante') : null;

                ($FamiliesObject[xx].FamilieValue == "Rating" && $("#Rating option:selected").val().trim() == "NV"  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Clasificacion') : null;

                ($FamiliesObject[xx].FamilieValue == "Active_ID" && document.getElementById('Active_ID').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Active ID') : null;
                ($FamiliesObject[xx].FamilieValue == "Collection" && document.getElementById('Collection').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Colección') : null;
                ($FamiliesObject[xx].FamilieValue == "Discount" && document.getElementById('Discount').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Descuento de compra') : null;
                ($FamiliesObject[xx].FamilieValue == "EAN" && document.getElementById('EAN').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('EAN') : null;
                ($FamiliesObject[xx].FamilieValue == "Extras" && document.getElementById('Extras').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Contenido Extra') : null;
                ($FamiliesObject[xx].FamilieValue == "Height" && document.getElementById('Height').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Ancho') : null;
                ($FamiliesObject[xx].FamilieValue == "ISBN" && document.getElementById('ISBN').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('ISBN') : null;
                ($FamiliesObject[xx].FamilieValue == "Lenght" && document.getElementById('Lenght').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Espesor') : null;
                ($FamiliesObject[xx].FamilieValue == "Pages" && document.getElementById('Pages').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Páginas') : null;
                ($FamiliesObject[xx].FamilieValue == "Price" && document.getElementById('Price').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Precio Lista') : null;
                ($FamiliesObject[xx].FamilieValue == "Run_time" && document.getElementById('Run_time').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Duracion') : null;
                ($FamiliesObject[xx].FamilieValue == "Serie" && document.getElementById('Serie').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Serie') : null;
                //($FamiliesObject[xx].FamilieValue == "Tax" && document.getElementById('Tax').value.trim() === "") ? LeftFiels.push('Tax') : null;
                ($FamiliesObject[xx].FamilieValue == "Translator" && document.getElementById('Translator').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Traductor') : null;
                ($FamiliesObject[xx].FamilieValue == "Weight" && document.getElementById('Weight').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Peso') : null;
                ($FamiliesObject[xx].FamilieValue == "Width" && document.getElementById('Width').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Ancho') : null;
                ($FamiliesObject[xx].FamilieValue == "Year" && document.getElementById('Year').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Año de Edición') : null;
                //($FamiliesObject[xx].FamilieValue == "abridged" && document.getElementById('abridged').value.trim() === "") ? LeftFiels.push('abridged') : null;
                ($FamiliesObject[xx].FamilieValue == "author_lastname" && document.getElementById('author_lastname').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Apellido Autor') : null;
                ($FamiliesObject[xx].FamilieValue == "author_name" && document.getElementById('author_name').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Nombre Autor') : null;
                //($FamiliesObject[xx].FamilieValue == "description" && document.getElementById('description').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Sinopsis') : null;
                ($FamiliesObject[xx].FamilieValue == "name" && document.getElementById('name').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Título') : null;
                ($FamiliesObject[xx].FamilieValue == "narrator" && document.getElementById('narrator').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Narrador') : null;
                ($FamiliesObject[xx].FamilieValue == "publication_date" && document.getElementById('publication_date').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Fecha de publicación') : null;
                //($FamiliesObject[xx].FamilieValue == "single_price_law" && document.getElementById('single_price_law').value.trim() === "") ? LeftFiels.push('single_price_law') : null;
                ($FamiliesObject[xx].FamilieValue == "sku" && document.getElementById('sku').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Código de Barras') : null;
                ($FamiliesObject[xx].FamilieValue == "subtitle" && document.getElementById('subtitle').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Subtitulo') : null;
                ($FamiliesObject[xx].FamilieValue == "url" && document.getElementById('url').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Web') : null;
                //($FamiliesObject[xx].FamilieValue == "image" && document.getElementById("image").files.length <= 0) ? LeftFiels.push('Portada') : null;
                ($FamiliesObject[xx].FamilieValue == "Additional_features" && document.getElementById('Additional_features').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Especificaciones adicionales') : null;
                ($FamiliesObject[xx].FamilieValue == "Ages" && document.getElementById('Ages').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Edades') : null;
                ($FamiliesObject[xx].FamilieValue == "director" && document.getElementById('director').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Nombre Director') : null;
                ($FamiliesObject[xx].FamilieValue == "Apellido_Director" && document.getElementById('Apellido_Director').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Apellido Director') : null;
                ($FamiliesObject[xx].FamilieValue == "Package" && document.getElementById('Package').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Tipo de empaque') : null;
                ($FamiliesObject[xx].FamilieValue == "artist" && document.getElementById('artist').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Nombre Artista') : null;
                ($FamiliesObject[xx].FamilieValue == "apellido_artista" && document.getElementById('apellido_artista').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Apellido Artista') : null;
                ($FamiliesObject[xx].FamilieValue == "Batteries" && document.getElementById('Batteries').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Duracion de las baterias') : null;
                //($FamiliesObject[xx].FamilieValue == "Bluetooth" && document.getElementById('Bluetooth').value.trim() === "") ? LeftFiels.push('Bluetooth') : null;
                ($FamiliesObject[xx].FamilieValue == "Customer_support" && document.getElementById('Customer_support').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Atención a clientes') : null;
                ($FamiliesObject[xx].FamilieValue == "Material" && document.getElementById('Material').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Material') : null;
                ($FamiliesObject[xx].FamilieValue == "Storage" && document.getElementById('Storage').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Almacenamiento') : null;
                ($FamiliesObject[xx].FamilieValue == "Warranty" && document.getElementById('Warranty').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Garantia') : null;
                //($FamiliesObject[xx].FamilieValue == "Waterproof" && document.getElementById('Waterproof').value.trim() === "") ? LeftFiels.push('Waterproof') : null;
                ($FamiliesObject[xx].FamilieValue == "in_the_box" && document.getElementById('in_the_box').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Que hay en la caja') : null;
                ($FamiliesObject[xx].FamilieValue == "nb_pieces" && document.getElementById('nb_pieces').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Número de piezas') : null;

                ($FamiliesObject[xx].FamilieValue == "bisac" && document.getElementById('bisac').value.trim() === ""  && document.getElementById($FamiliesObject[xx].FamilieValue+"a").style.display == "block") ? LeftFiels.push('Categoria bisac') : null;
                //($FamiliesObject[xx].FamilieValue == "wifi" && document.getElementById('wifi').value.trim() === "") ? LeftFiels.push('wifi') : null;
                /*console.log($FamiliesObject[xx].FamilieValue);
                if(document.getElementById($FamiliesObject[xx].FamilieValue).hasAttribute('required') && ){
                    console.log($FamiliesObject[xx].FamilieValue);
                }*/
            }
        }
    }
    /*if (typeof $("#supplier option:selected").val() === "undefined" || $("#supplier option:selected").val() == '' || $("#supplier option:selected").val() == null || $("#supplier option:selected").val() == "NV"){
        LeftFiels.push('Proveedor');
    }*/

    var councat = 0;
    $("#CategoriesTB tbody tr").each(function () {
        councat+=1;
    });
    if (councat == 0){
        LeftFiels.push('Categorias');
    }

    (Object.keys(LeftFiels).length === 0) ? NotAllFields = 'N' : NotAllFields = 'Y' ;
    return [NotAllFields,LeftFiels];
}
function ShowProgressBar(){
    $(".overlay").show();
}
function funUploadAkeneo(){
    jQuery.support.cors = true;
    $('#UpdateModal').modal('hide');
    var ObjectElement = document.querySelectorAll('.MainBodyContent');
    hide(document.querySelectorAll('.MainBodyContent'));
    $(".overlay").show();
    if($("#ItemType option:selected").val() === "NV"){
        $(".overlay").hide();
        show(ObjectElement, 'inline-block');
        $('#MessageModal').modal('toggle');
        $('#MessageModal').modal('show');
        $('#ModalTitle').text('Falta informacion');
        $('#ModalBody').text('Favor de seleccionar un tipo de producto.');
    }else{
        var validationObject = funCheckNeccesaryFields();
        if(validationObject[0] === "Y"){
            $(".overlay").hide();
            show(ObjectElement, 'inline-block');
            $('#MessageModal').modal('toggle');
            $('#MessageModal').modal('show');
            $('#ModalTitle').text('Campos faltantes');
            $('#ModalBody').text('Favor de completar los siguientes campos marcados como requeridos: \n'+validationObject[1]);
        }else{
            var CategoriesListObject = [];
            var CounterB = 0;
            var BisacP = '';
            $("#CategoriesTB tbody tr").each(function () {
                CategoriesListObject.push($(this).find("td").eq(0).text());
                if (BisacP === 0){
                    BisacP = $(this).find("td").eq(0).text();
                }
                CounterB++;
            });
            //$("#DestinyTB tbody tr").each(function () {
            //    CategoriesListObject.push($(this).find("td").eq(0).text());
            //});
            $.each($("input[name='checkchanels']:checked"), function(){
                CategoriesListObject.push($(this).val());
            });
            /*if($("#supplier option:selected").val() !== "NV"){
                if (typeof $("#supplier option:selected").val() != "undefined"){
                    CategoriesListObject.push($("#supplier option:selected").val());
                }
            }*/

            if(sessionStorage.getItem('UserProv') == "N"){
                if($("#supplier option:selected").val() !== "NV"){
                    if (typeof $("#supplier option:selected").val() != "undefined"){
                        CategoriesListObject.push($("#supplier option:selected").val());
                    }
                }
            }else{
                CategoriesListObject.push(sessionStorage.getItem('UserIDProv'));
            }

            var jsonDataObject = new Object();
            /*if(typeof $( "#publisher" ).attr("data-value") !== "undefined"){
                ($( "#publisher" ).attr("data-value").trim().length > 0) ? jsonDataObject.Publisher = $( "#publisher" ).attr("data-value") : jsonDataObject.Publisher = "";
            }

            if(typeof $( "#Manufacturer" ).attr("data-value") !== "undefined"){
                ($( "#Manufacturer" ).attr("data-value").trim().length > 0) ? jsonDataObject.Manufacturer = $( "#Manufacturer" ).attr("data-value") : jsonDataObject.Manufacturer = "";
            }

            if(typeof $( "#Brand" ).attr("data-value") !== "undefined"){
                ($( "#Brand" ).attr("data-value").trim().length > 0) ? jsonDataObject.Brand = $( "#Brand" ).attr("data-value") : jsonDataObject.Brand = "";
            }*/

            jsonDataObject.Publisher = document.getElementById("publisher").value;
            jsonDataObject.Manufacturer = document.getElementById("Manufacturer").value;
            jsonDataObject.Brand = document.getElementById("Brand").value;

            ($("#Edition option:selected").val() !== "NV") ? jsonDataObject.Edition = $("#Edition option:selected").val() : jsonDataObject.Edition = "";
            ($("#EditionType option:selected").val() !== "NV") ? jsonDataObject.EditionType = $("#EditionType option:selected").val() : jsonDataObject.EditionType = "";
            ($("#Country option:selected").val() !== "NV") ? jsonDataObject.Country = $("#Country option:selected").val() : jsonDataObject.Country = "";
            ($("#Formats option:selected").val() !== "NV") ? jsonDataObject.Format = $("#Formats option:selected").val() : jsonDataObject.Format = "";
            ($("#Language option:selected").val() !== "NV") ? jsonDataObject.Language = $("#Language option:selected").val() : jsonDataObject.Language = "";
            ($("#Stock option:selected").val() !== "NV") ? jsonDataObject.Stock = $("#Stock option:selected").val() : jsonDataObject.Stock = "";
            //($("#supplier option:selected").val() !== "NV") ? jsonDataObject.Supplier = $("#supplier option:selected").val() : jsonDataObject.Supplier = "";
            ($("#currency option:selected").val() !== "NV") ? jsonDataObject.Currency = $("#currency option:selected").val() : jsonDataObject.Currency = "";
            ($("#SAT option:selected").val() !== "NV") ? jsonDataObject.SAT = $("#SAT option:selected").val() : jsonDataObject.SAT = "";
            ($("#buy_bet option:selected").val() !== "NV") ? jsonDataObject.BuyBet = $("#buy_bet option:selected").val() : jsonDataObject.BuyBet = "";
            jsonDataObject.ItemType = $("#ItemType option:selected").val();
            
            jsonDataObject.SKU = document.getElementById("sku").value;
            jsonDataObject.ISBN = document.getElementById("ISBN").value;
            jsonDataObject.EAN = document.getElementById("EAN").value;
            jsonDataObject.Title = document.getElementById("name").value;
            jsonDataObject.Subtitle = document.getElementById("subtitle").value;
            jsonDataObject.AuthName = document.getElementById("author_name").value;
            jsonDataObject.AuthLastName = document.getElementById("author_lastname").value.trim() + ' ' + document.getElementById("author_lastnamem").value.trim();
            jsonDataObject.Collection = document.getElementById("Collection").value;    
            jsonDataObject.Year = document.getElementById("Year").value;
            jsonDataObject.PublicationDate = document.getElementById("publication_date").value;    
            jsonDataObject.Weight = document.getElementById("Weight").value;
            jsonDataObject.Height = document.getElementById("Height").value;
            jsonDataObject.Width = document.getElementById("Width").value;
            jsonDataObject.Lenght = document.getElementById("Lenght").value;
            jsonDataObject.Pages = document.getElementById("Pages").value;
            var priceorigval;
            if (document.getElementById("PriceOrig").value === ""){
                priceorigval = 0;
            }else{
                priceorigval = document.getElementById("PriceOrig").value;
            }
            var newprice;
            if (document.getElementById("Price").value === ""){
                newprice = 0;
            }else{
                newprice = document.getElementById("Price").value;
            }

            var disctountval;
            if (document.getElementById("Discount").value === ""){
                disctountval = 0;
            }else{
                disctountval = document.getElementById("Discount").value;
            }
            jsonDataObject.Discount = disctountval;

            if (document.getElementById("PriceOrig").value !== document.getElementById("Price").value){
                var resultcheck = CheckChangePrice(document.getElementById("sku").value
                                                    ,'IG'
                                                    ,$("#supplier option:selected").val()
                                                    ,$("#supplier option:selected").text()
                                                    ,document.getElementById("name").value
                                                    ,document.getElementById("bisac").value
                                                    ,document.getElementById("author_name").value + ' ' + document.getElementById("author_lastname").value.trim() + ' ' + document.getElementById("author_lastnamem").value.trim() + ' ' + document.getElementById("director").value.trim() + ' ' + document.getElementById("Apellido_Director").value.trim() + ' ' + document.getElementById("artist").value.trim() + ' ' + document.getElementById("apellido_artista").value.trim()
                                                    ,sessionStorage.getItem('UserFName')
                                                    ,priceorigval
                                                    ,document.getElementById("currencyOrig").value
                                                    ,newprice
                                                    ,$("#currency option:selected").val()
                                                    ,sessionStorage.getItem('UserId')
                                                    ,$("#Formats option:selected").text(),
                                                    disctountval);
                
                var resultChanged = resultcheck[0].Result_v;
                if(resultcheck[0].Result_v === 1){
                    jsonDataObject.Price = newprice;
                }else{
                    jsonDataObject.Price = priceorigval;
                }
            }else{
                jsonDataObject.Price = priceorigval;
            }

            if($('input[name=Tax]:checked').length > 0){jsonDataObject.HaveTax = "Y";}else{jsonDataObject.HaveTax = "N";}
            if($('input[name=single_price_law]:checked').length > 0){jsonDataObject.single_price_law = "Y";}else{jsonDataObject.single_price_law = "N";}
            jsonDataObject.ColofonDate = document.getElementById("ColofonDate").value;
            jsonDataObject.Web = document.getElementById("url").value;
            jsonDataObject.Serie = document.getElementById("Serie").value;
            jsonDataObject.DurationTrack = document.getElementById("Run_time").value;
            jsonDataObject.ActiveID = document.getElementById("Active_ID").value;
            jsonDataObject.Translater = document.getElementById("Translator").value;
            jsonDataObject.Narrator = document.getElementById("narrator").value;
            if($('input[name=abridged]:checked').length > 0){jsonDataObject.abridged = "Y";}else{jsonDataObject.abridged = "N";}
            jsonDataObject.Extras = document.getElementById("Extras").value;
            //jsonDataObject.Sinopsis = document.getElementById("description").value;
            jsonDataObject.Sinopsis = $('#descriptiona').find('.nicEdit-main').html();
            
            

            jsonDataObject.CategorieList = CategoriesListObject;

            ($("#Rating option:selected").val() !== "NV") ? jsonDataObject.Rating = $("#Rating option:selected").val() : jsonDataObject.Rating = "";

            jsonDataObject.Additionalfeatures = document.getElementById("Additional_features").value;
            jsonDataObject.Ages = document.getElementById("Ages").value;
            
            jsonDataObject.Director = document.getElementById("director").value;
            jsonDataObject.DirectorLastName = document.getElementById("Apellido_Director").value;
            jsonDataObject.Package = document.getElementById("Package").value;
            jsonDataObject.Artist = document.getElementById("artist").value;
            jsonDataObject.ArtistLastName = document.getElementById("apellido_artista").value;
            jsonDataObject.Batteries = document.getElementById("Batteries").value;
            if($('input[name=Bluetooth]:checked').length > 0){jsonDataObject.Bluetooth = "Y";}else{jsonDataObject.Bluetooth = "N";}
            jsonDataObject.CustomerSupport = document.getElementById("Customer_support").value;
            jsonDataObject.Material = document.getElementById("Material").value;
            jsonDataObject.Storage = document.getElementById("Storage").value;
            jsonDataObject.Warranty = document.getElementById("Warranty").value;
            if($('input[name=Waterproof]:checked').length > 0){jsonDataObject.Waterproof = "Y";}else{jsonDataObject.Waterproof = "N";}
            jsonDataObject.InTheBox = document.getElementById("in_the_box").value;
            jsonDataObject.NbPieces = document.getElementById("nb_pieces").value;

            jsonDataObject.bisac = document.getElementById("bisac").value;
            if($('input[name=wifi]:checked').length > 0){jsonDataObject.wifi = "Y";}else{jsonDataObject.wifi = "N";}

            jsonDataObject.CreateDate = null;
            jsonDataObject.UpdateDate = null;

            if( document.getElementById("image").files.length > 0 ){
                const preview = document.querySelector('#coverimg');
                var canvas = document.createElement("canvas");
                canvas.width = preview.width;
                canvas.height = preview.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(preview, 0, 0);
                var dataURL = canvas.toDataURL("image/jpg");
                jsonDataObject.COVERSTRING = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
            }else{
                jsonDataObject.COVERSTRING = 'N';
            }

            jsonDataObject.Operation = "2";

            var jsonData = JSON.stringify(jsonDataObject);

            jQuery.support.cors = true;
            $.ajax({
                headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
                dataType: "JSON",
                type: "POST",
                crossDomain: true,
                url: `${URI}/postAkeneoItem/`,
                contentType: 'application/json',
                data: jsonData,
                async: true,
                success: function (data){
                    if(data[0] === 200 || data[0] === 204){
                        $("#SKUFS").val("");
                        $(".overlay").hide();
                        $('#MessageModal').modal('toggle');
                        $('#MessageModal').modal('show');
                        $('#ModalTitle').text('Actualizacion de producto existosa');
                        if (resultChanged === -1){
                            $('#ModalBody').text('El precio del articulo supera el 30% de diferencia, se envío a su autorización.');
                        }else if(resultChanged === -2){
                            $('#ModalBody').text('El precio del articulo es inferior al actual, se envío a su autorización.');
                        }else{
                            $('#ModalBody').text(data[1]);
                        }
                        
                        axios.post(`${URI}/Log/`, {
                            responseType: 'json',
                            data: {
                                USERID: sessionStorage.getItem('UserId'),
                                ACTIONDESC: 'Actualizo el producto ' + document.getElementById("sku").value + ', de tipo ' + $("#ItemType option:selected").text() + '.'
                                }
                        });
                        cleanData();
                    }else{
                        $(".overlay").hide();
                        show(ObjectElement, 'inline-block');
                        $('#MessageModal').modal('toggle');
                        $('#MessageModal').modal('show');
                        $('#ModalTitle').text('Fallo la actualizacion del producto');
                        $('#ModalBody').text(data[1]);
                    }
                },
                error: function(e){
                    $(".overlay").hide();
                    show(ObjectElement, 'inline-block');
                    $('#MessageModal').modal('toggle');
                    $('#MessageModal').modal('show');
                    $('#ModalTitle').text('Fallo la actualizacion del producto');
                    $('#ModalBody').text(e);
                }
            });
        }
    }
}

function getCategorieDesc(CategorieID){
    jQuery.support.cors = true;
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "GET",
        crossDomain: true,
        url: `${URI}/getAkeneoGetCategoriesDesc/`+CategorieID,
        contentType: 'application/json',
        async: true,
        success: function (data){
            AddCategoriesToTable(CategorieID,data.CatValue);
		},
        error: function(e){
            console.log(e);
        }
    });
}

function AddCategoriesToTable(CategorieCode, CategorieLabel){    
    $("#CategoriesTB tbody").append("<tr id ='CATROW" + CategorieCode + "'>"
    + "<td scope='row' id='CATROWCODE" + CategorieCode + "'>" +CategorieCode+ "</td>"
    + "<td scope='row' id='CATROWLABEL" + CategorieCode + "'>" +CategorieLabel+ "</td>"
    + "<td scope='row' id='CATROWBTT" + CategorieCode + "' align='center'><button class='btn buttonm-background buttonm-font-color buttonm' type='button' id='BLOADT"+CategorieCode+"' title='Detalle' disabled>Eliminar</button></td>"
    + "</tr>");

    $("#BLOADT"+CategorieCode).click(function() {
        $('#CATROW'+CategorieCode).remove();
    });
}

function AddNewCategorie(){
    var CategorieCode = $("#categories option:selected").val();
    var CategorieLabel = $("#categories option:selected").text();
    if (typeof CategorieCode === "undefined"){
        $('#MessageModal').modal('toggle');
        $('#MessageModal').modal('show');
        $('#ModalTitle').text('Adicion de categoria');
        $('#ModalBody').text('Favor de agregar una categoria valida.');
    }else{
        $("#CategoriesTB tbody").append("<tr id ='CATROW" + CategorieCode + "'>"
        + "<td scope='row' id='CATROWCODE" + CategorieCode + "'>" +CategorieCode+ "</td>"
        + "<td scope='row' id='CATROWLABEL" + CategorieCode + "'>" +CategorieLabel+ "</td>"
        + "<td scope='row' id='CATROWBTT" + CategorieCode + "' align='center'><button class='btn buttonm-background buttonm-font-color buttonm' type='button' id='BLOADT"+CategorieCode+"' title='Detalle'>Eliminar</button></td>"
        + "</tr>");
    
        $("#BLOADT"+CategorieCode).click(function() {
            $('#CATROW'+CategorieCode).remove();
        });
    }
}

function AddDestinyToTable(DestinyCode, DestinyLabel){    
    $("#DestinyTB tbody").append("<tr id ='DESROW" + DestinyCode + "'>"
    + "<td scope='row' id='DESROWCODE" + DestinyCode + "'>" +DestinyCode+ "</td>"
    + "<td scope='row' id='DESROWLABEL" + DestinyCode + "'>" +DestinyLabel+ "</td>"
    + "<td scope='row' id='DESROWBTT" + DestinyCode + "' align='center'><button class='btn buttonm-background buttonm-font-color buttonm' type='button' id='BLOADTC"+DestinyCode+"' title='Detalle' disabled>Eliminar</button></td>"
    + "</tr>");

    $("#BLOADTC"+DestinyCode).click(function() {
        $('#DESROW'+DestinyCode).remove();
    });
}

function AddNewDestiny(){
    var DestinyCode = $("#Destiny option:selected").val();
    var DestinyLabel = $("#Destiny option:selected").text();
    $("#DestinyTB tbody").append("<tr id ='DESROW" + DestinyCode + "'>"
    + "<td scope='row' id='DESROWCODE" + DestinyCode + "'>" +DestinyCode+ "</td>"
    + "<td scope='row' id='DESROWLABEL" + DestinyCode + "'>" +DestinyLabel+ "</td>"
    + "<td scope='row' id='DESROWBTT" + DestinyCode + "' align='center'><button class='btn buttonm-background buttonm-font-color buttonm' type='button' id='BLOADTC"+DestinyCode+"' title='Detalle'>Eliminar</button></td>"
    + "</tr>");

    $("#BLOADTC"+DestinyCode).click(function() {
        $('#DESROW'+DestinyCode).remove();
    });
}
function getCategories(Type){
    if(Type == 'CAT'){
        $("<option value='NV'>Elija una opción</option>").appendTo("#categories");
        $('#categories').val('NV').prop('selected', true);
    }else if(Type == 'CAT'){
        $("<option value='NV'>Elija una opción</option>").appendTo("#Destiny");
        $('#Destiny').val('NV').prop('selected', true);
    }
    
    jQuery.support.cors = true;
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "GET",
        crossDomain: true,
        url: `${URI}/getAkeneoGetCategoriesyID/`+Type,
        contentType: 'application/json',
        async: false,
        success: function (data){
            if(Type == 'CAT'){
                for (var i in data) {
                    $("<option value='"+data[i].CatCode+"'>"+data[i].CatValue+"</option>").appendTo("#categories");
                }
            }else if(Type == 'CHN'){
                for (var i in data) {
                    $("<option value='"+data[i].CatCode+"'>"+data[i].CatValue+"</option>").appendTo("#Destiny");
                }
            }else if(Type == 'PRV'){
                for (var i in data) {
                    $("<option value='"+data[i].CatCode+"'>"+data[i].CatValue+"</option>").appendTo("#categories");
                }
            }
		},
        error: function(e){
            console.log(e)
        }
    });
}

function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	
	return true;
}

function isCharacterKey(txt) {
    var characters = document.getElementById(txt).value;
    if (!/^[a-zA-Z]*$/g.test(characters)) {
        return false;
    }
    return true;
}

function fun_AllowOnlyAmountAndDot(txt)
{
    if(event.keyCode > 47 && event.keyCode < 58 || event.keyCode == 46)
    {
        var txtbx=document.getElementById(txt);
        var amount = document.getElementById(txt).value;
        var present=0;
        var count=0;

        if(amount.indexOf(".",present)||amount.indexOf(".",present+1));
        {
        }
        do
        {
        present=amount.indexOf(".",present);
        if(present!=-1)
        {
            count++;
            present++;
            }
        }
        while(present!=-1);
        if(present==-1 && amount.length==0 && event.keyCode == 46)
        {
            event.keyCode=0;
            return false;
        }

        if(count>=1 && event.keyCode == 46)
        {

            event.keyCode=0;
            return false;
        }
        if(count==1)
        {
        var lastdigits=amount.substring(amount.indexOf(".")+1,amount.length);
        if(lastdigits.length>=2)
                    {
                        event.keyCode=0;
                        return false;
                        }
        }
            return true;
    }
    else
    {
            event.keyCode=0;
            return false;
    }

}

function CheckChangePrice(SKU,ORIG,PROV,PROVDESC,TITLE,BISAC,AUTH,AREA,ACTPRI,ACTCUR,NEWPRI,NEWCUR,USERACT,FORMAT,DISCOUNT){
    var jsonDataObject = new Object();
    jsonDataObject.SKU = SKU;
    jsonDataObject.ORIG = ORIG;
    jsonDataObject.PROV = PROV;
    jsonDataObject.PROVDESC = PROVDESC;
    jsonDataObject.TITULO = TITLE;
    jsonDataObject.BISAC = BISAC;
    jsonDataObject.AUTH = AUTH;
    jsonDataObject.AREA = AREA;
    jsonDataObject.ACTPRI = ACTPRI;
    jsonDataObject.ACTCUR = ACTCUR;
    jsonDataObject.NEWPRI = NEWPRI;
    jsonDataObject.NEWCUR = NEWCUR;
    jsonDataObject.USUARIO = USERACT;
    jsonDataObject.FORMAT = FORMAT;
    jsonDataObject.DISCOUNT = DISCOUNT;
    var jsonData = JSON.stringify(jsonDataObject);
    var response;
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "POST",
        crossDomain: true,
        url: `${URI}/checkChangePriceAuth/`,
        contentType: 'application/json',
        data: jsonData,
        async: false,
        success: function (data){
            response = data;
        },
        error: function(e){
            console.log(e)
        }
    });
    return response;
}

function hoverbuttonscolors(){
    var buttonOPGEN = document.querySelector('.OPGEN');
    var buttonOPEDIC = document.querySelector('.OPEDIC');
    var buttonOPCHAR = document.querySelector('.OPCHAR');
    var buttonOPPRCLA = document.querySelector('.OPPRCLA');
    var buttonOPCOIMP = document.querySelector('.OPCOIMP');
    var buttonOPDES = document.querySelector('.OPDES');
    var buttonOPOTH = document.querySelector('.OPOTH');
    var buttonOPSINP = document.querySelector('.OPSINP');

    buttonOPGEN.onclick = function () {
        if($buttonOPGEN === 0){
            $buttonOPGEN = 1;
            this.style.backgroundColor = "#711a82";
        }else{
            $buttonOPGEN = 0;
            this.style.backgroundColor = "#a91ec4";
        }
    };
    buttonOPEDIC.onclick = function () {
        if($buttonOPEDIC === 0){
            $buttonOPEDIC = 1;
            this.style.backgroundColor = "#711a82";
        }else{
            $buttonOPEDIC = 0;
            this.style.backgroundColor = "#a91ec4";
        }
    };
    buttonOPCHAR.onclick = function () {
        if($buttonOPCHAR === 0){
            $buttonOPCHAR = 1;
            this.style.backgroundColor = "#711a82";
        }else{
            $buttonOPCHAR = 0;
            this.style.backgroundColor = "#a91ec4";
        }
    };
    buttonOPPRCLA.onclick = function () {
        if($buttonOPPRCLA === 0){
            $buttonOPPRCLA = 1;
            this.style.backgroundColor = "#711a82";
        }else{
            $buttonOPPRCLA = 0;
            this.style.backgroundColor = "#a91ec4";
        }
    };
    buttonOPCOIMP.onclick = function () {
        if($buttonOPCOIMP === 0){
            $buttonOPCOIMP = 1;
            this.style.backgroundColor = "#711a82";
        }else{
            $buttonOPCOIMP = 0;
            this.style.backgroundColor = "#a91ec4";
        }
    };
    buttonOPDES.onclick = function () {
        if($buttonOPDES === 0){
            $buttonOPDES = 1;
            this.style.backgroundColor = "#711a82";
        }else{
            $buttonOPDES = 0;
            this.style.backgroundColor = "#a91ec4";
        }
    };
    buttonOPOTH.onclick = function () {
        if($buttonOPOTH === 0){
            $buttonOPOTH = 1;
            this.style.backgroundColor = "#711a82";
        }else{
            $buttonOPOTH = 0;
            this.style.backgroundColor = "#a91ec4";
        }
    };
    buttonOPSINP.onclick = function () {
        if($buttonOPSINP === 0){
            $buttonOPSINP = 1;
            this.style.backgroundColor = "#711a82";
        }else{
            $buttonOPSINP = 0;
            this.style.backgroundColor = "#a91ec4";
        }
    };
}

function funDisableCopyCutPaste(){
    $('#Active_IDa').on("cut copy paste",function(e){e.preventDefault();});
    $('#Collectiona').on("cut copy paste",function(e){e.preventDefault();});
    $('#Countrya').on("cut copy paste",function(e){e.preventDefault();});
    $('#Discounta').on("cut copy paste",function(e){e.preventDefault();});
    $('#EANa').on("cut copy paste",function(e){e.preventDefault();});
    $('#Editiona').on("cut copy paste",function(e){e.preventDefault();});
    $('#EditionTypea').on("cut copy paste",function(e){e.preventDefault();});
    $('#Extrasa').on("cut copy paste",function(e){e.preventDefault();});
    $('#Formatsa').on("cut copy paste",function(e){e.preventDefault();});
    $('#Heighta').on("cut copy paste",function(e){e.preventDefault();});
    $('#ISBNa').on("cut copy paste",function(e){e.preventDefault();});
    $('#Languagea').on("cut copy paste",function(e){e.preventDefault();});
    $('#Lenghta').on("cut copy paste",function(e){e.preventDefault();});
    $('#Pagesa').on("cut copy paste",function(e){e.preventDefault();});
    $('#Pricea').on("cut copy paste",function(e){e.preventDefault();});
    $('#Run_timea').on("cut copy paste",function(e){e.preventDefault();});
    $('#SATa').on("cut copy paste",function(e){e.preventDefault();});
    $('#Seriea').on("cut copy paste",function(e){e.preventDefault();});
    $('#Stocka').on("cut copy paste",function(e){e.preventDefault();});
    $('#Taxa').on("cut copy paste",function(e){e.preventDefault();});
    $('#Translatora').on("cut copy paste",function(e){e.preventDefault();});
    $('#Weighta').on("cut copy paste",function(e){e.preventDefault();});
    $('#Widtha').on("cut copy paste",function(e){e.preventDefault();});
    $('#Yeara').on("cut copy paste",function(e){e.preventDefault();});
    $('#abridgeda').on("cut copy paste",function(e){e.preventDefault();});
    $('#author_lastnamea').on("cut copy paste",function(e){e.preventDefault();});
    $('#author_lastnamema').on("cut copy paste",function(e){e.preventDefault();});
    $('#author_namea').on("cut copy paste",function(e){e.preventDefault();});
    $('#buy_beta').on("cut copy paste",function(e){e.preventDefault();});
    $('#currencya').on("cut copy paste",function(e){e.preventDefault();});
    //$('#descriptiona').on("cut copy paste",function(e){e.preventDefault();});
    $('#ImageBtt').on("cut copy paste",function(e){e.preventDefault();});
    $('#imagea').on("cut copy paste",function(e){e.preventDefault();});
    $('#namea').on("cut copy paste",function(e){e.preventDefault();});
    $('#narratora').on("cut copy paste",function(e){e.preventDefault();});
    $('#publication_datea').on("cut copy paste",function(e){e.preventDefault();});
    $('#publishera').on("cut copy paste",function(e){e.preventDefault();});
    $('#single_price_lawa').on("cut copy paste",function(e){e.preventDefault();});
    $('#skua').on("cut copy paste",function(e){e.preventDefault();});
    $('#subtitlea').on("cut copy paste",function(e){e.preventDefault();});
    $('#suppliera').on("cut copy paste",function(e){e.preventDefault();});
    $('#urla').on("cut copy paste",function(e){e.preventDefault();});
    $('#categoriesa').on("cut copy paste",function(e){e.preventDefault();});
    $('#CategoriesTBa').on("cut copy paste",function(e){e.preventDefault();});
    $('#chanles').on("cut copy paste",function(e){e.preventDefault();});
    $('#ColofonDatea').on("cut copy paste",function(e){e.preventDefault();});
    $('#Additional_featuresa').on("cut copy paste",function(e){e.preventDefault();});
    $('#Agesa').on("cut copy paste",function(e){e.preventDefault();});
    $('#Branda').on("cut copy paste",function(e){e.preventDefault();});
    $('#Manufacturera').on("cut copy paste",function(e){e.preventDefault();});
    $('#directora').on("cut copy paste",function(e){e.preventDefault();});
    $('#Apellido_Directora').on("cut copy paste",function(e){e.preventDefault();});
    $('#Packagea').on("cut copy paste",function(e){e.preventDefault();});
    $('#Ratinga').on("cut copy paste",function(e){e.preventDefault();});
    $('#artista').on("cut copy paste",function(e){e.preventDefault();});
    $('#apellido_artistaa').on("cut copy paste",function(e){e.preventDefault();});
    $('#Batteriesa').on("cut copy paste",function(e){e.preventDefault();});
    $('#Bluetootha').on("cut copy paste",function(e){e.preventDefault();});
    $('#Customer_supporta').on("cut copy paste",function(e){e.preventDefault();});
    $('#Materiala').on("cut copy paste",function(e){e.preventDefault();});
    $('#Storagea').on("cut copy paste",function(e){e.preventDefault();});
    $('#Warrantya').on("cut copy paste",function(e){e.preventDefault();});
    $('#Waterproofa').on("cut copy paste",function(e){e.preventDefault();});
    $('#in_the_boxa').on("cut copy paste",function(e){e.preventDefault();});
    $('#nb_piecesa').on("cut copy paste",function(e){e.preventDefault();});
    $('#wifia').on("cut copy paste",function(e){e.preventDefault();});
    $('#bisaca').on("cut copy paste",function(e){e.preventDefault();});
    $('#Active_IDl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Collectionl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Countryl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Discountl').on("cut copy paste",function(e){e.preventDefault();});
    $('#EANl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Editionl').on("cut copy paste",function(e){e.preventDefault();});
    $('#EditionTypel').on("cut copy paste",function(e){e.preventDefault();});
    $('#Extrasl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Formatsl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Heightl').on("cut copy paste",function(e){e.preventDefault();});
    $('#ISBNl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Languagel').on("cut copy paste",function(e){e.preventDefault();});
    $('#Lenghtl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Pagesl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Pricel').on("cut copy paste",function(e){e.preventDefault();});
    $('#Run_timel').on("cut copy paste",function(e){e.preventDefault();});
    $('#SATl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Seriel').on("cut copy paste",function(e){e.preventDefault();});
    $('#Stockl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Taxl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Translatorl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Weightl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Widthl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Yearl').on("cut copy paste",function(e){e.preventDefault();});
    $('#abridgedl').on("cut copy paste",function(e){e.preventDefault();});
    $('#author_lastnamel').on("cut copy paste",function(e){e.preventDefault();});
    $('#author_lastnameml').on("cut copy paste",function(e){e.preventDefault();});
    $('#author_namel').on("cut copy paste",function(e){e.preventDefault();});
    $('#buy_betl').on("cut copy paste",function(e){e.preventDefault();});
    $('#currencyl').on("cut copy paste",function(e){e.preventDefault();});
    $('#descriptionl').on("cut copy paste",function(e){e.preventDefault();});
    $('#imagel').on("cut copy paste",function(e){e.preventDefault();});
    $('#namel').on("cut copy paste",function(e){e.preventDefault();});
    $('#narratorl').on("cut copy paste",function(e){e.preventDefault();});
    $('#publication_datel').on("cut copy paste",function(e){e.preventDefault();});
    $('#publisherl').on("cut copy paste",function(e){e.preventDefault();});
    $('#single_price_lawl').on("cut copy paste",function(e){e.preventDefault();});
    $('#skul').on("cut copy paste",function(e){e.preventDefault();});
    $('#subtitlel').on("cut copy paste",function(e){e.preventDefault();});
    $('#supplierl').on("cut copy paste",function(e){e.preventDefault();});
    $('#urll').on("cut copy paste",function(e){e.preventDefault();});

    //Estas listas van a ir de acuerdo a los roles, esta opcion se va a gregar despues

    $('#Additional_featuresl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Agesl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Brandl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Manufacturerl').on("cut copy paste",function(e){e.preventDefault();});
    $('#directorl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Apellido_Directorl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Packagel').on("cut copy paste",function(e){e.preventDefault();});
    $('#Ratingl').on("cut copy paste",function(e){e.preventDefault();});
    $('#artistl').on("cut copy paste",function(e){e.preventDefault();});
    $('#apellido_artistal').on("cut copy paste",function(e){e.preventDefault();});
    $('#Batteriesl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Bluetoothl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Customer_supportl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Materiall').on("cut copy paste",function(e){e.preventDefault();});
    $('#Storagel').on("cut copy paste",function(e){e.preventDefault();});
    $('#Warrantyl').on("cut copy paste",function(e){e.preventDefault();});
    $('#Waterproofl').on("cut copy paste",function(e){e.preventDefault();});
    $('#in_the_boxl').on("cut copy paste",function(e){e.preventDefault();});
    $('#nb_piecesl').on("cut copy paste",function(e){e.preventDefault();});
    $('#wifil').on("cut copy paste",function(e){e.preventDefault();});
    $('#bisacl').on("cut copy paste",function(e){e.preventDefault();});
}