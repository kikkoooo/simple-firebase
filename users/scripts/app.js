$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCLBKYhDQd4gsbZJ1--bfCfrcuTliuS8d8",
    authDomain: "interaction-3-f18-demo-lights.firebaseapp.com",
    databaseURL: "https://interaction-3-f18-demo-lights.firebaseio.com",
    projectId: "interaction-3-f18-demo-lights",
    storageBucket: "interaction-3-f18-demo-lights.appspot.com",
    messagingSenderId: "463282186919"
  };

  firebase.initializeApp(config);



  // Init Gathering plugin
  var gathering = new Gathering(firebase.database(), 'kikkosfavoritepeopleonlyareinvited');

  // On site visit, add the user to the DB
  gathering.join();

  // When someone is added do something, count all of them
  gathering.onUpdated(function(count, users) {
    for (var i in users) {
      // console.log(users[i] + '(id: ' + i + ')');
    }

    // If there is only 1 user in session
    if (count == 1) {
      $('body').removeClass('not-lame');
      $('body').addClass('lame');
      $('#user-count').text('You only have 1 friend, Kikko');

    // If there are 2 users in session
    } else if (count == 2) {
      $('body').removeClass('not-lame');
      $('body').addClass('lame');
      $('#user-count').text('That is your mom and dad');

    // If there are more than users in session
    } else {
      $('body').addClass('not-lame');
      $('body').removeClass('lame');
      $('#user-count').text('Ok, I guess you have friends');

    }
  });



});
