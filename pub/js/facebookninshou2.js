/*////////////////////////////////////////////////////////*/
/*             Facebook Ninshou "Check Status"            */
/*////////////////////////////////////////////////////////*/

window.onload = function() {
  var e = document.createElement('script');
  e.src = document.location.protocol +
  '//connect.facebook.net/ja_JP/all.js';
  document.getElementById('fb-root').appendChild(e);
};

/* when finish load javascript SDK */
window.fbAsyncInit = function() {

  FB.init({
    appId: 'your app ID',
    status: true,
    cookie: true,
    xfbml: true
  });

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      FB.api('/me', function(response) {
      });
    }else {
      $('#menu').hide();
    }
  });
};
