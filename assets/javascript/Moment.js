// When adding trains, administrators should be able to submit the following:
// Train Name
// Destination
// First Train Time -- in military time
// Frequency -- in minutes

//Code this app to calculate when the next train will arrive; this should be relative to the current time.

//Users from many different machines must be able to view same train times.

// Initialize Firebase
var config = {
	apiKey: "AIzaSyDylqAXvWnhvEBtomybVZYXSCzLOWXThaA",
	authDomain: "train-activity-2be50.firebaseapp.com",
	databaseURL: "https://train-activity-2be50.firebaseio.com",
	projectId: "train-activity-2be50",
	storageBucket: "",
	messagingSenderId: "258187881946"
};
firebase.initializeApp(config);

var database = firebase.database();
var trainName = "";
var destination = "";
var firstTrainTime;
var frequency;

// var nextArrival;
// var minutesAway;
$("#submit").on("click", function() {
	event.preventDefault();

	trainName = $("#trainName-input").val().trim();
	destination = $("#destination-input").val().trim();
	firstTrainTime = $("#firstTrainTime-input").val().trim();
	frequency = $("#frequency-input").val().trim();

	
	// Clears the form after user presses the submit button

	$("#trainName-input").val("");
	$("#destination-input").val("");
	$("#firstTrainTime-input").val("");
	$("#frequency-input").val("");

	database.ref().push({
		trainName: trainName,
		destination: destination,
		//firstTrainTime: firstTrainTime,
		frequency: frequency,
		TIMESTAMP: firebase.database.ServerValue.TIMESTAMP
	});
});

database.ref().on("child_added",function(snapshot) {
		var snap = snapshot.val();
		console.log(snap.trainName);
		console.log(snap.destination);
		console.log(firstTrainTime);
		console.log(snap.frequency);
		

		$("#trainName-input").text(snap.trainName);
		$("#destination-input").text(snap.destination);
		$("#firstTrainTime-input").text(snap.firstTrainTime);
		$("#frequency-input").text(snap.frequency);

		console.log("FIRST TRAIN: " + firstTrainTime);
        //CONVERTS AND CALCULATES TIME FIRST ARRIVAL...
        //...AND MINUTES AWAY
        var timeConverted = moment(firstTrainTime, "HH:mm");
        console.log("TIME CONVERTED: " + timeConverted);

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

        var timeDifference = moment().diff(moment(timeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + timeDifference);

        var remainder = timeDifference % frequency;
        console.log("REMAINDER: " + remainder);

        var minutesPast = (frequency - remainder);
        console.log("MINUTES UNTILL NEXT TRAIN: " + minutesPast);

        var nextTrain = moment().add(minutesPast, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

		var tBody = $("#dataTable");
		var tRow = $("<tr>");
		var nameTd = $("<td>").text(snap.trainName);
		var destinationTd = $("<td>").text(snap.destination);
		var firstTrainTimeTd = $("<td>").text(snap.firstTrainTime);
		var frequencyTd = $("<td>").text(snap.frequency);

		// Append the newly created table data to the table row
		tRow.append(nameTd, destinationTd, firstTrainTimeTd, frequencyTd);
		// Append the table row to the table body
		tBody.append(tRow);

		// $("#train-table > tbody").append(
		// 	"<tr><td>" +
		// 		trainName +
		// 		"</td><td>" +
		// 		destination +
		// 		"</td><td>" +
		// 		firstTrainTime +
		// 		"</td><td>" +
		// 		frequency +
		// 		"</td></tr>"
		//);
	},
	function(errorObject) {
		console.log("Errors handled: " + errorObject.code);
	}
);
