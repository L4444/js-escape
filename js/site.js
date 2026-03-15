"use strict";

let musicPlayer = getElement("musicPlayer");

let sceneView = getElement('sceneView');

let textInfo = getElement('textInfo');
let muteButton = getElement('muteButton');
let muteSymbol = getElement('muteSymbol');

let forwardButton = getElement("forwardButton");
let backwardButton = getElement("backwardButton");
let leftButton = getElement("leftButton");
let rightButton = getElement("rightButton");


muteButton.addEventListener('click', e => {
    console.log('clicked');
   musicPlayer.muted = !musicPlayer.muted;
   
    if(musicPlayer.muted)
    {
        muteSymbol.className = "bi bi-volume-mute fs-2";
    }
    else
    {
        musicPlayer.play();
        muteSymbol.className = "bi bi-volume-up fs-2";
    }
  
   
});
muteButton.click();





let gridMap = new Map();
gridMap.set("0,0", {  name: "home", image: "800x800-barn.png", text: "Test"});
gridMap.set("1,0", { name: "cell", image: "cell.jpg", text: "this is a cell, in jail"});
gridMap.set("2,0", { name: "mine", image: "mine.jpg", text: "Miner"});
gridMap.set("3,0", { name: "saloon", image: "saloon.jpg", text: "Give me a drink, <a href='#'> bartender </a>"});
gridMap.set("4,0",{ name: "fort", image: "fort.jpg", text: "Welcome to the fort"});

let player =  {x: 0, y: 0};


moveTo(0,0);

rightButton.addEventListener('click', e => {
    moveTo(player.x+1, player.y);
});
leftButton.addEventListener('click', e => {
    moveTo(player.x-1, player.y);
});



function pickUp(item)
{
    
}


function getElement(id)
{
    let element = document.querySelector('#' + id);

    if(element == null)
    {
        throw new Error("getElement() couldn't find an element with an id of \'" + id + "\'");
        
    }

    
    return element;
}

function moveTo(x, y)
{
    console.log(`Moving to x:${x} y:${y}`);
    player.x = x;
    player.y = y;
    let scene = getGridCell(player.x, player.y);
    console.log("Scene information...");
    console.log(scene);
    sceneView.src = "scenes/" + scene.image;
    textInfo.innerHTML = scene.text;

    // If the gridcell to the left is "null", disable the button that allows me from moving left
    leftButton.disabled = getGridCell(player.x-1, player.y) == null;

    // If the gridcell to the right is "null", disable the button that allows me from moving right
    rightButton.disabled = getGridCell(player.x+1, player.y) == null;

    // If the gridcell below is "null", disable the button that allows me from moving backwards
    backwardButton.disabled = getGridCell(player.x, player.y+1) == null;

    // If the gridcell above is "null", disable the button that allows me from moving forwards
    forwardButton.disabled = getGridCell(player.x, player.y-1) == null;
   

}

function getGridCell(x, y)
{
    return gridMap.get(`${x},${y}`);
}