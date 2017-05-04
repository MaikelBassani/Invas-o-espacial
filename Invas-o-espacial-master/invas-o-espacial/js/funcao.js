var imgjogo = new Image;
var imgJogador = new Image;
var imgInveiders = new Image;
var imgTiro = new Image;

var cont = 1;
var fogo;
var inveiders = [];

var ultimoTiro = null;
var tiros = [];

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

var inveiders = {
	"x":260,
	"y":100,
	"largura":80,
	"altura":100,
	"direcaoAtual":0,
	"direcao":{
		"frente":0,
		"esquerda":105,
		"direita":210,
		"atras":315
	}
}

imgJogador.src = 'img/nave.png';
imgInveiders.src = 'img/nave.png';
imgTiro.src = 'img/tiro.png';

canvas = document.getElementById('jogo');
ctx = canvas.getContext("2d");

canvas.height= 700;
canvas.width= 600;

var gameSize = {x: canvas.width, y: canvas.heigth};

ctx.drawImage( imgJogador, 0,jogador.direcao.esquerda,jogador.largura,jogador.altura,jogador.x,jogador.y,jogador.largura,jogador.altura);
ctx.drawImage( imgInveiders, 0,inveiders.direcao.esquerda,inveiders.largura,inveiders.altura,inveiders.x,inveiders.y,inveiders.largura,inveiders.altura);

setInterval(function(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.drawImage( imgJogador, 0,jogador.direcaoAtual,jogador.largura,jogador.altura,jogador.x,jogador.y,jogador.largura,jogador.altura);
	
	ctx.drawImage(imgInveiders, 0,inveiders.direcao.frente,inveiders.largura,inveiders.altura,inveiders.x,inveiders.y,inveiders.largura,inveiders.altura);
	
	for (i = 0; i < this.tiros.length; i++) {
		var tiro = this.tiros[i];
		if (tiro.y > inveiders.y && tiro.y < inveiders.y + inveiders.altura && tiro.x > inveiders.x - inveiders.largura/2 && tiro.x < inveiders.x + inveiders.largura/2){
			this.tiros.splice(i--, 1);
		}
	}
	
	for(i=0; i<this.tiros.length; i++) {
		var tiro = this.tiros[i];
		tiro.y -= 1 * tiro.velocidade;
		if(tiro.y < 0) {
			this.tiros.splice(i--, 1);
		}
	}
	
	ctx.fillStyle = '#ff0000';
	for(var i=0; i<this.tiros.length; i++) {
		var tiro = this.tiros[i];
		ctx.fillRect(tiro.x + 28.5, tiro.y, 4, 12);
	}
});

window.addEventListener("keydown", function keydown(e) {
	var keycode = e.which || window.event.keycode;
	switch (keycode) {
		case 37:
			if (jogador.x > 20){
				jogador.direcaoAtual=jogador.direcao.esquerda;
				jogador.x-=15;
			}
			break;
		case 39:
			if (jogador.x < 520){
				jogador.direcaoAtual=jogador.direcao.direita;
				jogador.x+=15;
			}
			break;
			
		case 32:
			atirar();
			break;
	}
});
window.addEventListener("keyup", function keydown(e) {
	jogador.direcaoAtual=jogador.direcao.frente;
});	
function atirar(){
	if (ultimoTiro == null || ((new Date()).valueOf() - ultimoTiro) > (500 / 1.23)){
		tiros.push(new Tiro(jogador.x, jogador.y - 12, 5));
		ultimoTiro = (new Date()).valueOf();
	}
}

function Tiro(x, y, velocidade) {
	this.x = x;
	this.y = y;
	this.velocidade = velocidade;
}
