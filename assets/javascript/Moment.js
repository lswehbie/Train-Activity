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
	trainName = $("#trainName")
		.val()
		.trim();
	destination = $("#destination")
		.val()
		.trim();
	firstTrainTime = $("#firstTrainTime")
		.val()
		.trim();
	frequency = $("#frequency")
		.val()
		.trim();
	// nextArrival = $("#nextArrival").val().trim();
	// minutesAway = $("#minutesAway").val().trim();
	// Clears the form after pressing submit
	$("#trainName").val("");
	$("#destination").val("");
	$("#firstTrainTime").val("");
	$("#frequency").val("");
	database.ref().push({
		trainName: trainName,
		destination: destination,
		firstTrainTime: firstTrainTime,
		frequency: frequency,
		TIMESTAMP: firebase.database.ServerValue.TIMESTAMP
	});
});
database.ref().on(
	"child_added",
	function(snapshot) {
		var snap = snapshot.val();
		console.log(snap.name);
		console.log(snap.location);
		console.log(hours);
		console.log(snap.goods);
		// console.log(nextArrival);
		// console.log(snap.minutesAway);
		$("#trainName-display").text(snap.name);
		$("#destination-display").text(snap.location);
		$("#firstTrainTime-display").text(snap.hours);
		$("#frequency-display").text(snap.goods);

		var tBody = $("#dataTable");
		var tRow = $("<tr>");
		var nameTd = $("<td>").text(snap.name);
		var destinationTd = $("<td>").text(snap.location);
		var trainTimeTd = $("<td>").text(snap.hours);
		var frequencyTd = $("<td>").text(snap.goods);

		// Append the newly created table data to the table row
		tRow.append(nameTd, locationTd, hoursTd, goodsTd);
		// Append the table row to the table body
		tBody.append(tRow);
	},
	function(errorObject) {
		console.log("Errors handled: " + errorObject.code);
	}
);
