/*global dNaam:true */
var db = openDatabase('Highscores', '1.0', 'Space invaders', 2 * 1024 * 1024);
var G_points = punten;

function createDatabase() {
	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (dNaam TEXT UNIQUE, punten INTEGER)');
	});
}

function storeData() {
	db.transaction(function (tx) {
		tx.executeSql('INSERT INTO LOGS (dNaam,punten) VALUES (?, ?)', [str, G_points]);
	});
}