funUploadAkeneo();
//test();

function test2(){
    var f = document.getElementById("photo").files[0]; 
    var textarea = document.querySelector('textarea');

    if (f) {
      var r = new FileReader();
      r.onload = function(e) { 
          var contents = e.target.result;
        alert("name: " + f.name + "n"
              +"type: " + f.type + "n"
              +"size: " + f.size + " bytesn"
              + "starts with: " + contents
        );
        textarea.textContent = contents;
      }
      r.readAsText(f);
    }
}

function previewFile() {
	const preview = document.querySelector('#coverimg');
	const file = document.querySelector('input[type=file]').files[0];
	const reader = new FileReader();
  
	reader.addEventListener("load", function () {
	  // convert image file to base64 string
	  preview.src = reader.result;
	}, false);
  
	if (file) {
	  reader.readAsDataURL(file);
	}
  }

function getCanvas(){
    const preview = document.querySelector('#coverimg');
    var canvas = document.createElement("canvas");
    canvas.width = preview.width;
    canvas.height = preview.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(preview, 0, 0);
    var dataURL = canvas.toDataURL("image/jpg");
    console.log(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
}


function test(){
    var canvas = document.createElement('canvas');
var height = 200;
var width  = 200;

canvas.width  = width;
canvas.height = height;

var ctx = canvas.getContext('2d');

ctx.strokeStyle = '#090';
ctx.beginPath();
ctx.arc(width/2, height/2, width/2 - width/10, 0, Math.PI*2);
ctx.stroke();

canvas.toBlob(function (blob) {
  var reader = new FileReader();

  reader.onload = function () {
    console.log(reader.result);
  }

  reader.readAsBinaryString(blob);
});
}

function funUploadAkeneo(){
    jQuery.support.cors = true;
    var jsonDataObject = new Object();
    jsonDataObject.ItemType = 'books';
    jsonDataObject.SKU = '9999991234';
    //jsonDataObject.COVERSTRING = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    jsonDataObject.COVERSTRING = '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';
    var jsonData = JSON.stringify(jsonDataObject);
    jQuery.support.cors = true;
    $.ajax({
        headers: {"Access-Control-Allow-Headers": "X-Requested-With"},
        dataType: "JSON",
        type: "POST",
        crossDomain: true,
        url: "http://localhost:8082/postGenerateAkeneoAsset/",
        contentType: 'application/json',
        data: jsonData,
        async: false,
        success: function (data){
            console.log(data);
            alert(data);
        },
        error: function(e){
            alert(e);
            console.log(e)
        }
    });
        
	return 1;
}