var canvas, backgroundImage;
var trackS;
var gameState = 0;
var playerCount;
var database;
var form, player, game;
var car1,cars,car1_img;

function preload(){
track = loadImage("../images/jungle.png");
seed1=loadImage("images/seeds.png");
plant=loadImage("images/plant.png");

}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  seedObj = new Plant();

  seedStock=database.ref('seeds');
  seedStock.on("value",readStock);

  plantedTime=database.ref('plantedTime');
  plantedTime.on("value",function(data){
  lastPlanted=data.val();
  });

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
   
  dog=createSprite(550,250,10,10);
//dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("PLANT SEED");
  feed.position(500,15);
  feed.mousePressed(plantSeeds);

  addFood=createButton("ADD SEEDS");
  addFood.position(400,15);
  addFood.mousePressed(addFoods);

 //next=createButton("NEXT");
  //next.position(800,450);
  //next.mousePressed(nextS);
}


function draw(){
  //if(currentTime==(lastPlanted+1)){
    //update("Playing");
 //}else if(currentTime==(lastPlanted+2)){
  //update("Sleeping");
 //}else if(currentTime>(lastPlanted+2) && currentTime<=(lastPlanted+4)){
  //update("Bathing");
 //}else{
  //update("Hungry")
 //}

  if(playerCount === 1){
    form.play();

  }
  if(gameState === 1){
form.hide();

addFood.position(400,15); 
feed.position(500,15); 

background(46,139,87);
seedObj.display();

plantedTime=database.ref('plantedTime');
plantedTime.on("value",function(data){
  lastPlanted=data.val();
});

fill(255,255,254);
textSize(15);
if(lastPlanted>=12){
  text("Last Planted : "+ lastPlanted%12 + " PM", 150,30);
 }else if(lastPlanted==0){
   text("Last Planted : 12 AM",150,30);
 }else{
   text("Last Planted : "+ lastPlanted + " AM", 150,30);
 }

drawSprites();

  }

}
//function to read food Stock
function readStock(data){
  seedS=data.val();
  seedObj.updateSeedStock(seedS);
}


//function to update food stock and last fed time
function plantSeeds(){

  seedObj.updateSeedStock(seedObj.getSeedStock()-1);
  database.ref('/').update({
    seeds:seedObj.getSeedStock(),
    plantedTime:hour(),
  });
 image(plant,150,50);
}

//function to add food in stock
function addFoods(){
  seedS++;
  database.ref('/').update({
    seeds:seedS
  })
}

//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}

