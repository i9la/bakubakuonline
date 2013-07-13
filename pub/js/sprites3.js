/*////////////////////////////////////////////////////////*/
/*                        Sprites3                        */
/*////////////////////////////////////////////////////////*/
var posX = [8,56,104,152,200,248,296,344,392,440,488,536,584];
var posY = [12,60,108,156,204,252,300];
var G_OBJDATA = new Array();
var newCharFlag = 0;
var newMapFlag = 
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
   0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
   0,0,0,0,0,0,0,0,0,0,0,0,0];
var newObjFlag = 0; 
var chAr = new Array(6); //charactor Array;
var spAr = new Array(91);
var objAr = new Array(91);

var DTMLSprite = function(params) {
  var width = params.width, 
  height = params.height,
  imagesWidth = params.imagesWidth,
  $element = params.$drawTarget.append('<div/>').find(':last'),
  elemStyle = $element[0].style,
  mathFloor = Math.floor; //for speed

  $element.css({
    position: 'absolute',
    width: width,
    height: height,
    backgroundImage: 'url(' + params.images + ')'
  });

  var that = {
    draw: function(x, y) {
      elemStyle.left = x + 'px';
      elemStyle.top = y + 'px';
    },
    changeImage: function(index){
      index *= width;
      var vOffset = -mathFloor(index / imagesWidth) * height;
      var hOffset = -index % imagesWidth;
      elemStyle.backgroundPosition = hOffset + 'px ' + vOffset + 'px'; 
    },
    show: function() {
      elemStyle.display = 'block';
    },
    hide: function() {
      elemStyle.display = 'none';
    },
    destroy: function() {
      $element.remove();
    }
  };
  /* return DTMLSprite instance */
  return that;
};

