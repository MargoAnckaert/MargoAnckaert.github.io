var X = 0;
var Y = 0;
var ruimteschip, Health;
var vijanden = [];
var level;
var links;
var rechts;
var vuur;
var kogels = [];
var Left = 0;
var Bottom = 0;
var EX = 0;
var EY = 0;
var PositieX;
var PositieY;
var Richting = "links";
var test;
var container;
var punten = 0;
var magVuren = false;
var test2;
var new2;
var stop;
var vurenallowed = true;
var gameEnded = false;
/*global $:true,class*/
function Ruimteschip(Health) {
	"use strict";
	this.Health = Health;
	this.element = $('<div />', {
		'class': "ruimteschip"
	});
	this.element.appendTo(level);
}

function Vijand(Health, PositieX, PositieY) {
	"use strict";
	this.Health = Health;
	this.element = $('<div />', {
		'class': "vijand"
	});
	this.X = PositieX;
	this.Y = PositieY;
	this.element.css('left', PositieX);
	this.element.css('bottom', PositieY);
	this.element.appendTo(level);
	this.Richting = 'rechts';
}

function kogel(Left, Bottom) {
	"use strict";
	this.element = $('<div />', {
		'class': "kogel"
	});
	this.X = Left;
	this.Y = Bottom;
	this.element.css('left', Left);
	this.element.css('bottom', Bottom);
	this.element.appendTo(level);
}

function Knop(handler, soort) {
	"use strict";
	this.handler = handler;
	this.element = $('<div />', {
		'class': "Knop " + soort
	});
	this.element.appendTo(container);
	this.element.on('click touchevent', {
		element: this
	}, function (event) {
		event.data.element.handler();
		magVuren = false;
	});
}
//calculate maxX
var WindowWidth = window.innerWidth;
var MaxX = Math.floor(WindowWidth) - 1;
//move the spaceship
function NaarLinks() {
	"use strict";
	//console.log('links');
	if (X > 0) {
		ruimteschip.element.animate({
			left: "-=50"
		}, 100);
		X -= 50;
	}
}

function NaarRechts() {
	"use strict";
	//console.log('rechts');
	if (X < MaxX) {
		ruimteschip.element.animate({
			left: "+=50"
		}, 100);
		X += 50;
	}
}

function Vuur() {
	"use strict";
	if (vurenallowed) {
		kogels.push(new kogel(X, 80));
		setTimeout(resetVuren, 500);
		vurenallowed = false;
	} else {
		vurenallowed
	}
}

function resetVuren() {
	"use strict";
	vurenallowed = true;
}
var i;
var j;

function moveBullet() {
	"use strict";
	var maxHeight = window.innerHeight;
	for (j = 0; j < kogels.length; j += 1) {
		kogels[j].Y += 50;
		kogels[j].element.animate({
			bottom: "+=50"
		}, 50);
		if (kogels[j].Y >= maxHeight) {
			kogels[j].element.detach();
			kogels.splice(j, 1);
		}
	}
}

function stopSpawn() {
	if (vijanden.length > 44) {
		clearInterval(test);
		clearInterval(new2);
		clearInterval(stop);
	}
}

function DelEnemy() {
	"use strict";
	lus: for (i = 0; i < vijanden.length; i += 1) {
		if (vijanden[i].Y <= 80) {
			vijanden[i].element.detach();
			vijanden.splice(i, 1);
			gameover();
			continue lus;
		}
	}
	if (vijanden.length === 0) {
		$("body").innertHTML = "";
		$("body").html("<h2> YOU WIN </h2> <p class='eindscore'> score: " + punten + "</p>");
		$("body").append('<button id="start" onclick="reset();">Start spel</button>');
		clearInterval(test2);
		clearInterval(test);
		vurenallowed = false;
		gameEnded = true;
	}
}

function gameover() {
	"use strict";
	$("body").innertHTML = "";
	$("body").html("<h2> YOU LOSE </h2> <p class='eindscore'> score: " + punten + "</p>");
	$("body").append('<button id="start" onclick="reset();">Start spel</button>');
	clearInterval(test2);
	clearInterval(test);
	vurenallowed = false;
	gameEnded = true;
}
function reset() {
	window.location = "index.html";
	
	
}

function createEnemy() {
	"use strict";
	if (!gameEnded) {
		console.log('createEnemy')
		if (EY < 1) {
			EX += 1;
			PositieX = EX * 98;
			PositieY = -(EY * 98) + window.innerHeight - 98;
			if (PositieX > WindowWidth - 200) {
				EY += 1;
				EX = 0;
			}
			vijanden.push(new Vijand(100, PositieX, PositieY));
		}
		else {
			clearInterval(test);
			new2 = setTimeout(createNewEnemy, 10000);
			//creer snelheid
		}
	}
}

function createNewEnemy() {
	"use strict";
	console.log('createNewEnemy')
	EY = 0;
	EX = 0;
	test = setInterval(createEnemy, 1);
}

function beweeg() {
	"use strict";
	for (i = 0; i < vijanden.length; i += 1) {
		vijanden[i].beweeg();
	}
}
Vijand.prototype.beweeg = function () {
	"use strict";
	if (this.Richting == "links") {
		if (this.X >= 98) {
			this.links();
		}
		else {
			this.omlaag();
			return;
		}
	}
	if (this.Richting == "rechts") {
		if (this.X < window.innerWidth - 98 * 2) {
			this.rechts();
		}
		else {
			this.omlaag();
		}
	}
}
Vijand.prototype.links = function () {
	this.element.animate({
		left: "-=98"
	}, 50)
	this.X -= 98;
}
Vijand.prototype.rechts = function () {
	this.element.animate({
		left: "+=98"
	}, 50)
	this.X += 98;
}
Vijand.prototype.omlaag = function () {
	if (this.X > 98) {
		this.Richting = "links"
	}
	else {
		this.Richting = "rechts"
	}
	this.element.animate({
		bottom: "-=98"
	}, 50)
	this.Y -= 98;
}

function checkCollide() {
	lus: for (j = 0; j < kogels.length; j += 1) {
		for (i = 0; i < vijanden.length; i += 1) {
			var kogelX = kogels[j].X;
			var kogelY = kogels[j].Y;
			if (vijanden[i].X <= kogelX && (vijanden[i].X + 98) >= kogelX && vijanden[i].Y <= kogelY && (vijanden[i].Y - 98) <= kogelY) {
				//console.log('ja');
				vijanden[i].element.detach();
				vijanden.splice(i, 1);
				kogels[j].element.detach();
				kogels.splice(j, 1);
				punten += 1;
				document.getElementById('points').innerHTML = "punten: " + punten;
				continue lus;
			}
		}
	}
}

function startspel() {
	"use strict";
	$('#spelregels').remove();
	$('h1').remove();
	$('p').remove();
	$('#start').remove();
	level = document.body;
	container = $('#container');
	links = new Knop(NaarLinks, "Links");
	rechts = new Knop(NaarRechts, "Rechts");
	vuur = new Knop(Vuur, "Vuur");
	ruimteschip = new Ruimteschip(500);
	setInterval(moveBullet, 50);
	setInterval(checkCollide, 50);
	setInterval(beweeg, 500);
	test2 = setInterval(DelEnemy, 100);
	stop = setInterval(stopSpawn, 10);
	//createEnemy();
	test = setInterval(createEnemy, 1);
	$('.Links').css('left', WindowWidth / 2 - 128);
	$('.Rechts').css('left', WindowWidth / 2);
	$('.Vuur').css('left', WindowWidth / 2 - 64);
}