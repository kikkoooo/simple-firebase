$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyATntt0SKy2X7fI-sMyGZJoWBRO49p4zNA",
    authDomain: "simple-chat-de1c7.firebaseapp.com",
    databaseURL: "https://simple-chat-de1c7.firebaseio.com",
    projectId: "simple-chat-de1c7",
    storageBucket: "simple-chat-de1c7.appspot.com",
    messagingSenderId: "1045690062525"
  };

  firebase.initializeApp(config);

  // For Firebase
  var rootRef = firebase.database().ref();

  var usernameInput = $("#username");
  var textInput = $("#text");
  var faveColorInput = $("#fave-color");

  var postButton = $("#post");
  var loginButton = $("#login");

  var username = null;



  // On click
  postButton.click(function() {

    var msgUser = usernameInput.val();
    var msgText = textInput.val();
    var msgFaveColor = faveColorInput.val();


    rootRef.push({
      username: msgUser,
      text: msgText,
      favoriteColor: msgFaveColor
    });

    textInput.value = "";

  });


  /** Function to add a data listener **/
  var startListening = function() {

    rootRef.on('child_added', function(snapshot) {

      var msg = snapshot.val();

      var msgUsernameElement = msg.username;
      var msgTextElement = msg.text;
      var msgfavoriteColorElement = msg.favoriteColor;


      var html =	'<div class="message">' +
      					    '<span>' + msgUsernameElement + ': </span>' + 
      					    '<span>' + msgTextElement + '</span>' +
                    '<span>' + msgfavoriteColorElement + '</span>' +
      				    '</div>';

      $("#results").prepend(html);

    });
  };

  startListening();

});