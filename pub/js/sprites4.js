/*////////////////////////////////////////////////////////*/
/*                        Sprites                         */
/*////////////////////////////////////////////////////////*/
var posX = [8,56,104,152,200,248,296,344,392,440,488,536,584];
var posY = [12,60,108,156,204,252,300];
var initMap = true;
var countFPS = 0;
var objAr = new Array(91);
var newMapFlag = 
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var dhtmlSprite = function(params) {
  var width = params.width, height = params.height,
  imagesWidth = params.imagesWidth,
  $element = params.$drawTarget.append('<div/>').find(':last'),
  elemStyle = $element[0].style,
  mathFloor = Math.floor; //for speed

  $element.css({
    position: 'absolute',width: width,height: height,
    backgroundImage: 'url(' + params.images + ')'});

  var that = {
    draw: function(x, y) {
      elemStyle.left = x + 'px';elemStyle.top = y + 'px';},
    changeImage: function(index){
      index *= width;
      var vOffset = -mathFloor(index / imagesWidth) * height;
      var hOffset = -index % imagesWidth;
      elemStyle.backgroundPosition = hOffset + 'px ' + vOffset +' px';},
    show: function() {elemStyle.display = 'block';},
    hide: function() {elemStyle.display = 'none';},
    destroy: function() {$element.remove();}
  };
  return that;
};

//var staticMap = function() {
  //var params = {images: Sdata,imagesWidth: 576,width: 48,
                //height: 48,$drawTarget: $('#draw-target')};
  //var num = 0;
 // for(var i=0;i<91;i++){
    //for(var j=0;j<13;j++){
    //var sp = dhtmlSprite(params);
    //objAr[i] = sp;
    //objAr[i].changeImage(72);
    //objAr[i].draw(posX[i],posY[i]);
    //objAr[i].hide();
      //num += 1;
    //}
  //}
//};

var viewMap = function() {
  var startTime = new Date();
  var params = {images: Sdata,imagesWidth: 576,width: 48,
                height: 48,$drawTarget: $('#draw-target')};
  //if(initMap == true){
    //staticMap();
    //initMap = false;
  //}

  var n = 0;
  for(var i=0;i<7;i++){
  for(var j=0;j<13;j++){
    var str = G_MAPDATA[i];
    switch(str){
      case 'a': //null of map
        break;
      case 'c': //Brock
        if(newMapFlag[n] == 0){
          var sp = dhtmlSprite(params);
          sp.changeImage(72);
          sp.draw(posX[j],posY[i]);
          newMapFlag[n] = 1;
        }
        break; 
      case 'd': //Base Brock
        break;
      case 'e':
      case 'g':
      case 'h':
      case 'i':
      case 'j':
      case 'k':
        break;
    }
  n += 1;
  }
  }
  //document.getElementById("mapdata").innerHTML = G_OBJDATA;
  var endTime = new Date();
  var actualFPS = 1000 / (endTime - startTime);
  //document.getElementById("mapdata").innerHTML = acutualFPS;
};

var makeBom = function(fig){
  var result;
  /* if bomb */
  if(G_OBJDATA[fig] == 'm7' || G_OBJDATA[fig] == 'm5' || 
     G_OBJDATA[fig] == 'm3' || G_OBJDATA[fig] == 'm1'){
    result = 85;
  }else if(G_OBJDATA[fig] == 'm6' || G_OBJDATA[fig] == 'm4' ||
    G_OBJDATA[fig] == 'm'){
    result = 84; 
  }else if(G_OBJDATA[fig] == 'm8'|| G_OBJDATA[fig] == 'm2'){
    result = 86;
  /* if fire */
  }else if(G_OBJDATA[fig] == 'n20'|| G_OBJDATA[fig] == 'n'){
    result = 93;
  }else if(G_OBJDATA[fig] == 'n21'|| G_OBJDATA[fig] == 'n1'){
    result = 89;
  }else if(G_OBJDATA[fig] == 'n22' || G_OBJDATA[fig] == 'n2'){
    result = 90;
  }else if(G_OBJDATA[fig] == 'n23' || G_OBJDATA[fig] == 'n3'){
    result = 92;
  }else if(G_OBJDATA[fig] == 'n24' || G_OBJDATA[fig] == 'n4'){
    result = 95;
  }else if(G_OBJDATA[fig] == 'n25' || G_OBJDATA[fig] == 'n5'){
    result = 91;
  }else if(G_OBJDATA[fig] == 'n26' || G_OBJDATA[fig] == 'n6'){
    result = 94;
  }else if(G_OBJDATA[fig] == 'n10'){
    result = 81;
  }else if(G_OBJDATA[fig] == 'n11'){
    result = 77;
  }else if(G_OBJDATA[fig] == 'n12'){
    result = 78;
  }else if(G_OBJDATA[fig] == 'n13'){
    result = 80;
  }else if(G_OBJDATA[fig] == 'n14'){
    result = 83;
  }else if(G_OBJDATA[fig] == 'n15'){
    result = 79;
  }else if(G_OBJDATA[fig] == 'n16'){
    result = 82;
  /* if broken brock */
  }else if(G_OBJDATA[fig] == 'o2'){
    result = 73;
  }else if(G_OBJDATA[fig] == 'o1'){
    result = 74;
  }else if(G_OBJDATA[fig] == 'o'){
    result = 75;
  }
  return result;
};
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
