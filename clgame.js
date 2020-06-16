function random(a, b) {
	if (!a && !b)
	return Math.random();
    else if (a.length)
	return a[random(a.length)];
    else if (!b) {
		b = a;
        a = 0;
    }
    return (a + (b - a) * Math.random()) | 0;
}
function deviate(n, delta, mod = 256) {
	n = n + random(-delta, delta);
	n = (n + mod) % mod;
	return n;
}
var statusWon = ["FANTASTIC !","YOU GUSSED IT !" , "FABULOUS !", "AMAZING !", "ASTONISHING !"];
var statusLose = ["NEVER GIVE UP !", "TRY AGAIN !", "COME ON !","KEEP PUSHING !"];
var vis = [0, 0, 0, 0, 0, 0];

function makeSame() { 
	for (let i = 0; i < 6; i++) {
		squares[i].style.backgroundColor = pickedColor;
		vis[i] = 0;
	}
}

const squares = document.querySelectorAll(".square");
var display = document.getElementById("rgb"), newColors = document.querySelector("#new-colors"), won;
var easy = document.querySelector("#easy"), medium = document.querySelector("#medium"), hard = document.querySelector("#hard");
var displayStatus = document.querySelector("#displayStatus");

var level = "easy", pickedColor, first = true;
if (first) { 
	generate(128);
}

newColors.addEventListener("click",() => decide(level));

function decide(s) { 
	if (s == "easy") generate(128);
	if (s == "medium") generate(64);
	if (s == "hard") generate(32);
	displayStatus.textContent = "";
}

squares[0].addEventListener("click", () => check(0));
squares[1].addEventListener("click", () => check(1));
squares[2].addEventListener("click", () => check(2));
squares[3].addEventListener("click", () => check(3));
squares[4].addEventListener("click", () => check(4));
squares[5].addEventListener("click", () => check(5));

easy.addEventListener("click", () => generate(128));
medium.addEventListener("click", () => generate(64));
hard.addEventListener("click", () => generate(32));


function generate(delta) { 
	if (delta === 128) {
		medium.style.background = "#303030";
		hard.style.background = "#303030";
		level = "easy";
		easy.style.background = 'linear-gradient(to right,#f7b733, #CB356B )';
		easy.style.fontWeight = "550";
		first = false;
	} else if (delta === 64) {
		easy.style.background = "#303030";
		hard.style.background = "#303030";
		level = "medium";
		medium.style.background = 'linear-gradient(to right,#f7b733, #CB356B )';
		medium.style.fontWeight = "550";
	} else { 
		easy.style.background = "#303030";
		medium.style.background = "#303030";
		level = "hard";
		hard.style.background = 'linear-gradient(to right,#f7b733, #CB356B )';
		hard.style.fontWeight = "550";
	}
	for (let i = 0; i < 6; ++i) vis[i] = 0;
	won = false;
	displayStatus.textContent = "";
	
	let r = random(256), g = random(256), b = random(256);
	for (var i = 0; i < 6; ++i) {
		squares[i].style.backgroundColor = `rgb(${deviate(r, delta)}, ${deviate(g, delta)}, ${deviate(b, delta)})`;
	}
	pickedColor = squares[random(6)].style.backgroundColor;
	display.textContent = pickedColor;
}

function check(idx) { 
	if (!won && !vis[idx]) {
		if (squares[idx].style.backgroundColor === pickedColor) {
			displayStatus.textContent = statusWon[random(5)];
			displayStatus.style.color = "#52c234";
			won = true;
			makeSame();
		} else {
			if (vis[idx] === 0) {
				displayStatus.textContent = statusLose[random(4)];
				displayStatus.style.color = "#DC281E";
			}
			squares[idx].style.backgroundColor = "#ffebc4";
		}
		vis[idx] = 1;
	}
}