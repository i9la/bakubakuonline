/*////////////////////////////////////////////////////////*/
/*                    Socket.io Client                    */
/*////////////////////////////////////////////////////////*/

var s = io.connect();

/* user connect count */
/*s.on('count change', function(count) {
  $('#usercount').html(count + ' player(s) login.');
});*/

/* get socket session id */
/*s.on('connect', function(msg) {
  $('#connectdata').html(s.socket.transport.sessid);
});*/

/* send fb_id data */
function sendFBID(){s.emit('snd_fbid',{value:fb_id});}
function isAlive(){
  var dtAr = new Array();
  dtAr.push(fb_id);
  dtAr.push(MINE_C);
  s.emit('is_alive',{value:dtAr});
}

/* send fb_id delete request */
function sendFBIDdelete(){
  $('#controller').hide();$('#mapdata').hide();
  $('#myname').hide();$('#0name').hide();$('#1name').hide();$('#2name').hide();
  $('#3name').hide();$('#4name').hide();$('#5name').hide();
  var dieAr = new Array();
  dieAr[0] = fb_id;
  if(MINE_C){
    dieAr[1] = MINE_C;
    dieAr[2] = f_name;
  }

  s.emit('snd_fbidd',{value:dieAr});
  location.href = '/';
}

var runcount2 = 0;
var isGameOver = 0;
function sendFBIDdelete2(){
  var gameOver = function(){
    setInterval(function(){
      if(runcount2 > 5){
        location.href = '/';
      }
      runcount2 += 1;
      if(isGameOver == 0 ){
        $('#controller').hide();$('#mapdata').hide();
        $('#myname').hide();$('#0name').hide();$('#1name').hide();$('#2name').hide();
        $('#3name').hide();$('#4name').hide();$('#5name').hide();
        isGameOver = 1;
        var dieAr = new Array();
        dieAr[0] = fb_id;
        if(MINE_C){
          dieAr[1] = MINE_C;
        }s.emit('snd_fbidd',{value:dieAr});
      }
    },500);
  };
  gameOver();
}

/*////////////////////////////////////////////////////////*/
/*                        Packet                          */
/*                 countinue use socket.io                */
/*////////////////////////////////////////////////////////*/

var MINE_C; //global user color
var OTHER_C = new Array();
var OTHER_N = new Array();
var G_MAPDATA = new Array(); //global map data
var G_OBJDATA = new Array();
var S_MAPDATA = new Array();
var S_OBJDATA = new Array();
var U_POS; //user pos(array))

/* character add in game new user */
function addPacket(){
  var idname = fb_id + ',' + f_name;
  //s.emit('addPK',{value:fb_id});
  s.emit('addPK',{value:idname});
}
/* get result addPacket */
s.on('addRS', function(dat) {
  var datAr = new Array();
  datAr = dat;
  //datAr = dat.value.split(",");
  if(datAr[0] == fb_id){ //if mine data
    $('#menu').hide();
    $('#draw-target').show();
    $('#controller').show();
    $('#mapdata').show();
    $('#myname').show();$('#0name').show();$('#1name').show();$('#2name').show();
    $('#3name').show();$('#4name').show();$('#5name').show();
    /* add user color */
    MINE_C = datAr[1];
  }
});

/* Get periodic mapdata from sv */
s.on('viewPK', function(dat){
  var get_mpdt = new Array();
  get_mpdt = dat;

  var d_mapdata = new Array();
  d_mapdata = $en.De(get_mpdt);
  for(var i=0;i<182;i++){
    if(i < 91){
      //G_MAPDATA[i] = d_mapdata[i];
      S_MAPDATA[i] = d_mapdata[i];
      G_MAPDATA[i] = d_mapdata[i];
    }else{
      //G_OBJDATA[i - 91] = d_mapdata[i];
      S_OBJDATA[i - 91] = d_mapdata[i];
      G_OBJDATA[i - 91] = d_mapdata[i];
    }
  }
  /* add user state */
  U_POS = G_MAPDATA.indexOf(MINE_C);
});

/* Get userlist*/
s.on('viewOC',function(dat){
  OTHER_C = dat;
});
s.on('viewON',function(dat){
  OTHER_N = dat;
});

function movePK(){ //Mouse or Touch act.
  /* unit objdata*/
  //var c_data = G_MAPDATA.concat(G_OBJDATA); 
  var c_data = S_MAPDATA.concat(S_OBJDATA)
  var e_mapdata = $en.En(c_data);
  s.emit('movePK',{value:e_mapdata});
}

function checkUserState(){
  //document.getElementById("mapdata2").innerHTML = 'user pos is ' + U_POS;
}
