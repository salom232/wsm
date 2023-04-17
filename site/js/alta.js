$(document).ready(async function() {
    $codebar13 = "";
    $AllList = [];
    $AllCategories = [];
    $AllChannels = [];
    $buttonOPGEN = 0;
    $buttonOPEDIC = 0;
    $buttonOPCHAR = 0;
    $buttonOPPRCLA = 0;
    $buttonOPCOIMP = 0;
    $buttonOPDES = 0;
    $buttonOPOTH = 0;
    $buttonOPSINP= 0;
    validateSKU();
    validateISBN();
    validateEAN();
    getListFamilies();
    funDisplayBtts();
    getAllCategories();
    let resultlist = await getAllList();
    $('.select2-plug').select2({
		theme: 'bootstrap4',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
        placeholder: $(this).data('placeholder'),
        allowClear: Boolean($(this).data('allow-clear')),
        
    });

    $("#Year").inputmask("9999",{ "clearIncomplete": true });
    $("#publication_date").inputmask("9999-99-99",{ "clearIncomplete": true });

    $('#datepick input').datepicker({
        format: "yyyy-mm-dd",
        language: "es",
        multidate: true,
        calendarWeeks: true
    });
    $('.tog').bootstrapToggle();
    hoverbuttonscolors();
    axios.post(`${URI}/Log/`, {
        responseType: 'json',
        data: {
            USERID: sessionStorage.getItem('UserId'),
            ACTIONDESC: 'Entro a sección ALTA.'
            }
    });

    funDisableCopyCutPaste();
});