function viewMap(){
  var startTime = new Date();
  //var myPosLeft,myPosTop;
  var params = {
    images: Sdata,
    imagesWidth: 576,
    width: 48,
    height: 48,
    $drawTarget: $('#draw-target')
  };

  /* object  */
  if(newObjFlag == 0){
    for(var i=0;i<objAr.length;i++){
      objAr[i] = DTMLSprite(params);
      objAr[i].hide();
    }
    newObjFlag = 1;
  }

  /* charactor */
  if(newCharFlag == 0){
    for(var i=0;i<chAr.length;i++){
      chAr[i] = DTMLSprite(params);
      chAr[i].changeImage(i * 12);
      chAr[i].hide();
    }
    newCharFlag = 1;
  }else if((newCharFlag == 1) && (G_MAPDATA.indexOf("e") == -1)){
    chAr[0].hide(); //if continue hide()...lag
  }else if((newCharFlag == 1) && (G_MAPDATA.indexOf("g") == -1)){
    chAr[1].hide();
  }else if((newCharFlag == 1) && (G_MAPDATA.indexOf("h") == -1)){
    chAr[2].hide();
  }else if((newCharFlag == 1) && (G_MAPDATA.indexOf("i") == -1)){
    chAr[3].hide();
  }else if((newCharFlag == 1) && (G_MAPDATA.indexOf("j") == -1)){
    chAr[4].hide();
  }else if((newCharFlag == 1) && (G_MAPDATA.indexOf("k") == -1)){
    chAr[5].hide();
  }

  /* init other user name */
  var elem = document.getElementById("0name");
  elem.innerHTML = '';
  elem = document.getElementById("1name");
  elem.innerHTML = '';
  elem = document.getElementById("2name");
  elem.innerHTML = '';
  elem = document.getElementById("3name");
  elem.innerHTML = '';
  elem = document.getElementById("4name");
  elem.innerHTML = '';
  elem = document.getElementById("5name");
  elem.innerHTML = '';


  var n = 0;
  for(var i=0;i<7;i++){
  for(var j=0;j<13;j++){

    var str = G_MAPDATA[n];

   if(str == MINE_C){ //My name view
      var elem = document.getElementById("myname");
      elem.innerHTML = f_name;elem.style.position = 'absolute';
      elem.style.left = (posX[j] + 10) + 'px';elem.style.top = (posY[i] + 50) + 'px';
    }else if(str == OTHER_C[0]){ //Other name
      var elem = document.getElementById("0name");
      elem.innerHTML = OTHER_N[0];elem.style.position = 'absolute';
      elem.style.left = (posX[j] + 10) + 'px';elem.style.top = (posY[i] + 50) + 'px';
    }else if(str == OTHER_C[1]){
      var elem = document.getElementById("1name");
      elem.innerHTML = OTHER_N[1];elem.style.position = 'absolute';
      elem.style.left = (posX[j] + 10) + 'px';elem.style.top = (posY[i] + 50) + 'px';
    }else if(str == OTHER_C[2]){
      var elem = document.getElementById("2name");
      elem.innerHTML = OTHER_N[2];elem.style.position = 'absolute';
      elem.style.left = (posX[j] + 10) + 'px';elem.style.top = (posY[i] + 50) + 'px';
    }else if(str == OTHER_C[3]){
      var elem = document.getElementById("3name");
      elem.innerHTML = OTHER_N[3];elem.style.position = 'absolute';
      elem.style.left = (posX[j] + 10) + 'px';elem.style.top = (posY[i] + 50) + 'px';
    }else if(str == OTHER_C[4]){
      var elem = document.getElementById("4name");
      elem.innerHTML = OTHER_N[4];elem.style.position = 'absolute';
      elem.style.left = (posX[j] + 10) + 'px';elem.style.top = (posY[i] + 50) + 'px';
    }else if(str == OTHER_C[5]){
      var elem = document.getElementById("5name");
      elem.innerHTML = OTHER_N[5];elem.style.position = 'absolute';
      elem.style.left = (posX[j] + 10) + 'px';elem.style.top = (posY[i] + 50) + 'px';
    }

      switch(str){
      case 'a': //null of map
        if(G_OBJDATA[n] == 'A'){
          if(objAr[n]){ //alredy made child
            objAr[n].hide(); //IMPORTANT
          }
        /* broken brock */
        }else if(G_OBJDATA[n] == 'o2' || G_OBJDATA[n] == 'o1' || G_OBJDATA[n] == 'o'){
          spAr[n].hide();
          objAr[n].show();
          objAr[n].changeImage(makeBomb(G_OBJDATA[n]));
          objAr[n].draw(posX[j],posY[i]);
        }else if(G_OBJDATA[n] == 's'){
          objAr[n].show();
          objAr[n].changeImage(102);
          objAr[n].draw(posX[j],posY[i]);
        }else{ //else == BOMB
          objAr[n].show(); //IMPORTANT
          objAr[n].changeImage(makeBomb(G_OBJDATA[n]));
          objAr[n].draw(posX[j],posY[i]);
        }
        break;
      case 'c': //Brock
        if(newMapFlag[n] == 0){
          spAr[n] = DTMLSprite(params);
          spAr[n].changeImage(72);
          spAr[n].draw(posX[j],posY[i]);
          newMapFlag[n] = 1;
        }
        break; 
      case 'd': //Base Brock
        break;
      case 'e':
        if(G_OBJDATA[n] == 'A'){
          if(objAr[n]){ //alredy made child
            objAr[n].hide(); //IMPORTANT
          }
          chAr[0].show();
          chAr[0].draw(posX[j],posY[i]);
        }else{
          objAr[n].show(); //IMPORTANT
          objAr[n].changeImage(makeBomb(G_OBJDATA[n]));
          objAr[n].draw(posX[j],posY[i]);
          chAr[0].show();
          chAr[0].draw(posX[j],posY[i]);
        }
        break;
      case 'g': //second char 
        if(G_OBJDATA[n] == 'A'){
          if(objAr[n]){ //alredy made child
            objAr[n].hide(); //IMPORTANT
          }
          chAr[1].show();
          chAr[1].draw(posX[j],posY[i]);
        }else{
          objAr[n].show(); //IMPORTANT
          objAr[n].changeImage(makeBomb(G_OBJDATA[n]));
          objAr[n].draw(posX[j],posY[i]);
          chAr[1].show();
          chAr[1].draw(posX[j],posY[i]);
        }
        break;
      case 'h': //second char 
        if(G_OBJDATA[n] == 'A'){
          if(objAr[n]){ //alredy made child
            objAr[n].hide(); //IMPORTANT
          }
          chAr[2].show();
          chAr[2].draw(posX[j],posY[i]);
        }else{
          objAr[n].show(); //IMPORTANT
          objAr[n].changeImage(makeBomb(G_OBJDATA[n]));
          objAr[n].draw(posX[j],posY[i]);
          chAr[2].show();
          chAr[2].draw(posX[j],posY[i]);
        }
        break;
      case 'i': //second char 
        if(G_OBJDATA[n] == 'A'){
          if(objAr[n]){ //alredy made child
            objAr[n].hide(); //IMPORTANT
          }
          chAr[3].show();
          chAr[3].draw(posX[j],posY[i]);
        }else{
          objAr[n].show(); //IMPORTANT
          objAr[n].changeImage(makeBomb(G_OBJDATA[n]));
          objAr[n].draw(posX[j],posY[i]);
          chAr[3].show();
          chAr[3].draw(posX[j],posY[i]);
        }
        break;
      case 'j': //second char 
        if(G_OBJDATA[n] == 'A'){
          if(objAr[n]){ //alredy made child
            objAr[n].hide(); //IMPORTANT
          }
          chAr[4].show();
          chAr[4].draw(posX[j],posY[i]);
        }else{
          objAr[n].show(); //IMPORTANT
          objAr[n].changeImage(makeBomb(G_OBJDATA[n]));
          objAr[n].draw(posX[j],posY[i]);
          chAr[4].show();
          chAr[4].draw(posX[j],posY[i]);
        }
        break;
      case 'k': //second char 
        if(G_OBJDATA[n] == 'A'){
          if(objAr[n]){ //alredy made child
            objAr[n].hide(); //IMPORTANT
          }
          chAr[5].show();
          chAr[5].draw(posX[j],posY[i]);
        }else{
          objAr[n].show(); //IMPORTANT
          objAr[n].changeImage(makeBomb(G_OBJDATA[n]));
          objAr[n].draw(posX[j],posY[i]);
          chAr[5].show();
          chAr[5].draw(posX[j],posY[i]);
        }
        break;
      }
    n += 1;
  }
  }

  var endTime = new Date();
  var actualFPS = 1000 / (endTime - startTime);
    var strFPS;
    if(actualFPS > 999){
      strFPS = 'load 100%';
    }
    else if(actualFPS > 500){
      strFPS = 'load 50%';
    }
    else if(actualFPS > 250){
      strFPS = 'load 25% feel lag';
    }else{
      strFPS = 'load 0% feel strong lag';
    }
    document.getElementById("mapdata").innerHTML = strFPS;
}

