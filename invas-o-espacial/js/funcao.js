var imgjogo = new Image;
var imgPersonagem = new Image;
var imgTiro = new Image;

var personagem = {
	"x":260,
	"y":570,
	"largura":80,
	"altura":100,
	"direcaoAtual":0,
	"direcao":{
		"frente":0,
		"esquerda":105,
		"direita":210,
		"atras":315
	}
};

var tiro = {
	"x": 260,
	"y": 570,
	"largura": 67,
	"altura": 67,
	"direcaoAtual":0,
	"direcao":{
			"frente": 0,
			"esquerda": 105,
			"direita": 210,
			"atras": 315
	}
}

imgPersonagem.src = 'img/nave.png';
imgTiro.src = 'img/tiro.png';

//window.onload = function() {
	canvas = document.getElementById('jogo');
	ctx = canvas.getContext("2d");

	canvas.height= 700;
	canvas.width= 600;

	ctx.drawImage( imgPersonagem, 0,personagem.direcao.esquerda,personagem.largura,personagem.altura,personagem.x,personagem.y,personagem.largura,personagem.altura);
	ctx.drawImage( imgTiro, 0,tiro.direcao.frente,tiro.largura,tiro.altura,tiro.x,tiro.y,tiro.largura,tiro.altura);
	
	setInterval(function(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.drawImage( imgPersonagem, 0,personagem.direcaoAtual,personagem.largura,personagem.altura,personagem.x,personagem.y,personagem.largura,personagem.altura);
		ctx.drawImage( imgTiro, 0,tiro.direcao.frente,tiro.largura,tiro.altura,tiro.x,tiro.y,tiro.largura,tiro.altura);
	});

	window.addEventListener("keydown", function keydown(e) {
		var keycode = e.which || window.event.keycode;
		switch (keycode) {
			case 37:
				if (personagem.x > 20){
					personagem.direcaoAtual=personagem.direcao.esquerda;
					personagem.x-=30;
				}
				break;
			case 39:
				if (personagem.x < 520){
					personagem.direcaoAtual=personagem.direcao.direita;
					personagem.x+=30;
				}
				break;
				
			case 32:
				setInterval(movTiro,30);
				break;
		}
	});
	window.addEventListener("keyup", function keydown(e) {
		personagem.direcaoAtual=personagem.direcao.frente;
	});
	
	function movTiro(){
		tiro.y -= 30;
	}

//};
