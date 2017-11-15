$(document).ready(function() {


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
  var postButton = $("#post");
  var loginButton = $("#login");

  // ADD THESE 4 LINES
  var username = null;

  postButton.hide();
  textInput.hide();

  // On click
  postButton.click(function() {
    var msgUser = username;
    var msgText = textInput.val();
    rootRef.push({
      username: msgUser,
      text: msgText
    });
    textInput.value = "";
  });


  //Firebase authentication method
  var auth = firebase.auth();

  loginButton.click(function() {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(function(result, authData) {
      if (error) {
        console.log(error);
      } else {
        console.log(authData);
      }
    }, {
      remember: "none"
    }); // will end authentication on page close/reload

  });


  auth.onAuthStateChanged(function(user) {

    if (user) {

      //Grab Google user id
      var uid = user.uid;

      //Grab google user name
      var username = user.displayName;

      loginButton.text("Logged in as " + username);
      loginButton.prop("disabled", true);

      // Show buttons
      postButton.show();
      textInput.show();

      startListening();

    } else {
      // User logged out
    }
  });


  /** Function to add a data listener **/
  var startListening = function() {

    rootRef.on('child_added', function(snapshot) {

      var msg = snapshot.val();
      var msgUsernameElement = msg.username;
      var msgTextElement = msg.text;

      var html =	'<div class="message">' +
      					'<span>' + msgUsernameElement + ': </span>' + 
      					'<span>' + msgTextElement + '</span>' +
      				'</div>';

      $("#results").prepend(html);

    });
  };
});