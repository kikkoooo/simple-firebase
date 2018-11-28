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

  // Refers to the main Firebase Database branch
  var mainSwitchBranch = firebase.database().ref('jennifer-clicks');

  //
  // INPUT
  // index.html (lightswitch)
  //

  $('#btn-on').click(function() {
    // .push() sends the data to the Firebase Database
    mainSwitchBranch.push({
      // name : value = ON because this is the ON button
      mode: 'on',
    });
  })

  $('#btn-off').click(function() {
    mainSwitchBranch.push({
      mode: 'off',
    });
  })


  //
  // OUTPUT
  // projection.html (light)
  //

  var startListeningToFirebaseDatabase = function() {

    mainSwitchBranch.on('child_added', function(ourDatabaseKid) {

      // Grabs the main child and give it a variable name
      var inputFromUsers = ourDatabaseKid.val();  // -LSGZ2fvpavZbRNTJUfE (gibbrish item name)
      var inputMode = inputFromUsers.mode;        // the metadata from the item above

      console.log(inputMode);

      if (inputMode == 'on') {
        $('#light').addClass('mode-on');
        $('#light').removeClass('mode-off');

        $('#btn-off .title').hide();
        $('#btn-on .title').show();

      } else {
        $('#light').addClass('mode-off');
        $('#light').removeClass('mode-on');

        $('#btn-off .title').show();
        $('#btn-on .title').hide();

      }

    });

  }

  startListeningToFirebaseDatabase();




  //   var startListening = function() {
  //
  //     // When a new item is added to the FB database then do this...
  //     rootRef.on('child_added', function(ourDatabaseKid) {
  //
  //       // Establish a name for each item/child
  //       var textInputFromUsers = ourDatabaseKid.val();
  //       var theActualMessage = textInputFromUsers.specialMessage;
  //
  //       if (theActualMessage == 'red' || theActualMessage == 'RED') {
  //         $('#container').removeClass('black');
  //         $('#container').addClass('red');
  //       } else if (theActualMessage == 'black' || theActualMessage == 'BLACK') {
  //         $('#container').removeClass('red');
  //         $('#container').addClass('black');
  //       }
  // //      $('#storage').append('<div class="d">' + theActualMessage + '</div>')
  //
  //     });
  //
  //
  //   };
  //
  //   startListening();







//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyATntt0SKy2X7fI-sMyGZJoWBRO49p4zNA",
//     authDomain: "simple-chat-de1c7.firebaseapp.com",
//     databaseURL: "https://simple-chat-de1c7.firebaseio.com",
//     projectId: "simple-chat-de1c7",
//     storageBucket: "simple-chat-de1c7.appspot.com",
//     messagingSenderId: "1045690062525"
//   };
//   firebase.initializeApp(config);
//
//   var rootRef = firebase.database().ref();
//
//
//
//
//   // On click button push item to FB database
//   $('#send-btn').click(function() {
//       var message = $('#message').text();
//       // Pushes a new item to our Firebase database
//
//
//       rootRef.push({
//         kikkoFavoriteFood: message,
//         kikkoFavoriteDesert: message,
//         kikkoFavoriteColor: message,
//       });
//
//
//   })
//
//
//
//
//
//   // Function to add a data listener
//   var startListening = function() {
//
//     // When a new item is added to the FB database then do this...
//     rootRef.on('child_added', function(ourDatabaseKid) {
//
//       // Establish a name for each item/child
//       var textInputFromUsers = ourDatabaseKid.val();
//       var theActualMessage = textInputFromUsers.specialMessage;
//
//       if (theActualMessage == 'red' || theActualMessage == 'RED') {
//         $('#container').removeClass('black');
//         $('#container').addClass('red');
//       } else if (theActualMessage == 'black' || theActualMessage == 'BLACK') {
//         $('#container').removeClass('red');
//         $('#container').addClass('black');
//       }
// //      $('#storage').append('<div class="d">' + theActualMessage + '</div>')
//
//     });
//
//
//   };
//
//   startListening();







});
