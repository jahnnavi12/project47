class Plant {
  constructor(){
  this.seedStock=0;
  this.lastPlanted;
  this.image=loadImage('images/seeds.png');
  }

 updateSeedStock(seedStock){
  this.seedStock=seedStock;
 }

 getPlantedTime(lastPlanted){
   this.lastPlanted=lastPlanted;
 }

 deductPlant(){
   if(this.seedStock>0){
    this.seedStock=this.seedStock-1;
   }
  }

  getSeedStock(){
    return this.seedStock;
  }

  display(){
      background("red");

      var x=70,y=100; 
      imageMode(CENTER);
      if(this.seedStock!=0){
      for(var i=0;i<this.seedStock;i++){
        if(i%10==0){
          x=70;
          y=y+50;
        }
        image(this.image,x,y,50,50);
        x=x+30;
      }
    }
  }

//  bedroom(){
//   background(plant1,550,500);  
//  }
    
//  garden(){
 //  background(plant2,550,500);  
 // } 

 // washroom(){
  //  background(plant3,550,500); 
 // }
}