async function getAllList(){
    $(".overlay").show();
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

        /*ObjPublishers = $AllList[0].publisher;
        $( "#publisher" ).autocomplete({
            source: ObjPublishers,
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
        ObjManufacturer = $AllList[0].Manufacturer;
        $( "#Manufacturer" ).autocomplete({
            source: ObjManufacturer,
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
        ObjBrand = $AllList[0].Brand;
        $( "#Brand" ).autocomplete({
            source: ObjBrand,
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
        getAkeneoChanels();
    });
}

async function getAllCategories(){
    $(".overlay").show();
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
        $('#supplier').val(sessionStorage.getItem('UserIDProv')).prop('selected', true);
        $('#supplier').trigger('change');
        $(".overlay").hide();
    });
}

async function getAkeneoChanels(){
    $(".overlay").show();
    axios.get(`${URI}/getAkeneoChanels/`, {
    responseType: 'json'
  })
    .then(function(res) {
      if(res.status==200) {
        var Data = res.data;
        $AllChannels.push(Data);
      }
    })
    .catch(function(err) {
      console.log(err);
    })
    .then(function() {
		var menuhtml = "";
		var ObjectData = [];
		menuhtml = '<ul id="Chanels"><li><span class="caret"><i class="bi bi-journals"></i>CANALES GANDHI</span><ul class="nested"';
		
		var ObjectData = $AllChannels[0];
		
		for(var l1 in ObjectData.ObjectByLevel1){
			var father1 = ObjectData.ObjectByLevel1[l1].CodeOp;
			menuhtml = menuhtml + '<li><span class="caret"></span>&nbsp;<input class="form-check-input" type="checkbox" value="'+ObjectData.ObjectByLevel1[l1].CodeOp+'" id="'+ObjectData.ObjectByLevel1[l1].CodeOp+'" name="checkchanels">&nbsp;<i class="bi bi-journals"></i>&nbsp;'+ObjectData.ObjectByLevel1[l1].DesOp+'<ul class="nested">';
			for(var l2 in ObjectData.ObjectByLevel2){
				if(ObjectData.ObjectByLevel2[l2].Father === father1){
					var father2 = ObjectData.ObjectByLevel2[l2].CodeOp;
					menuhtml = menuhtml + '<li><span class="caret"></span>&nbsp;<input class="form-check-input" type="checkbox" value="'+ObjectData.ObjectByLevel2[l2].CodeOp+'" id="'+ObjectData.ObjectByLevel2[l2].CodeOp+'" name="checkchanels">&nbsp;<i class="bi bi-journals"></i>&nbsp;'+ObjectData.ObjectByLevel2[l2].DesOp+'<ul class="nested">';
					for(var l3 in ObjectData.ObjectByLevel3){
						if(ObjectData.ObjectByLevel3[l3].Father === father2){
							menuhtml = menuhtml + '<li>&nbsp;<input class="form-check-input" type="checkbox" value="'+ObjectData.ObjectByLevel3[l3].CodeOp+'" id="'+ObjectData.ObjectByLevel3[l3].CodeOp+'" name="checkchanels">&nbsp;<i class="bi bi-journals"></i>&nbsp;'+ObjectData.ObjectByLevel3[l3].DesOp+'</li>';
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
    });
    $(".overlay").hide();
}

async function getListFamilies(){
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
    }
}

function funGetAttOptions(){
    funHideElements();
    var ListTypeOption = $("#ItemType option:selected").val();
    for(xi = 0; xi < $FamiliesObject.length; xi++){
        if ($FamiliesObject[xi].FamilieFather == ListTypeOption){
            if($FamiliesObject[xi].FamilieOption == 'Att'){

                if($FamiliesObject[xi].FamilieValue == "image"){
                    var ExistAtt = $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === "AAImageBtt");
                    if(typeof ExistAtt !== "undefined"){
                        document.getElementById('ImageBtt').style.display = 'block';
                    }
                }
                
                if($FamiliesObject[xi].FamilieValue == "supplier"){
                }

                if(typeof $('#'+$FamiliesObject[xi].FamilieValue+'a').val() !== "undefined"){
                    var ExistAtt = $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AA'+$FamiliesObject[xi].FamilieValue+'a');
                    if(typeof ExistAtt !== "undefined"){
                        document.getElementById($FamiliesObject[xi].FamilieValue+'a').style.display = 'block';
                        if($FamiliesObject[xi].FamilieValue === 'author_lastname'){
                            var ExistAttma = $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AA'+$FamiliesObject[xi].FamilieValue+'ma');
                            if(typeof ExistAttma !== "undefined"){
                                document.getElementById($FamiliesObject[xi].FamilieValue+'ma').style.display = 'block';
                            }
                        }
                        if($FamiliesObject[xi].FamilieValue === 'Apellido_Director'){
                            var ExistAttma = $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AA'+$FamiliesObject[xi].FamilieValue+'ma');
                            if(typeof ExistAttma !== "undefined"){
                                document.getElementById($FamiliesObject[xi].FamilieValue+'ma').style.display = 'block';
                            }
                        }
                        if($FamiliesObject[xi].FamilieValue === 'apellido_artista'){
                            var ExistAttma = $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AA'+$FamiliesObject[xi].FamilieValue+'ma');
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
                    if($FamiliesObject[xi].FamilieValue === 'Apellido_Director'){
                        document.getElementById($FamiliesObject[xi].FamilieValue+'ml').style.display = 'block';
                    }
                    if($FamiliesObject[xi].FamilieValue === 'apellido_artista'){
                        document.getElementById($FamiliesObject[xi].FamilieValue+'ml').style.display = 'block';
                    }
                }
            }
        }
    }
    //Estas listas van a ir de acuerdo a los roles, esta opcion se va a gregar despues
    var ExistAttcat = $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AAcategoriesa');
    if(typeof ExistAttcat !== "undefined"){
        document.getElementById('categoriesa').style.display = 'block';
    }
    var ExistAttcatta = $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AACategoriesTBa');
    if(typeof ExistAttcatta !== "undefined"){
        document.getElementById('CategoriesTBa').style.display = 'block';
    }
    var ExistAttchan = $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AAchanles');
    if(typeof ExistAttchan !== "undefined"){
        document.getElementById('chanles').style.display = 'block';
    }
    var ExistAttcdt = $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AAColofonDatea');
    if(typeof ExistAttcdt !== "undefined"){
        document.getElementById('ColofonDatea').style.display = 'block';
    }
    var ExistAttcdt = $ProductPrivilegesAtt.find(opAtt => opAtt.PrivilegeID === 'AAsuppliera');
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
    document.getElementById('chanles').style.display = 'none';
    
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

function previewFile() {
    var imageSizeByte = document.querySelector('input[type=file]').files[0].size/1024;
    if(imageSizeByte <= 1024){
        const preview = document.querySelector('#coverimg');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);
        
        if (file) {
            reader.readAsDataURL(file);
            preview.onload = function(){
                if(this.width >= 690 && this.width <= 800 && this.height >= 840 && this.height <= 1200){
                }else{
                    $('#MessageModal').modal('toggle');
                    $('#MessageModal').modal('show');
                    $('#ModalTitle').text('Imagen no válida');
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
        $('#ModalTitle').text('Imagen no válida');
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

async function funCheckNeccesaryFields(){
    var ListTypeOption = $("#ItemType option:selected").val();
    var NotAllFields = 'N';
    var LeftFiels = [];
    for(xx = 0; xx < $FamiliesObject.length; xx++){
        if ($FamiliesObject[xx].FamilieFather == ListTypeOption){
            if($FamiliesObject[xx].FamilieOption == 'AttReq'){
                ($FamiliesObject[xx].FamilieValue == "Country" && $("#Country option:selected").val() == "NV") ? LeftFiels.push('País de Edición') : null;
                ($FamiliesObject[xx].FamilieValue == "Edition" && $("#Edition option:selected").val().trim() == "NV" ) ? LeftFiels.push('Número de Edición') : null;
                ($FamiliesObject[xx].FamilieValue == "EditionType" && $("#EditionType option:selected").val().trim() == "NV" ) ? LeftFiels.push('Tipo de Edicion') : null;
                ($FamiliesObject[xx].FamilieValue == "Formats" && $("#Formats option:selected").val().trim() == "NV" ) ? LeftFiels.push('Formato') : null;
                ($FamiliesObject[xx].FamilieValue == "Language" && $("#Language option:selected").val().trim() == "NV" ) ? LeftFiels.push('Idioma') : null;
                ($FamiliesObject[xx].FamilieValue == "SAT" && $("#SAT option:selected").val().trim() == "NV" ) ? LeftFiels.push('SAT') : null;
                ($FamiliesObject[xx].FamilieValue == "Stock" && $("#Stock option:selected").val() == "NV" ) ? LeftFiels.push('Disponibilidad') : null;
                ($FamiliesObject[xx].FamilieValue == "buy_bet" && $("#buy_bet option:selected").val().trim() == "NV" ) ? LeftFiels.push('Apuesta de Compra') : null;
                ($FamiliesObject[xx].FamilieValue == "currency" && $("#currency option:selected").val().trim() == "NV" ) ? LeftFiels.push('Moneda') : null;
                //($FamiliesObject[xx].FamilieValue == "publisher" && $( "#publisher" ).attr("data-value").trim().length == 0) ? LeftFiels.push('Editorial') : null;
                ($FamiliesObject[xx].FamilieValue == "publisher" && document.getElementById('publisher').value.trim() === "" ) ? LeftFiels.push('Editorial') : null;
                //($FamiliesObject[xx].FamilieValue == "supplier" && $("#supplier option:selected").val().trim() == "NV" ) ? LeftFiels.push('Proveedor') : null;
                //($FamiliesObject[xx].FamilieValue == "Brand" && $( "#Brand" ).attr("data-value").trim().length == 0) ? LeftFiels.push('Marca') : null;
                //($FamiliesObject[xx].FamilieValue == "Manufacturer" && $( "#Manufacturer" ).trim().length == 0) ? LeftFiels.push('Fabricante') : null;
                ($FamiliesObject[xx].FamilieValue == "Brand" && document.getElementById('Brand').value.trim() === "" ) ? LeftFiels.push('Marca') : null;
                ($FamiliesObject[xx].FamilieValue == "Manufacturer" && document.getElementById('Manufacturer').value.trim() === "" ) ? LeftFiels.push('Fabricante') : null;

                ($FamiliesObject[xx].FamilieValue == "Rating" && $("#Rating option:selected").val().trim() == "NV" ) ? LeftFiels.push('Clasificacion') : null;

                ($FamiliesObject[xx].FamilieValue == "Active_ID" && document.getElementById('Active_ID').value.trim() === "" ) ? LeftFiels.push('Active ID') : null;
                ($FamiliesObject[xx].FamilieValue == "Collection" && document.getElementById('Collection').value.trim() === "" ) ? LeftFiels.push('Colección') : null;
                ($FamiliesObject[xx].FamilieValue == "Discount" && document.getElementById('Discount').value.trim() === "" ) ? LeftFiels.push('Descuento de compra') : null;
                ($FamiliesObject[xx].FamilieValue == "EAN" && document.getElementById('EAN').value.trim() === "" ) ? LeftFiels.push('EAN') : null;
                ($FamiliesObject[xx].FamilieValue == "Extras" && document.getElementById('Extras').value.trim() === "" ) ? LeftFiels.push('Contenido Extra') : null;
                ($FamiliesObject[xx].FamilieValue == "Height" && document.getElementById('Height').value.trim() === "" ) ? LeftFiels.push('Ancho') : null;
                ($FamiliesObject[xx].FamilieValue == "ISBN" && document.getElementById('ISBN').value.trim() === "" ) ? LeftFiels.push('ISBN') : null;
                ($FamiliesObject[xx].FamilieValue == "Lenght" && document.getElementById('Lenght').value.trim() === "" ) ? LeftFiels.push('Espesor') : null;
                ($FamiliesObject[xx].FamilieValue == "Pages" && document.getElementById('Pages').value.trim() === "" ) ? LeftFiels.push('Páginas') : null;
                ($FamiliesObject[xx].FamilieValue == "Price" && document.getElementById('Price').value.trim() === "" ) ? LeftFiels.push('Precio Lista') : null;
                ($FamiliesObject[xx].FamilieValue == "Run_time" && document.getElementById('Run_time').value.trim() === "" ) ? LeftFiels.push('Duracion') : null;
                ($FamiliesObject[xx].FamilieValue == "Serie" && document.getElementById('Serie').value.trim() === "" ) ? LeftFiels.push('Serie') : null;
                //($FamiliesObject[xx].FamilieValue == "Tax" && document.getElementById('Tax').value.trim() === "") ? LeftFiels.push('Tax') : null;
                ($FamiliesObject[xx].FamilieValue == "Translator" && document.getElementById('Translator').value.trim() === "" ) ? LeftFiels.push('Traductor') : null;
                ($FamiliesObject[xx].FamilieValue == "Weight" && document.getElementById('Weight').value.trim() === "" ) ? LeftFiels.push('Peso') : null;
                ($FamiliesObject[xx].FamilieValue == "Width" && document.getElementById('Width').value.trim() === "" ) ? LeftFiels.push('Ancho') : null;
                ($FamiliesObject[xx].FamilieValue == "Year" && document.getElementById('Year').value.trim() === "" ) ? LeftFiels.push('Año de Edición') : null;
                //($FamiliesObject[xx].FamilieValue == "abridged" && document.getElementById('abridged').value.trim() === "") ? LeftFiels.push('abridged') : null;
                ($FamiliesObject[xx].FamilieValue == "author_lastname" && document.getElementById('author_lastname').value.trim() === "" ) ? LeftFiels.push('Apellido Autor') : null;
                ($FamiliesObject[xx].FamilieValue == "author_name" && document.getElementById('author_name').value.trim() === "" ) ? LeftFiels.push('Nombre Autor') : null;
                //($FamiliesObject[xx].FamilieValue == "description" && document.getElementById('description').value.trim() === "" ) ? LeftFiels.push('Sinopsis') : null;
                ($FamiliesObject[xx].FamilieValue == "name" && document.getElementById('name').value.trim() === "" ) ? LeftFiels.push('Título') : null;
                ($FamiliesObject[xx].FamilieValue == "narrator" && document.getElementById('narrator').value.trim() === "" ) ? LeftFiels.push('Narrador') : null;
                ($FamiliesObject[xx].FamilieValue == "publication_date" && document.getElementById('publication_date').value.trim() === "" ) ? LeftFiels.push('Fecha de publicación') : null;
                //($FamiliesObject[xx].FamilieValue == "single_price_law" && document.getElementById('single_price_law').value.trim() === "") ? LeftFiels.push('single_price_law') : null;
                ($FamiliesObject[xx].FamilieValue == "sku" && document.getElementById('sku').value.trim() === "" ) ? LeftFiels.push('Código de Barras') : null;
                ($FamiliesObject[xx].FamilieValue == "subtitle" && document.getElementById('subtitle').value.trim() === "" ) ? LeftFiels.push('Subtitulo') : null;
                ($FamiliesObject[xx].FamilieValue == "url" && document.getElementById('url').value.trim() === "" ) ? LeftFiels.push('Web') : null;
                //($FamiliesObject[xx].FamilieValue == "image" && document.getElementById("image").files.length <= 0) ? LeftFiels.push('Portada') : null;
                ($FamiliesObject[xx].FamilieValue == "Additional_features" && document.getElementById('Additional_features').value.trim() === "" ) ? LeftFiels.push('Especificaciones adicionales') : null;
                ($FamiliesObject[xx].FamilieValue == "Ages" && document.getElementById('Ages').value.trim() === "" ) ? LeftFiels.push('Edades') : null;
                ($FamiliesObject[xx].FamilieValue == "director" && document.getElementById('director').value.trim() === "" ) ? LeftFiels.push('Nombre Director') : null;
                ($FamiliesObject[xx].FamilieValue == "Apellido_Director" && document.getElementById('Apellido_Director').value.trim() === "" ) ? LeftFiels.push('Apellido Director') : null;
                ($FamiliesObject[xx].FamilieValue == "Package" && document.getElementById('Package').value.trim() === "" ) ? LeftFiels.push('Tipo de empaque') : null;
                ($FamiliesObject[xx].FamilieValue == "artist" && document.getElementById('artist').value.trim() === "" ) ? LeftFiels.push('Nombre Artista') : null;
                ($FamiliesObject[xx].FamilieValue == "apellido_artista" && document.getElementById('apellido_artista').value.trim() === "" ) ? LeftFiels.push('Apellido Artista') : null;
                ($FamiliesObject[xx].FamilieValue == "Batteries" && document.getElementById('Batteries').value.trim() === "" ) ? LeftFiels.push('Duracion de las baterias') : null;
                //($FamiliesObject[xx].FamilieValue == "Bluetooth" && document.getElementById('Bluetooth').value.trim() === "") ? LeftFiels.push('Bluetooth') : null;
                ($FamiliesObject[xx].FamilieValue == "Customer_support" && document.getElementById('Customer_support').value.trim() === "" ) ? LeftFiels.push('Atención a clientes') : null;
                ($FamiliesObject[xx].FamilieValue == "Material" && document.getElementById('Material').value.trim() === "" ) ? LeftFiels.push('Material') : null;
                ($FamiliesObject[xx].FamilieValue == "Storage" && document.getElementById('Storage').value.trim() === "" ) ? LeftFiels.push('Almacenamiento') : null;
                ($FamiliesObject[xx].FamilieValue == "Warranty" && document.getElementById('Warranty').value.trim() === "" ) ? LeftFiels.push('Garantia') : null;
                //($FamiliesObject[xx].FamilieValue == "Waterproof" && document.getElementById('Waterproof').value.trim() === "") ? LeftFiels.push('Waterproof') : null;
                ($FamiliesObject[xx].FamilieValue == "in_the_box" && document.getElementById('in_the_box').value.trim() === "" ) ? LeftFiels.push('Que hay en la caja') : null;
                ($FamiliesObject[xx].FamilieValue == "nb_pieces" && document.getElementById('nb_pieces').value.trim() === "" ) ? LeftFiels.push('Número de piezas') : null;
                ($FamiliesObject[xx].FamilieValue == "bisac" && document.getElementById('bisac').value.trim() === "" ) ? LeftFiels.push('Categoria bisac') : null;
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
async function funUploadAkeneo(){
    jQuery.support.cors = true;
    $('#UploadModal').modal('hide');
    $(".overlay").show();
    collpasedivs();
    if($("#ItemType option:selected").val() === "NV"){
        $(".overlay").hide();
        $('#MessageModal').modal('toggle');
        $('#MessageModal').modal('show');
        $('#ModalTitle').text('Falta información');
        $('#ModalBody').text('Favor de seleccionar un tipo de producto.');
    }else{
        const validationObject = await funCheckNeccesaryFields();
        if(validationObject[0] === "Y"){
            $(".overlay").hide();
            $('#MessageModal').modal('toggle');
            $('#MessageModal').modal('show');
            $('#ModalTitle').text('Campos faltantes');
            $('#ModalBody').text('Favor de completar los siguientes campos marcados como requeridos: \n'+validationObject[1]);
        }else{
            $.ajax({
                headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
                dataType: "JSON",
                type: "GET",
                crossDomain: true,
                url: `${URI}/checkAkeneoBookExist/`+document.getElementById("sku").value+"/"+$("#ItemType option:selected").val(),
                contentType: 'application/json',
                async: true,
                success: function (data){
                    if(data){
                        $(".overlay").hide();
                        $('#MessageModal').modal('toggle');
                        $('#MessageModal').modal('show');
                        $('#ModalTitle').text('Libro Existente');
                        $('#ModalBody').text('El libro existe, favor de ingresar uno nuevo.');
                    }else{
                        var CategoriesListObject = [];
        
                        $("#CategoriesTB tbody tr").each(function () {
                            CategoriesListObject.push($(this).find("td").eq(0).text());
                        });
                        $.each($("input[name='checkchanels']:checked"), function(){
                            CategoriesListObject.push($(this).val());
                        });
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
                        jsonDataObject.Supplier = "";
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
                        jsonDataObject.Price = document.getElementById("Price").value;
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
                        jsonDataObject.Discount = document.getElementById("Discount").value;
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
                        jsonDataObject.Bisac = (typeof CategoriesListObject[0] != "undefined") ? CategoriesListObject[0] : null;
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

                        jsonDataObject.Operation = "1";
        
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
                                if(data[0] === 201 || data[0] === 204){
                                    $(".overlay").hide();
                                    $('#MessageModal').modal('toggle');
                                    $('#MessageModal').modal('show');
                                    $('#ModalTitle').text('Carga de producto exitosa');
                                    $('#ModalBody').text(data[1]);
                                    axios.post(`${URI}/Log/`, {
                                        responseType: 'json',
                                        data: {
                                            USERID: sessionStorage.getItem('UserId'),
                                            ACTIONDESC: 'Dio de alta el producto ' + document.getElementById("sku").value + ', de tipo ' + $("#ItemType option:selected").text() + '.'
                                            }
                                    });
                                    cleanData();
                                }else{
                                    console.log('Fallo');
                                    console.log(data[0]);
                                    $(".overlay").hide();
                                    $('#MessageModal').modal('toggle');
                                    $('#MessageModal').modal('show');
                                    $('#ModalTitle').text('Fallo la carga del producto');
                                    $('#ModalBody').text(data[1]);
                                }
                            },
                            error: function(e){
                                $(".overlay").hide();
                                $('#MessageModal').modal('toggle');
                                $('#MessageModal').modal('show');
                                $('#ModalTitle').text('Fallo la carga del producto');
                                $('#ModalBody').text(e);
                            }
                        });
                    }
                },
                error: function(e){
                    alert(e);
                }
            });
        }
    }
}

function AddNewCategorie(){
    var CategorieCode = $("#categories option:selected").val();
    var CategorieLabel = $("#categories option:selected").text();
    if (typeof CategorieCode === "undefined"){
        $('#MessageModal').modal('toggle');
        $('#MessageModal').modal('show');
        $('#ModalTitle').text('Adición de categoría');
        $('#ModalBody').text('Favor de agregar una categoría válida.');
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

function cleanData(){
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
    $("#CategoriesTB").find("tr:gt(0)").remove();
    $("#DestinyTB > tr").remove();
    $("#DestinyTB tr").remove();
    $("#DestinyTB").find("tr:gt(0)").remove();

    $("#chanelmenu").empty();
    $('#image').val('');
    $("#coverimg" ).remove();
    $('#imagea').prepend('<img src="" id="coverimg">');

    $('#supplier').val(sessionStorage.getItem('UserIDProv')).prop('selected', true);
    $('#supplier').trigger('change');

    getAkeneoChanels();

    //$("#supplierID").val('NV').prop('selected', true);
    //$('#supplierID').trigger('change');
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

async function callBarCode13(SKU){
    jQuery.support.cors = true;
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "GET",
        crossDomain: true,
        url: `${URI}/getBarCode13/`+SKU,
        contentType: 'application/json',
        async: false,
        success: function (data){
            $codebar13 = data;
		},
        error: function(e){
            console.log(e)
        }
    });
}

function validateSKU(){
    var focus = 0,
    blur = 0;
    $( "#sku" )
    .focusout(async function() {
        funCheckBookExist();
    })
    .blur(function() {
        blur++;
    });
}
function validateISBN(){
    var focus = 0,
    blur = 0;
    $( "#ISBN" )
    .focusout(async function() {
        if(document.getElementById('ISBN').value.trim().length > 0){
            funvalidateBarcode();
        }
    })
    .blur(function() {
        blur++;
    });
}
function validateEAN(){
    $( "#EAN" )
    .focusout(async function() {
        if(document.getElementById('EAN').value.trim().length > 0){
            funvalidateBarcode();
        }
    })
    .blur(function() {
        blur++;
    });
}

async function funvalidateBarcode(){
    if(document.getElementById('ISBN').value.trim().length == 12 || document.getElementById('ISBN').value.trim().length == 13 || document.getElementById('EAN').value.trim().length == 12 || document.getElementById('EAN').value.trim().length == 13){
        var passvalidation = true;
        if(document.getElementById('ISBN').value.length > 0 && document.getElementById('EAN').value.length > 0){
            if (document.getElementById('ISBN').value === document.getElementById('EAN').value){
            passvalidation = true;
            }else{
            passvalidation = false;
            }
        }

        if (passvalidation){
            if(document.getElementById('EAN').value.length == 12){
                var bar13 = await callBarCode13(document.getElementById('EAN').value.substring(0,11));
                if(parseInt($codebar13.substring(1,13)) == parseInt(document.getElementById('EAN').value)){
                    passvalidation = true;
                }else{
                    passvalidation = false;
                }
            }else if(document.getElementById('EAN').value.length == 13){
                var bar13 = await callBarCode13(document.getElementById('EAN').value.substring(0,12));
                if(parseInt($codebar13) == parseInt(document.getElementById('EAN').value)){
                    passvalidation = true;
                }else{
                    passvalidation = false;
                }
            }
            if(passvalidation){
                //$("#UploadProduct").prop('disabled', false);
                funCheckBookExist();
            }else{
                $("#UploadProduct").prop('disabled', true);
                $('#MessageModal').modal('toggle');
                $('#MessageModal').modal('show');
                $('#ModalTitle').text('Error en validación');
                $('#ModalBody').text('El codigo de barras no es correcto, no cumple con la validacion del digito verificador.');
            }
        }else{
            $("#UploadProduct").prop('disabled', true);
            $('#MessageModal').modal('toggle');
            $('#MessageModal').modal('show');
            $('#ModalTitle').text('Error en validación');
            $('#ModalBody').text('El codigo de barras no es el mismo que el ISBN o EAN, los campos deben ser identicos, favor de verificar.');
        }
    }else{
        $("#UploadProduct").prop('disabled', true);
        $('#MessageModal').modal('toggle');
        $('#MessageModal').modal('show');
        $('#ModalTitle').text('Error en validación');
        $('#ModalBody').text('El codigo de barras no cumple con los requerimientos necesarios, debe de ser de 12 o 13 digitos.');
    }
}

async function funCheckBookExist(){
    if (document.getElementById('sku').value.trim().length > 10){
        jQuery.support.cors = true;
        $.ajax({
            headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
            dataType: "JSON",
            type: "GET",
            crossDomain: true,
            url: `${URI}/checkAkeneoBookExist/`+document.getElementById("sku").value+"/"+$("#ItemType option:selected").val(),
            contentType: 'application/json',
            async: false,
            success: function (data){
                if(data){
                    $("#UploadProduct").prop('disabled', true);
                    $(".overlay").hide();
                    $('#MessageModal').modal('toggle');
                    $('#MessageModal').modal('show');
                    $('#ModalTitle').text('Libro Existente');
                    $('#ModalBody').text('El libro existe, favor de ingresar uno nuevo.');
                }else{
                    $("#UploadProduct").prop('disabled', false);
                    $(".overlay").hide();
                }
            },
            error: function(e){
                alert(e);
            }
        });
    }
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

function collpasedivs(){
    $(".divbody").removeClass("collapse show");
    $(".divbody").addClass("collapse");

    $buttonOPGEN = 0;
    $buttonOPEDIC = 0;
    $buttonOPCHAR = 0;
    $buttonOPPRCLA = 0;
    $buttonOPCOIMP = 0;
    $buttonOPDES = 0;
    $buttonOPOTH = 0;
    $buttonOPSINP= 0;

    $(".btnopt").css("background-color", "#a91ec4");
}

function getiframe(){
    console.log(document.getElementById('noise').value);
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