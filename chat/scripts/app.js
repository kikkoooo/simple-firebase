$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAccacqVIpLhwH2Q6CZETjPwl8C0h1LokI",
    authDomain: "whateva-666.firebaseapp.com",
    databaseURL: "https://whateva-666.firebaseio.com",
    projectId: "whateva-666",
    storageBucket: "whateva-666.appspot.com",
    messagingSenderId: "480338952354"
  };
  firebase.initializeApp(config);


  // Establish to identify which branch of our Firebase Database
  var mainBranch = firebase.database().ref();

  // Send Data to Firebase
  $('#send-button').click(function() {
    var userName = $('#message-username').text();
    var userMessage = $('#message-box').text();
    mainBranch.push({
      username : userName,
      message : userMessage
    });

    // Empty out the divs
    $('#message-username').html('');
    $('#message-box').html('');

  })

  // Recieve Data from Firebase
  var getDataFromFirebase = function() {
    mainBranch.on('child_added', function(myFirebaseItem) {

      // Access the child of the main branch
      var firebaseChild = myFirebaseItem.val();

      // Get the message metadata
      var userMessage = firebaseChild.message;

      // Get the username metadata
      var userName = firebaseChild.username;

      // $('#messages').append(userMessage + ' by ' + userName);
      $('#messages').append('<div class="message">' + userMessage + ' by ' + userName + '</div>');

    });
  }

  getDataFromFirebase();

});
