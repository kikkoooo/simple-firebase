$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "",
    authDomain: "comm-platform.firebaseapp.com",
    databaseURL: "https://comm-platform.firebaseio.com",
    projectId: "comm-platform",
    storageBucket: "comm-platform.appspot.com",
    messagingSenderId: "222645536355"
  };
  firebase.initializeApp(config);

  // USER AUTH
  var provider = new firebase.auth.GoogleAuthProvider();

  // USER BRANCH FROM THE DATABASE
  var userBranch = firebase.database().ref('users');

  // VARIABLES TO BE USED BELOW
  var userId, currentUser;

  $('#login').click(function() {

    // Initaliaze FB login system for Google users
    firebase.auth().signInWithPopup(provider).then(function(result) {

      // Necessary User variables
      var token = result.credential.accessToken;
      var user = result.user;

      // Grab the current user's
      // Define the userId with the current user
      userId = result.user.uid;
      console.log(result.user.uid);

      // Display the U
      $('#profile .uid').text(userId);

      // Define currentUser var to the child insde the User Branch
      currentUser = firebase.database().ref('users').child(userId);


      // Get current User's profile data
      currentUser.on('value', function(snapshot) {

        var profile = snapshot.val();
        console.log(profile.faveBand);
        console.log(profile.faveColor);
        // Add the each profile data into the input fields
        $('#fave-color').val(profile.faveColor);
        $('#fave-band').val(profile.faveBand);
      });


    // If there is an error
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  })


  // Save the User profile settings
  $('#save').click(function() {
    // Set will create (if empty) or override the exisiting data
    currentUser.set({
      faveColor: $('#fave-color').val(),
      faveBand: $('#fave-band').val()
    })
  })



});
