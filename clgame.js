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

const squares = document.querySelectorAll(".square");

for (var i = 0; i < 6; ++i) {
	squares[i].style.backgroundColor =  `rgb(${random(255)}, ${random(255)}, ${random(256)})`;
}

var display = document.getElementById("rgb");
var newColors = document.querySelector("#new-colors");
var pickedColor = squares[random(6)].style.backgroundColor;
display.textContent = pickedColor;

var won;
var easy = document.querySelector("#easy");
var medium = document.querySelector("#medium");
var hard = document.querySelector("#hard");

newColors.addEventListener("click", generate);

function generate() { 
	for (var i = 0; i < 6; ++i) {
		squares[i].style.backgroundColor = `rgb(${random(256)}, ${random(255)}, ${random(256)})`;
	}
	
	pickedColor = squares[random(6)].style.backgroundColor;
	display.textContent = pickedColor;
	won = false;
	displayStatus.textContent = "";
}

var statusWon = ["YOU GUSSED IT !", "BULLS EYE !", "FABULOUS !"];
var statusLose = ["NEVER GIVE UP !", "TRY AGAIN !", "COME ON !"];
var vis = [0, 0, 0, 0, 0, 0];

function makeSame() { 
	for (let i = 0; i < 6; i++) { 
		squares[i].style.backgroundColor = pickedColor;
	}
}

function check(idx) { 
	// console.log(idx);
	// console.log(vis[idx]);
	if (won == false) {
		if (squares[idx].style.backgroundColor === pickedColor) {
			displayStatus.textContent = statusWon[random(3)];
			won = true;
			makeSame();
		} else {
			if (vis[idx] === 0)
				displayStatus.textContent = statusLose[random(3)];
			vis[idx] = 1;
			squares[idx].style.backgroundColor = "white";
		}
	}
}

squares[0].addEventListener("click", check(0));
squares[1].addEventListener("click", check(1));
squares[2].addEventListener("click", check(2));
squares[3].addEventListener("click", check(3));
squares[4].addEventListener("click", check(4));
squares[5].addEventListener("click", check(5));

easy.addEventListener("click", generateEasy);
medium.addEventListener("click", generateMedium);
hard.addEventListener("click", generateHard);

function generateEasy() { 
	easy.style.backgroundColor = "#0082c8";
	medium.style.backgroundColor = "#303030";
	hard.style.backgroundColor = "#303030";

	var min1 = random(0, 40);
	var max1 = random(220, 255);	

	console.log("min1 = " + min1);
	console.log("max1 = " + max1);
	console.log("diff = " + (max1 - min1));

	for (var i = 0; i < 6; ++i) {
		squares[i].style.backgroundColor = `rgb(${random(min1,max1)}, ${random(min1,max1)}, ${random(min1,max1)})`;
	}
}

function generateMedium() { 
	easy.style.backgroundColor = "#303030";
	medium.style.backgroundColor = "#0082c8";
	hard.style.backgroundColor = "#303030";

	var min2 = random(0, 106);
	var max2 = random(151, 255);	

	console.log("min2 = " + min2);
	console.log("max2 = " + max2);
	console.log("diff = " + (max2 - min2));

	for (var i = 0; i < 6; ++i) {
		squares[i].style.backgroundColor = `rgb(${random(min2, max2)}, ${random(min2, max2)}, ${random(min2, max2)})`;
	}
}

function generateHard() { 
	easy.style.backgroundColor = "#303030";
	medium.style.backgroundColor = "#303030";
	hard.style.backgroundColor = "#0082c8";

	var min3 = random(0, 106);
	var max3 = random(151, 255);

	console.log("min3 = " + min3);
	console.log("max3 = " + max3);
	console.log("diff = " + (max3 - min3));

	for (var i = 0; i < 6; ++i) {
		squares[i].style.backgroundColor = `rgb(${random(min3, max3)}, ${random(min3, max3)}, ${random(min3, max3)})`;
	}
}