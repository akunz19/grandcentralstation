// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBVFfc4bG_eDbIq-O8s6l19HhjOTSixk_w",
    authDomain: "grand-central-station-5333b.firebaseapp.com",
    databaseURL: "https://grand-central-station-5333b.firebaseio.com",
    projectId: "grand-central-station-5333b",
    storageBucket: "grand-central-station-5333b.appspot.com",
    messagingSenderId: "257739540823",
    appId: "1:257739540823:web:04bb038ac6ec287589d612",
    measurementId: "G-GJT81N90L2"
  };

  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstDepart = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    console.log("firstDepart", firstDepart);
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: destination,
      firstDeparture: firstDepart,
      frequency: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstDeparture);
    console.log(newTrain.frequency);
  
    alert("train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;

    var destination = childSnapshot.val().destination;
    var timesplit = childSnapshot.val().firstDeparture.split(":");
    var startDay = moment().startOf("day");
    var hour = timesplit[0];
    var minutes =timesplit[1];
    var tFrequency = childSnapshot.val().frequency;
  
    console.log(trainName);
    console.log(destination);
    console.log(tFrequency);
    console.log(nextTrain);

    var firstTimeConverted = startDay.add(hour, "hours").add(minutes, "minutes");    // Prettify the employee start

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = diffTime % tFrequency;

    var tMinutesTillTrain = tFrequency - tRemainder;

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(tFrequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain)
    );
  
    $("#train-table > thead").append(newRow);
  });
  
  