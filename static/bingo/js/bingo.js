const machine = document.getElementById('bingo-machine')
const button = document.getElementById('bingButton')
const numList = document.getElementById('pres-numbers')
var bingoNumList = [];

for (var i = 1; i <= 75; i++) {
   bingoNumList.push(i);
}

for(let i = bingoNumList.length - 1; i > 0; i--){
  const j = Math.floor(Math.random() * i)
  const temp = bingoNumList[i]
  bingoNumList[i] = bingoNumList[j]
  bingoNumList[j] = temp
}

function bingo(){
	var num = machine.getAttribute('data-number')
	disableButton()
	if (num < 0){
		generateNumber()
	} else {
		saveNumber(num)
		generateNumber()
	}
}

function saveNumber(num){
	var li = document.createElement("li")
	li.appendChild(document.createTextNode(num))
	numList.appendChild(li)
}

function generateNumber(){
	machine.innerHTML="<img class='img-fluid' src='img/machine.gif'>"
	window.setTimeout(function() {
		fillNum()
		enableButton()
  	}, 6000); 
}

function getRandomNum(){
	var popped = bingoNumList.pop()
	return popped
}

function fillNum(num){
	var num = getRandomNum()
	machine.innerHTML= "<span class='circle'>" + num.toString() + "</span>";
	machine.setAttribute('data-number', num)
}

function disableButton(){
	button.innerHTML = "Generating"
	button.disabled = true
	button.removeAttribute("onclick")
}

function enableButton(){
	button.innerHTML = 'Get next number'
	button.disabled = false
	button.onclick = bingo
}

// window.onbeforeunload = function() {
//         return "Refreshing the website will restart the game, continue?";
//     }