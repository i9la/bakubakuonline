/*////////////////////////////////////////////////////////////////////////////////////////////////*/
/*                                      Baku Baku Online Server                                   */
/*                                      Last modified:2012/9/25                                   */
/*////////////////////////////////////////////////////////////////////////////////////////////////*/

var express = require('express');
//  , routes = require('./routes')
var  socketIO = require('socket.io');
var  mongoose = require('mongoose');

//var app = express.createServer();
var app = express();

/* express config */
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view options', {layout: false});
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
 // app.use(app.router);
  app.use(express.static(__dirname + '/pub'));
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

/*////////////////////////////////////////////////////////*/
/*                        Mongo DB                        */
/*////////////////////////////////////////////////////////*/

/* Define user data */
var Schema = mongoose.Schema;
var FBdata = new Schema({
  fb_id: String, //FacebookID Unite fb_id and f_name ?
  f_name: String, //first_name
  //gender: String, //male or female or define or can`t acsess
  //lv: String //Level in Game 
});
mongoose.model('fbdat', FBdata);

/* Use mongoDB */
var db = mongoose.connect('mongodb://localhost/test');
//etc..

/*////////////////////////////////////////////////////////*/
/*                     Express Request                    */
/*////////////////////////////////////////////////////////*/

/* Routes default */
app.get('/', function(req, res){
  res.render('index',{msg: ''});
});

/* Login app with fb_id + f_name and MongoDB*/
//var combieIN ;//= fb_id + ',' + f_name; //need name in game
app.get('/login', function(req, res){
  var fb_id = req.param('fb_id');
  var isApp = req.param('isapp');
  var f_name = req.param('f_name');
  //combieIN = fb_id + ',' + f_name;
  //FNAME.push(combieIN);
  res.render('app', {msg:'', 
             isapp:isApp,fb_id:fb_id,f_name:f_name});
});

/* app request */
/*app.get('/app',function(req, res){
  var res_error = function(mes){
    res.render('index',{mes:'error'});};
  var res_success = function(mes){
    res.render('app',{mes:'ok'});};

});*/

//app.listen(44944);
//console.log('Listen port %d', app.address().port);
//console.log('%s mode', app.settings.env);

/*////////////////////////////////////////////////////////*/
/*                      Socket.io                         */
/*////////////////////////////////////////////////////////*/
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
//var io = socketIO.listen(app);
server.listen(44944);

io.settings.log = false; //not view debugs

/* defined datas */
var IDAR = new Array(); //fb_id Array
var ROOM_AR = new Array(); //max 6 users can play
var ROOMCO_AR = new Array(); //with ROOM_AR
var OTHER_C = new Array();
var OTHER_N = new Array();
var isAliveAr = new Array();
var G_MAPDATA = new Array (); //glovale mapdata
  G_MAPDATA = [
    'a','a','a','a','a','a','a','a','a','a','a','a','a',
    'a','d','c','d','c','d','a','d','a','d','a','d','a',
    'c','c','c','c','c','c','c','c','c','c','c','c','c',
    'a','d','a','d','c','d','a','d','a','d','c','d','c',
    'a','c','c','c','c','c','a','a','a','c','c','c','c',
    'a','d','a','d','a','d','a','d','a','d','a','d','a', 
    'a','a','a','c','c','a','a','a','a','a','c','a','a'];
var G_OBJDATA = new Array();
  G_OBJDATA = [
    'A','A','A','A','A','A','A','A','A','A','A','A','A',
    'A','A','A','A','A','A','A','A','A','A','A','A','A',
    'A','A','A','A','A','A','A','A','A','A','A','A','A',
    'A','A','A','A','A','A','A','A','s','A','A','A','A',
    'A','A','A','A','A','A','A','A','A','A','A','A','A',
    'A','A','A','A','A','A','A','A','A','A','A','A','A',
    'A','A','A','A','A','A','A','A','A','A','A','A','A'];
var UNI_DATA;
var n2Ar = new Array(); //make num bomb
var l_objdata = new Array(); //make bomb array
var wasLogin = false;
var blockPop = 0;
var mobPopTimer = 0;

io.sockets.on('connection', function(socket) {
  /* login user */
  socket.on('disconnect', function() {
    /* disconnect */
  });
  /* 'snd_fbid'と'snd_fbidd'はもし二つの画面を開こうが、
   * ログオフボタン押さないかぎり、fb_idはサーバで継続して
   * 維持する。つまり二重ログインできるが同じ画面を表示する。*/
  socket.on('snd_fbid', function(dat) {
    if(IDAR.indexOf(dat.value) != -1){
      /* already login userID */
    }else{
      IDAR.push(dat.value);
      /* New user login */
      wasLogin = true;
    }
  });
  socket.on('snd_fbidd', function(dat) {
    var dieAr = new Array();
    dieAr = dat.value;
    console.log(dieAr);
    if(IDAR.indexOf(dieAr[0]) != -1){
      /* foundId delete */
      IDAR.splice(IDAR.indexOf(dieAr[0]),1);
      ROOM_AR.splice(ROOM_AR.indexOf(dieAr[0]),1);
      ROOMCO_AR.splice(ROOMCO_AR.indexOf(dieAr[1]),1);
      OTHER_C.splice(OTHER_C.indexOf(dieAr[1]),1);
      OTHER_N.splice(OTHER_N.indexOf(dieAr[2]),1);
      var e = G_MAPDATA.indexOf(dieAr[1]);
      G_MAPDATA[e] = 'a';
      G_OBJDATA[e] = 'p2';
    }
  });

  /*//////////////////////////////////////////////////////*/
  /*                "addPK" login test field              */
  /*//////////////////////////////////////////////////////*/
  
  socket.on('addPK', function(dat) {
    var datAr = new Array();
    datAr = dat.value.split(",");
    /* this is only test field */
    if(ROOM_AR.indexOf(datAr[0]) != -1){
      /* already login userID(if need should log off) */
    }else{
      if( ROOM_AR.length > 5 ){
        /* room is full */
        console.log('ROOM is full ' + ROOM_AR);
      }else{
        ROOM_AR.push(datAr[0]);
        OTHER_N.push(datAr[1]); // f_name add
        console.log('Login room members are ' + ROOM_AR);
      
        var addRes = new Array();
        addRes.push(datAr[0]);

        if(ROOMCO_AR.indexOf("e") == -1){
          ROOMCO_AR.push('e');
          addRes.push('e');
          OTHER_C.push('e');
        }else if(ROOMCO_AR.indexOf("g") == -1){
          ROOMCO_AR.push('g');
          addRes.push('g');
          OTHER_C.push('g');
        }else if(ROOMCO_AR.indexOf("h") == -1){
          ROOMCO_AR.push('h');
          addRes.push('h');
          OTHER_C.push('h');
        }else if(ROOMCO_AR.indexOf("i") == -1){
          ROOMCO_AR.push('i');
          addRes.push('i');
          OTHER_C.push('i');
        }else if(ROOMCO_AR.indexOf("j") == -1){
          ROOMCO_AR.push('j');
          addRes.push('j');
          OTHER_C.push('j');
        }else if(ROOMCO_AR.indexOf("k") == -1){
          ROOMCO_AR.push('k');
          addRes.push('k');
          OTHER_C.push('k');
        } //if need else,msg"room is full".    
        //addRes.push(datAr[1]); //push name too    
        io.sockets.emit('addRS',addRes);
        console.log('addRS is ' + addRes);
      }
    }
  });

  /*////////////////////////////////////////////////////////*/
  /*                 is_alive packet from client            */
  /*////////////////////////////////////////////////////////*/
  socket.on('is_alive',function(dat){
    var getAr = new Array();
    getAr = dat.value;
    if(isAliveAr.indexOf(getAr[0]) == -1){
      isAliveAr.push(getAr[0]);
      console.log('isAliveAr are ' + isAliveAr);
    }});
  
  /*////////////////////////////////////////////////////////*/
  /*                 move packet from client                */
  /*////////////////////////////////////////////////////////*/
  socket.on('movePK',function(dat){
    var get_mpdt = new Array();
    get_mpdt = dat.value;
    //console.log('get_mpdt is ' + get_mpdt);
    
    var d_mapdata = new Array();
    d_mapdata = $en.De(get_mpdt);
    for(var i=0;i<182;i++){
      if(i < 91){
        G_MAPDATA[i] = d_mapdata[i];
      }else{
        G_OBJDATA[i - 91] = d_mapdata[i];
      }
    }
    console.log('get_mpdt is ' + G_MAPDATA);
  });
});

/*////////////////////////////////////////////////////////*/
/*                      Game loop                         */
/*////////////////////////////////////////////////////////*/

var init = function(){
  /* unit data for send data */
  var c_data = G_MAPDATA.concat(G_OBJDATA);
  UNI_DATA = $en.En(c_data);
};
var runCount = 0;
var runCount2 = 0;
var run = function(){
  setInterval(function(){
    if(ROOM_AR.length > 0){
      map();
      if(runCount2 > 2){
        checkIsAlive();
        runCount2 = 0;
      }
      runCount2 += 1;
    }else if(ROOM_AR.length == 0 && wasLogin == true){
        map();
        runCount += 1;
        if(runCount > 12){
          wasLogin = false;
          runCount = 0;
        }
    }
    console.log('ROOM_AR is ' + ROOM_AR);
  },333);
};

/*/////////////////*/
/* send map packet */
/*/////////////////*/
var map = function() {
  
  //* add user post and directuion number*/
  if(ROOMCO_AR){
    for(var i=0;i<ROOMCO_AR.length;i++){
      if(G_MAPDATA.indexOf(ROOMCO_AR[i]) == -1){
        if(G_MAPDATA[0] == 'a'){G_MAPDATA[0] = ROOMCO_AR[i];
        }else if(G_MAPDATA[90] == 'a'){ G_MAPDATA[90] = ROOMCO_AR[i];
        }else if(G_MAPDATA[78] == 'a'){ G_MAPDATA[78] = ROOMCO_AR[i];
        }else if(G_MAPDATA[12] == 'a'){ G_MAPDATA[12] = ROOMCO_AR[i];
        }else if(G_MAPDATA[84] == 'a'){ G_MAPDATA[84] = ROOMCO_AR[i];
        }else if(G_MAPDATA[6] == 'a'){  G_MAPDATA[6] = ROOMCO_AR[i]; }}}}
  
  /* get bomb status tick tack */
  for(var i=0;i<91;i++){
    switch(G_OBJDATA[i]){
      case 'm8':n2Ar.push(i);G_OBJDATA[i] = 'm7';break;
      case 'm7':G_OBJDATA[i] = 'm6';break;
      case 'm6':G_OBJDATA[i] = 'm5';break;
      case 'm5':G_OBJDATA[i] = 'm4';break;
      case 'm4':G_OBJDATA[i] = 'm3';break;
      case 'm3':G_OBJDATA[i] = 'm2';break;
      case 'm2':G_OBJDATA[i] = 'm1';break;
      case 'm1':G_OBJDATA[i] = 'm';break;
      case 'm':G_OBJDATA[i] = 'n22';break;

      case 'n20':G_OBJDATA[i] = 'n10';break; //up
      case 'n21':G_OBJDATA[i] = 'n11';break; //left
      case 'n22':G_OBJDATA[i] = 'n12';break; //center
      case 'n23':G_OBJDATA[i] = 'n13';break; //right
      case 'n24':G_OBJDATA[i] = 'n14';break; //down

      case 'n10':G_OBJDATA[i] = 'n';break;
      case 'n11':G_OBJDATA[i] = 'n1';break;
      case 'n12':G_OBJDATA[i] = 'n2';break;
      case 'n13':G_OBJDATA[i] = 'n3';break;
      case 'n14':G_OBJDATA[i] = 'n4';break;
      
      case 'n':G_OBJDATA[i] = 'A';break;
      case 'n1':G_OBJDATA[i] = 'A';break;
      case 'n2':G_OBJDATA[i] = 'A';break;
      case 'n3':G_OBJDATA[i] = 'A';break;
      case 'n4':G_OBJDATA[i] = 'A';break;

      case 'o2':G_OBJDATA[i] = 'o1';break;
      case 'o1':G_OBJDATA[i] = 'o';break;
      case 'o':G_OBJDATA[i] = 'A';break;
      
      case 'p2':G_OBJDATA[i] = 'p1';break;
      case 'p1':G_OBJDATA[i] = 'p';break;
      case 'p':G_OBJDATA[i] = 'A';break;
    }
  }
  
  var evenNum = [13,15,17,19,21,23,25,39,41,43,45,47,49,51,65,67,69,71,73,75,77];
  var evenNumCornL = [26,52,78];
  var evenNumCornR = [12,38,64];
  var NSCornL = [1,3,5,7,9,11,26,27,29,31,33,35,37,52,53,55,57,59,61,63,78];
  var NSCornR = [1,3,5,7,9,11,12,27,29,31,33,35,37,38,53,55,57,59,61,63,64];
  var ONS = [1,3,5,7,9,11,27,29,31,33,35,37,53,55,57,59,61,63];

  /* Mob AI */
  var po;
  for(var i=0; i < 91; i++){ if(G_OBJDATA[i] == 's'){po = i; }}
  var pp = po;var landMov = 1 + Math.floor(Math.random() * 13);
  if(landMov == 1){var p = G_MAPDATA[po - 1];var q = G_OBJDATA[po - 1];
  if(p == 'a'||p == 'e'||p == 'g'||p == 'h'||p == 'i'||p == 'j'||p == 'k'){
    if(q == 'm13'||q == 'm12'||q == 'm11'||q == 'm8'||q == 'm7'||q == 'm6'||q == 'm5'
     ||q == 'm4'||q == 'm3'||q == 'm2'||q == 'm1'||q == 'm'){}else{
      if(evenNumCornL.indexOf(po) == -1){ pp = po - 1; }}}}
  else if(landMov == 2){p = G_MAPDATA[po + 1];q = G_OBJDATA[po + 1];
    if(p == 'a'||p == 'e'||p == 'g'||p == 'h'||p == 'i'||p == 'j'||p == 'k'){
      if(q == 'm13'||q == 'm12'||q == 'm11'||q == 'm8'||q == 'm7'||q == 'm6'||q == 'm5'
       ||q == 'm4'||q == 'm3'||q == 'm2'||q == 'm1'||q == 'm'){}else{
        if(evenNumCornR.indexOf(po) == -1){ pp = po + 1; }}}}
  else if(landMov == 3){p = G_MAPDATA[po - 13];q = G_OBJDATA[po - 13];
    if(p == 'a'||p == 'e'||p == 'g'||p == 'h'||p == 'i'||p == 'j'||p == 'k'){
      if(q == 'm13'||q == 'm12'||q == 'm11'||q == 'm8'||q == 'm7'||q == 'm6'||q == 'm5'
       ||q == 'm4'||q == 'm3'||q == 'm2'||q == 'm1'||q == 'm'){}else{
        if(ONS.indexOf(po) == -1){ pp = po - 13; }}}}
  else if(landMov == 4){p = G_MAPDATA[po + 13];q = G_OBJDATA[po + 13];
    if(p == 'a'||p == 'e'||p == 'g'||p == 'h'||p == 'i'||p == 'j'||p == 'k'){
      if(q == 'm13'||q == 'm12'||q == 'm11'||q == 'm8'||q == 'm7'||q == 'm6'||q == 'm5'
       ||q == 'm4'||q == 'm3'||q == 'm2'||q == 'm1'||q == 'm'){}else{
        if(ONS.indexOf(po) == -1){ pp = po + 13; }}}}
  G_OBJDATA[po] = 'A';G_OBJDATA[pp] = 's';

  if(n2Ar){
    for(var i=0;i < G_OBJDATA.length;i++){ l_objdata[i] = G_OBJDATA[i]; }

    for(var i=0;i < n2Ar.length;i++){
      if(l_objdata[n2Ar[i]] == 'm'){ //reach Bomb
        var po =  n2Ar[i];
        var isOdd = false; //odd or even
        if(evenNum.indexOf(po) == -1){ isOdd = true; }
        l_objdata[po] = 'n22';

        switch(isOdd){
          case true: //is odd
            if(l_objdata[po - 1] == 's')
              {l_objdata[po - 1] = 'p2';
            }else if(l_objdata[po - 1] == 'A' && evenNumCornL.indexOf(po) == -1){
              if(G_MAPDATA[po - 1] == 'c'){
                l_objdata[po - 1] = 'o2';G_MAPDATA[po - 1] = 'a';
              }else{ l_objdata[po - 1] = 'n21';}}
            if(l_objdata[po + 1] == 's')
              {l_objdata[po + 1] = 'p2';
            }else if(l_objdata[po + 1] == 'A' && evenNumCornR.indexOf(po) == -1){
              if(G_MAPDATA[po + 1] == 'c'){
                l_objdata[po + 1] = 'o2';G_MAPDATA[po + 1] = 'a';
              }else{l_objdata[po + 1] = 'n23';}}
          case false:
            if(l_objdata[po - 13] == 's')
              {l_objdata[po - 13] = 'p2';
            }else if(l_objdata[po - 13] == 'A'){
              if(G_MAPDATA[po - 13] == 'c'){
                l_objdata[po - 13] = 'o2';G_MAPDATA[po - 13] = 'a';
              }else{l_objdata[po - 13] = 'n20';}}
            if(l_objdata[po + 13] == 's')
              {l_objdata[po + 13] = 'p2';
            }else if(l_objdata[po + 13] == 'A'){
              if(G_MAPDATA[po + 13] == 'c'){
                l_objdata[po + 13] = 'o2';G_MAPDATA[po + 13] = 'a';
              }else{l_objdata[po + 13] = 'n24';}}
        }
         
        /* combi bomb */  
        var s = G_OBJDATA[po - 1];
        if(s == 'm12'||s == 'm11'||s == 'm7' || s == 'm6' || s == 'm5' || s == 'm4'
        || s == 'm3' || s == 'm2'){
          l_objdata[po - 1] = 'm1';}
        s = G_OBJDATA[po + 1];
        if(s == 'm12'||s == 'm11'||s == 'm7' || s == 'm6' || s == 'm5' || s == 'm4'
        || s == 'm3' || s == 'm2' ){
          l_objdata[po + 1] = 'm1';}
        s = G_OBJDATA[po - 13];
        if(s == 'm12'||s == 'm11'||s == 'm7' || s == 'm6' || s == 'm5' || s == 'm4'
        || s == 'm3' || s == 'm2' ){
          l_objdata[po - 13] = 'm1';}
        s = G_OBJDATA[po + 13];
        if(s == 'm12'||s == 'm11'||s == 'm7' || s == 'm6' || s == 'm5' || s == 'm4'
         ||s == 'm3' || s == 'm2'){
          l_objdata[po + 13] = 'm1';}

        n2Ar[i] = '-1'; //kill
      }
    }

    for(var i=0;i < 91;i++){ G_OBJDATA[i] = l_objdata[i]; }
    for(var i=0;i < n2Ar.length;i++){ if(n2Ar[i] == '-1'){ n2Ar.slice(i,1); }}
  }

  /* block pop up */
  blockPop = 0;
  var notPopAr = [0,1,5,6,7,11,12,13,19,25,65,71,77,78,79,83,84,85,89,90];
  for(var i=0;i<91;i++){if(G_MAPDATA[i] == 'c'){blockPop += 1;}}
  if(blockPop < 30){
    var landPop = Math.floor(Math.random() * 91);
    if(notPopAr.indexOf(landPop) == -1){
      if(G_MAPDATA[landPop] == 'a' && G_OBJDATA[landPop] == 'A'){
        G_MAPDATA[landPop] = 'c';}}
  }
  /* mob pop up S */
  if(G_OBJDATA.indexOf('s') == -1){
    var landPopS = Math.floor(Math.random() * 91);
    if(notPopAr.indexOf(landPopS) == -1){
    if(G_MAPDATA[landPopS] == 'a' && G_OBJDATA[landPopS] == 'A'){
      mobPopTimer += 1;
      if(mobPopTimer > 12){G_OBJDATA[landPopS] = 's';mobPopTimer = 0;}}}}

  /* unit data for send data */
  var c_data = G_MAPDATA.concat(G_OBJDATA);
  UNI_DATA = $en.En(c_data);

  /* socket emit mapdata all Client */
  io.sockets.emit('viewPK',UNI_DATA);
  io.sockets.emit('viewOC',OTHER_C);
  io.sockets.emit('viewON',OTHER_N);
  //console.log('Senddata(UNI_DATA is )' + UNI_DATA);
  console.log('G_MAPDATA is ' +  G_MAPDATA);
  console.log('G_OBJDATA is ' + G_OBJDATA);
  //console.log('FNAME is ' + FNAME);

};

/*////////////////////////////////////////////////////////*/
/*                     Check user is Alive                */
/*////////////////////////////////////////////////////////*/
var checkIsAlive = function(){
      
  for(var i=0;i<ROOM_AR.length;i++){
    if(isAliveAr.indexOf(ROOM_AR[i]) == -1){
      var e = G_MAPDATA.indexOf(ROOMCO_AR[i]);
      ROOMCO_AR.splice(ROOMCO_AR.indexOf(ROOMCO_AR[i]),1);
      ROOM_AR.splice(ROOM_AR.indexOf(ROOM_AR[i]),1);
      //OTHER_C
      //OTHER_N
      G_MAPDATA[e] = 'a';
      G_OBJDATA[e] = 'p2';
    }
  }
  isAliveAr = [];//isAliveC = [];*/
};

/*////////////////////////////////////////////////////////*/
/*                        Encode                          */
/*////////////////////////////////////////////////////////*/

var $en = {
  /* 0,0,0... -> 0xnum */
  En: function(str) {
    var str;
    var result = new Array();
    var i;
    this.str = str;
    this.result = result;

    for (i=0;i<str.length;i++){
      var aa = new Array(2);
      aa[0] = str[i] + 'x';
      aa[1] = 1;
      while (str[i] == str[1 + i]) {
        aa[1] += 1;
        str.shift();
      }
      var joinStr = aa[0] + aa[1];
      result.push(joinStr);
    }
    return result;
    //console.log(result);
  },
  De: function(str) { //0xnum -> 0,0,0
    var str;
    var result = new Array();
    var i,j;
    this.str = str;
    this.result = result;

    var count = 0;
    var arCount = str.length;
    for(i=0;i<arCount;i++){
      var String = str.shift();
      var aa = new Array(2);
      aa = String.split("x");
      for(j=0;j<aa[1];j++){
        result[count] = aa[0];
        count += 1;
      }
    }
    return result;
  }
};

init();
run(); //gameloop
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
