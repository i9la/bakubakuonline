/*////////////////////////////////////////////////////////*/
/*                        Sprites                         */
/*////////////////////////////////////////////////////////*/
var G_OBJDATA = new Array();
var CanvasSprite = function(params) {
  var ctx = params.ctx,
  width = params.width, 
  height = params.height,
  imagesWidth = params.imagesWidth,
  vOffset = 0,
  hOffset = 0,
  hide = false,
  img = new Image();
  img.src = params.images;

  return {
    draw: function(x,y) {
      if(hide){
        return;
      }
      ctx.drawImage(img,hOffset,vOffset,width,height,
          x >> 0, y >> 0, width,height);
    },
    changeImage: function(index){
      index *= width;
      vOffset = mathFloor(index / imagesWidth) * height;
      hOffset = index % imagesWidth;
    },
    show: function() {
      hide = false;
    },
    hide: function() {
      hide = true;
    },
    destroy: function() {
      return;
    }
  };
};
  
var moveSprite = function(params) {
  var x = params.x,
      y = params.y,
      that = CanvasSprite(params);
  that.moveAndDraw = function() {
    that.changeImage(24);
    that.draw(x,y);
  };
  return that;
};

var bouncyBoss = function($drawTarget,ctx){
  moveSprite({
    images: Sdata,
    imagesWidth:576,
    width: 48,
    height: 48,
    $drawTarget: $drawTarget,
    x: 0,
    y: 0,
    ctx: ctx
  });
  
  moveSprite.moveAndDraw();
};

function viewMap(){
  var canvas = $('#draw-target')[0];
  bouncyBoss($('#draw-target'),canvas.getContext("2d"));

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
