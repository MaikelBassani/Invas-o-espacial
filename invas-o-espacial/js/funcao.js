var imgjogo = new Image;
var imgJogador = new Image;
var imgTiro = new Image;

var cont = 1;
var fogo;

var jogador = {
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
	"largura": 35,
	"altura": 70,
	"faseAtual":-70,
	"fase":{
			"fase1": 0,
			"fase2": 70,
			"fase3": 140,
			"fase4": 210
	}
}

imgJogador.src = 'img/nave.png';
imgTiro.src = 'img/tiro.png';

//window.onload = function() {
	canvas = document.getElementById('jogo');
	ctx = canvas.getContext("2d");

	canvas.height= 700;
	canvas.width= 600;

	ctx.drawImage( imgTiro, 0,tiro.faseAtual,tiro.largura,tiro.altura,tiro.x,tiro.y,tiro.largura,tiro.altura);
	ctx.drawImage( imgJogador, 0,jogador.direcao.esquerda,jogador.largura,jogador.altura,jogador.x,jogador.y,jogador.largura,jogador.altura);
	
	setInterval(function(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.drawImage( imgTiro, 0,tiro.faseAtual,tiro.largura,tiro.altura,tiro.x,tiro.y,tiro.largura,tiro.altura);
		ctx.drawImage( imgJogador, 0,jogador.direcaoAtual,jogador.largura,jogador.altura,jogador.x,jogador.y,jogador.largura,jogador.altura);
	});

	window.addEventListener("keydown", function keydown(e) {
		var keycode = e.which || window.event.keycode;
		switch (keycode) {
			case 37:
				if (jogador.x > 20){
					jogador.direcaoAtual=jogador.direcao.esquerda;
					jogador.x-=30;
				}
				break;
			case 39:
				if (jogador.x < 520){
					jogador.direcaoAtual=jogador.direcao.direita;
					jogador.x+=30;
				}
				break;
				
			case 32:
				fogo = setInterval(movTiro,30);
				break;
		}
	});
	window.addEventListener("keyup", function keydown(e) {
		jogador.direcaoAtual=jogador.direcao.frente;
	});
	
	function movTiro(){
		tiro.y -= 30;
		if (cont == 1){
			ctx.drawImage( imgTiro, 0,tiro.fase.fase1,tiro.largura,tiro.altura,tiro.x,tiro.y,tiro.largura,tiro.altura);
			console.log(cont);
			cont++;
		} else if (cont == 2){
			ctx.drawImage( imgTiro, 0,tiro.fase.fase2,tiro.largura,tiro.altura,tiro.x,tiro.y,tiro.largura,tiro.altura);
			console.log(cont);
			cont++;
		} else if (cont == 3){
			ctx.drawImage( imgTiro, 0,tiro.fase.fase3,tiro.largura,tiro.altura,tiro.x,tiro.y,tiro.largura,tiro.altura);
			console.log(cont);
			cont++;
		} else {
			ctx.drawImage( imgTiro, 0,tiro.fase.fase4,tiro.largura,tiro.altura,tiro.x,tiro.y,tiro.largura,tiro.altura);
			console.log(cont);
			cont = 1;
		}
		if (tiro.y < -30){
			clearInterval(fogo);
			tiro.y = 570;
		}
	}

//};
