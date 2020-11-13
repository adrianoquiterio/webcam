var imagensCapturadas = [];
function loadCamera(){
	//Captura elemento de vídeo
	var video = document.querySelector("#webCamera");
		//As opções abaixo são necessárias para o funcionamento correto no iOS
		video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        //--
	
	//Verifica se o navegador pode capturar mídia
	if (navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: 'user'}})
		.then( function(stream) {
			//Definir o elemento vídeo a carregar o capturado pela webcam
			video.srcObject = stream;
		})
		.catch(function(error) {
			alert("Oooopps... Falhou :'(" + error);
		});
	}
}

function takeSnapShot(){
	//Captura elemento de vídeo
	var video = document.querySelector("#webCamera");
	
	//Criando um canvas que vai guardar a imagem temporariamente
    var canvas = document.createElement('canvas');
    
	canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
	var ctx = canvas.getContext('2d');
	
	//Desenhando e convertendo as dimensões
	ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
	
	//Criando o JPG
    //var dataURI = canvas.toDataURL('image/jpeg'); //O resultado é um BASE64 de uma imagem.
    var dataURI = canvas.toDataURL(); //O resultado é um BASE64 de uma imagem.
    //document.querySelector("#image_preview").src = dataURI;
    
    imagensCapturadas.push( dataURI );
    mostraImagens();
	//sendSnapShot(dataURI); //Gerar Imagem e Salvar Caminho no Banco
}

function sendSnapShot(script){	
    $.ajax({
        url: script,
        type: "post",
        data: {
            images: JSON.stringify(imagensCapturadas)
        },
        headers: {
            "x-session-id": parent.sessionId
        },
        dataType: "json",
        success: function (data) {
            alert('Sucesso. Agora clique em "visualizar salvo"');
            //document.getElementById("demo").innerHTML = "Assinatura colhida";
            //document.getElementById("assinaturaCliente").innerHTML = '<table><tr><td><h4>Cliente:</h4></td><td><img src="'+ dados +'"></td><tr></table>';
        }
    });
    
}

function removeImagem(idImagem){
    imagensCapturadas.splice(idImagem, 1);
    mostraImagens();
}

function mostraImagens(){

    //Limpeza do preview anterior
    $("#divPrev").empty();
    imagensCapturadas.forEach( function( imagem, index ){
        let idImagem = "dynamicPrev" + index;
        var img = $('<img id="'+ idImagem +'" onClick="removeImagem('+ index +')" alt="ID de imagem:'+ index +' ">'); 
        img.attr('src', imagem);
        var link = $("<p>[ - ] Remover</p>");
        link.click(function(){
            removeImagem(index);
        });

        $("#divPrev").append(img, link);
    } );

}

module.exports = loadCamera;