var makeBomb = function(n){
  var result;
  /* if bomb */
  if(n == 'm7' || n == 'm5' || n == 'm3' || n == 'm1'){
    result = 85;
  }else if(n == 'm6' || n == 'm4' ||n == 'm'){result = 84; 
  }else if(n == 'm8'|| n == 'm2'){result = 86;
  /* if fire */
  }else if(n == 'n20'|| n == 'n'){result = 93;
  }else if(n == 'n21'|| n == 'n1'){result = 89;
  }else if(n == 'n22' || n == 'n2'){result = 90;
  }else if(n == 'n23' || n == 'n3'){result = 92;
  }else if(n == 'n24' || n == 'n4'){result = 95;
  }else if(n == 'n25' || n == 'n5'){result = 91;
  }else if(n == 'n26' || n == 'n6'){result = 94;
  }else if(n == 'n10'){result = 81;
  }else if(n == 'n11'){result = 77;
  }else if(n == 'n12'){result = 78;
  }else if(n == 'n13'){result = 80;
  }else if(n == 'n14'){result = 83;
  }else if(n == 'n15'){result = 79;
  }else if(n == 'n16'){result = 82;
  /* if broken brock */
  }else if(n == 'o2'){result = 73;
  }else if(n == 'o1'){result = 74;
  }else if(n == 'o'){result = 75;
  /* if Mob*/
  }else if(n == 's'){resut = 102;
  /* mob crash die*/
  }else if(n == 'p2'){result = 73;
  }else if(n == 'p1'){result= 74;
  }else if(n == 'p'){result = 75;
  }return result;
};

function checkUserState(){
  /* bomb and mob collision */
  var po = G_OBJDATA[U_POS];
  if(po == 'n20'||po == 'n21'||po == 'n22'||po == 'n23'||po == 'n24'||po == 'n25'||po == 'n26'
   ||po == 'n10'||po == 'n11'||po == 'n12'||po == 'n13'||po == 'n14'||po == 'n15'||po == 'n16'
   ||po == 'n'||po == 'n1'||po == 'n2'||po == 'n3'||po == 'n4'||po == 'n5'||po == 'n6'
   ||po == 's'||po == 'u'||po == 'v'){
    sendFBIDdelete2();
   }
}
/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * */
