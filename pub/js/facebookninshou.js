/*////////////////////////////////////////////////////////*/
/*             Facebook Ninshou "Hello userID"            */
/*////////////////////////////////////////////////////////*/

window.onload = function() {
  var e = document.createElement('script');
  e.src = document.location.protocol +
  '//connect.facebook.net/ja_JP/all.js';
  document.getElementById('fb-root').appendChild(e);
};

/* when finish load javascript SDK */
window.fbAsyncInit = function() {
  var fb_id, f_name;

  FB.init({
    appId: 'your app ID',
    status: true,
    cookie: true,
    xfbml: true
  });

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      FB.api('/me', function(response) {
        if (typeof response.first_name === 'undefined') {
          alert('error');
          location.reload();
        }else {
          fb_id = response.id;
          var forNum = Number(fb_id);
          var fbid2 = forNum.toString(36);
          f_name = response.first_name;
          $('#login').html('<p>Welcom to ' + f_name
          + '.</p>').show();
          $('#game_login').show();
          var getFBID = document.getElementById('fb_id');
          var getFNAME = document.getElementById('f_name');
          getFBID.value = fbid2;//fb_id;
          getFNAME.value = f_name;
        }
      });
    //} else if (response.satus === 'not_authorized'){
      //Login but not connect app
      //alert('not authorized');
    }else {
      $('#not_login').show();
      $('#login_button').click(function() {
        FB.login(function(response) {
          location.reload();
        });
      });
      $('#menu').hide();
    }
  });
};
