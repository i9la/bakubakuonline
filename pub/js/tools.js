/*////////////////////////////////////////////////////////*/
/*                             keys                       */
/*////////////////////////////////////////////////////////*/
var isTouch = ('ontouchstart' in window);
$(document).bind({
  'touchstart mousedown': function(e){
    //e.preventDefault();
    this.pageX = (isTouch ? event.changedTouches[0].pageX :
      e.pageX);
    this.pageY = (isTouch ? event.changedTouches[0].pageY :
      e.pageY);
    /* up */
    if(this.pageX > 270 && this.pageX < 370 &&
       this.pageY > 370 && this.pageY < 470){
      if(G_MAPDATA[U_POS - 13] == 'a' && (U_POS - 13) > -1 &&
         G_OBJDATA[U_POS - 13] == 'A'){
        if(isKey != false){
          S_MAPDATA[U_POS] = 'a';
          S_MAPDATA[U_POS - 13] = MINE_C;
          movePK();isKey = false;
        }
      }
    }
    /* left */
    else if(this.pageX > 158 && this.pageX < 258 &&
            this.pageY > 480 && this.pageY < 580){
      if(U_POS == 0 || U_POS == 13 || U_POS == 26 ||
         U_POS == 39 || U_POS == 52 || U_POS == 65 || 
         U_POS == 78){}else{
        if(G_MAPDATA[U_POS - 1] == 'a'&& 
           G_OBJDATA[U_POS - 1] == 'A'){
          if(isKey != false){
            S_MAPDATA[U_POS] = 'a';
            S_MAPDATA[U_POS - 1] = MINE_C;
            movePK();isKey = false;
          }    
        }
      }
    }
    /* fire */
    else if(this.pageX > 270 && this.pageX < 370 &&
            this.pageY > 480 && this.pageY < 580){
      if(G_OBJDATA[U_POS] == 'A'){
        if(isKey != false){
        S_OBJDATA[U_POS] = 'm8';movePK();isKey = false;
       }
      }
    }
    /* right */
    else if(this.pageX > 382 && this.pageX < 482 &&
            this.pageY > 480 && this.pageY < 580){
      if(U_POS == 12 || U_POS == 25 || U_POS == 38 ||
         U_POS == 51 || U_POS == 64 || U_POS == 77 ||
         U_POS == 90){}else{
        if(G_MAPDATA[U_POS + 1] == 'a' &&
           G_OBJDATA[U_POS + 1] == 'A'){
          if(isKey != false){
            S_MAPDATA[U_POS] = 'a';
            S_MAPDATA[U_POS + 1] = MINE_C;
            movePK();isKey = false;
          }
        }
      }
    }
    /* down */
    else if(this.pageX > 270 && this.pageX < 370 &&
            this.pageY > 592 && this.pageY < 692){
      if(G_MAPDATA[U_POS + 13] == 'a' && (U_POS + 13) < 91 &&
         G_OBJDATA[U_POS + 13] == 'A'){if(isKey != false){
        S_MAPDATA[U_POS] = 'a';
        S_MAPDATA[U_POS + 13] = MINE_C;
        movePK();isKey = false;
      }}
    }
  },
  'touchmove mousemove': function(e){
    //e.preventDefault();
  },
  'touchend mouseup': function(e){
  }
});
