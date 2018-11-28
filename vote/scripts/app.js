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


  // INPUT
  // index.html
  //

  // Create a branch to contain all the yes votes
  var voteYesBranch = firebase.database().ref('vote-yes');

  // On click add an item to the vote yes branch
  $('#btn-yes').click(function() {
    voteYesBranch.push({
      response: 'yes',
    });
  })

  // Create a branch to contain all the no votes
  var voteNoBranch = firebase.database().ref('vote-no');

  // On click add an item to the vote no branch
  $('#btn-no').click(function() {
    voteNoBranch.push({
      response: 'no',
    });
  })


  // OUTPUT
  // projection.html
  //

  var startListeningToFirebaseDatabase = function() {

    // custom variable to count all the items inside the yes vote branch
    var voteYesCount = 0;

    // Everytime a yes vote goes into the DB, then do this...
    voteYesBranch.on('child_added', function(ourDatabaseKid) {

      // Add 1 to whatever the current value of the variable
      voteYesCount++;

      // Put the current count inside the title div to show the number
      $('#vote-yes-count .title').html(voteYesCount);

      // Use the number to change the height of the black bar
      $('#graph-yes').css({
        height: voteYesCount * 2
      })
    });

    var voteNoCount = 0;

    // Everytime a  no vote goes into the DB, then do this...
    voteNoBranch.on('child_added', function(ourDatabaseKid) {
      voteNoCount++;
      $('#vote-no-count .title').html(voteNoCount);
      $('#graph-no').css({
        height: voteNoCount * 2
      })
    });

  }

  startListeningToFirebaseDatabase();


});
