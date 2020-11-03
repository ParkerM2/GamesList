const DBConnection = require('../config/DBConnection');

let listGames = (user, callback) => {
    DBConnection.query('SELECT * FROM `games` WHERE user_id = ?', user.id, callback);
}

let hasGame = (user, gameId, callback) => {
  DBConnection.query(
      'SELECT * FROM `games` WHERE user_id = ? AND game_id = ?',
      [user.id, gameId], function(err, results) {
          if (err) callback(err)
          else callback(null, results.length > 0)
      }
  )
}

let addGame = (user, gameId, title, img, callback) => {
    DBConnection.query('INSERT INTO `games` SET ?', {
        user_id: user.id, game_id: gameId, game_title: title, game_img: img
    }, callback);
}

let removeGame = (user, gameId, callback) => {
    DBConnection.query(
        'DELETE FROM `games` WHERE user_id = ? AND game_id = ?', 
        [user.id, gameId], callback
    );
}

module.exports = {
  listGames, hasGame, addGame, removeGame
}