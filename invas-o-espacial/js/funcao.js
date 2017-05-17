var imgjogo = new Image;
var imgJogador = new Image;
var imgInveiders = new Image;
var imgTiro = new Image;

var cont = 1;
var fogo;
var inveiders = [];

var hitLeft = true, hitRight = false, hitBottom = false, itsRainingMan = false;

var xInimigo = 0;
var yInimigo = 0;

var ultimoTiro = null;
var tiros = [];

var jogador = {
	"x":260,
	"y":570,
	"largura":67,
	"altura":100,
	"direcaoAtual":0,
	"direcao":{
		"frente":0,
		"esquerda":105,
		"direita":210,
		"atras":315
	}
};

var inimigo = {
	"x":0,
	"y":0,
	"largura":80,
	"altura":82,
	"direcaoAtual":0,
	"direcao":{
		"frente":0,
		"esquerda":105,
		"direita":210,
	}
}

imgJogador.src = 'img/nave.png';
imgInveiders.src = 'img/inimigo.png';
imgTiro.src = 'img/tiro.png';

canvas = document.getElementById('jogo');
ctx = canvas.getContext("2d");

canvas.height= 700;
canvas.width= 600;

var gameSize = {x: canvas.width, y: canvas.heigth};

ctx.drawImage( imgJogador, 0,jogador.direcao.esquerda,jogador.largura,jogador.altura,jogador.x,jogador.y,jogador.largura,jogador.altura);

for (var i = 0; i < 6; i++){
	inveiders.push (new Invaider(inimigo, xInimigo, yInimigo));
	xInimigo += 96
	ctx.drawImage( imgInveiders, 0,inveiders[i].direcao.frente,inveiders[i].largura,inveiders[i].altura,inveiders[i].x,inveiders[i].y,inveiders[i].largura,inveiders[i].altura);
}

var atualizaCanvas = setInterval(function(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.drawImage( imgJogador, 0,jogador.direcaoAtual,jogador.largura,jogador.altura,jogador.x,jogador.y,jogador.largura,jogador.altura);
	ctx.drawImage( imgJogador, 0,jogador.direcaoAtual,jogador.largura,jogador.altura,jogador.x,jogador.y,jogador.largura,jogador.altura);
		
	var invasorEsquerda = inveiders[0];
	var invasorDireita = inveiders[inveiders.length - 1];
	
	if (invasorDireita.x + invasorDireita.largura >= 600 && hitRight == false){
		hitRight = true;
		hitLeft = false;
		itsRainingMan = true;
	}
	
	if (invasorEsquerda.x <= 0 && hitLeft == false){
		hitLeft = true;
		hitRight = false;
	}
	
	if (itsRainingMan == true){
		manRaining();
	}
	
	if (hitRight == false){
		for (var i = 0; i < inveiders.length; i++){		
		
			inveiders[i].x += 0.7;
		
		}
		
	}
	
	if (hitLeft == false){
		for (var i = 0; i < inveiders.length; i++){		
	     	inveiders[i].x -= 0.7;
		}
	}
	
	if (inveiders[0].y > 700){
		console.log("aki");
		clearInterval(atualizaCanvas);
	}
	
	
	
	for (var i = 0; i < inveiders.length; i++){
		ctx.drawImage( imgInveiders, 0,inveiders[i].direcao.frente,inveiders[i].largura,inveiders[i].altura,inveiders[i].x,inveiders[i].y,inveiders[i].largura,inveiders[i].altura);
	}

	for (i = 0; i < tiros.length; i++) {
		var tiro = this.tiros[i];
		for (var k = 0; k < inveiders.length; k++){
			if (tiro.y > inveiders[k].y && tiro.y < inveiders[k].y + inveiders[k].altura && tiro.x > inveiders[k].x - inveiders[k].largura/2 && tiro.x < inveiders[k].x + inveiders[k].largura/2){
				tiros.splice(i--, 1);
				inveiders.splice(k--,1);
			}
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
window.addEventListener('keydown', whatKey, true);

function whatKey(evt){
	switch (evt.keyCode) {
		case 37:
			if (jogador.x > 20){
				jogador.direcaoAtual=jogador.direcao.esquerda;
				jogador.x-=10;
			} else {
				jogador.direcaoAtual=jogador.direcao.frente;
			}
			break;
		case 39:
			if (jogador.x < 520){
				jogador.direcaoAtual=jogador.direcao.direita;
				jogador.x+=10;
			} else {
				jogador.direcaoAtual=jogador.direcao.frente;
			}
			break;
		case 32:
			atirar();
			break;
	}
}

function manRaining(){
	console.log("funcao");
	for (var i = 0; i < inveiders.length; i++){		
		inveiders[i].y -= 0.7;
	}
	itsRainingMan = false;
}

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

function Invaider(Inimigo, xInimigo, yInimigo) {
	this.x = Inimigo.x + xInimigo
	this.y = Inimigo.y + yInimigo
	this.altura = Inimigo.altura;
	this.largura = Inimigo.largura;
	this.direcaoAtual = Inimigo.direcaoAtual;
	this.direcao = Inimigo.direcao;
	return this;
}
