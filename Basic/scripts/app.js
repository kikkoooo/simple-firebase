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
  $('.button').click(function() {
    var messageToSend = "I hate you";
    // Pushes a new item to our Firebase database
    mainBranch.push({
      notSoNiceMessage: messageToSend
    });
  })




  // Recieve Data from Firebase
  var getDataFromFirebase = function() {
    mainBranch.on('child_added', function(myFirebaseItem) {
      var firebaseChild = myFirebaseItem.val();
      var theActualMessage = firebaseChild.specialMessage;
      $('.box').append(theActualMessage);
    });
  }

  getDataFromFirebase();

});
