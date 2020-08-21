var bodyText = "";
var prevBodyText = bodyText;
var optionText = [];
var optionAddition = [];
var currentOptionGroup = 0;
var optionGroups = [[0]];
var choiceArray = [];
var startupMessage = "";
var isZerothItem = true;

function startup(){
	initFileReader();
	mainLoop();
}

function mainLoop(){
	setInterval(()=>{
		updateText();
		prevBodyText = bodyText;
	}, 30/1000);
}


function updateText(){
	if(prevBodyText != bodyText){
		let body = document.getElementById("bodyTextWrapper");
		body.innerHTML = bodyText;
		body.scrollTop = body.scrollHeight;
		console.log(">> Updated Body Text");
	}
}

function selectionHandler(flag){
	for(let i = 0; i < optionGroups[currentOptionGroup].length; ++i){
		removeOption(optionGroups[currentOptionGroup][i]);
	}
	choiceArray[choiceArray.length] = flag;
	console.log(choiceArray);
	createSelections(flag+1);
	currentOptionGroup = flag + 1;
	
	//TODO: Random choice from parsed segment
	
	if(optionAddition[flag].includes("<[>")){
		console.log("random choice parsing now");
		var textAddition = optionAddition[flag];
		var temp = optionAddition[flag].substring(optionAddition[flag].indexOf("<[>") + 3);
		temp = temp.substring(0, temp.indexOf("<]>"));
		var tempA = temp.split(",");
		
		var choice = tempA[Math.floor(Math.random() * tempA.length)];
		console.log(choice);
		textAddition = textAddition.replace(/<\[>.+<]>/g, choice);
		bodyText += "<br><br>" + textAddition;
	}
	else{
		bodyText += "<br><br>" + optionAddition[flag];
	}
}

function removeOption(optionNum){
	var el = document.getElementById("option" + optionNum);
	if(el != null){
		var opacity = 1.0;

		var fade = setInterval(() =>{
			if(opacity <= 0){
				el.parentNode.removeChild(el);

				clearTimeout(fade);
			}
			else {
				opacity = opacity - 0.05;
				el.style.opacity = opacity;
			}
		}, 30/1000);
	}
}

function createSelections(setNumber){
	
	for(var e in optionGroups[setNumber]){
		if(optionGroups[setNumber][e] == 0 && isZerothItem){
			createOption(optionGroups[setNumber][e]);
			isZerothItem = false;
		}
		else if(optionGroups[setNumber][e] != 0){
			createOption(optionGroups[setNumber][e]);
		}
		
	}
}

function createOption(optionNum){
	console.log("Making option");
	var div = document.createElement("DIV");
	div.className = "selection";
	div.setAttribute("onclick", "selectionHandler("+optionNum+");");
	div.id = "option" + optionNum;
	div.innerHTML = ">> " + optionText[optionNum];
	div.style.opacity = 0.0;
	document.getElementById("selectionWrapper").appendChild(div);
	
	var opacity = 0;
	setTimeout(() => {
		var fade = setInterval(() => {
			if(opacity >= 1){
				clearTimeout(fade);
				
			}
			else {
				opacity = opacity + 0.05;
				div.style.opacity = opacity;
			}
		}, 30/1000);
	}, 400);
}

function reset(){
	for(let i = 0; i < optionGroups[currentOptionGroup].length; ++i){
		removeOption(optionGroups[currentOptionGroup][i]);
	}
	bodyText = "";
	prevBodyText = bodyText;
	currentOptionGroup = 0;
	isZerothItem = true;
	choiceArray = [];
	bodyText = startupMessage;
	createSelections(0);
}

function stepBack(){
	for(let i = 0; i < optionGroups[currentOptionGroup].length; ++i){
		removeOption(optionGroups[currentOptionGroup][i]);
	}
	bodyText = "";
	prevBodyText = bodyText;
	currentOptionGroup = 0;
	isZerothItem = true;
	bodyText = startupMessage;
	createSelections(0);
	var tempChoiceArray = choiceArray;
	choiceArray = [];
	for(let i = 0; i < tempChoiceArray.length - 1; ++ i){
		selectionHandler(tempChoiceArray[i]);
	}
}