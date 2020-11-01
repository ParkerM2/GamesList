const DBConnection = require('../config/DBConnection');

let listGames = (user, callback) => {
    DBConnection.query('SELECT * FROM `games` WHERE user_id = ?', user.id, callback);
}

let hasGame = (user, title, platform, callback) => {
  DBConnection.query(
      'SELECT * FROM `games` WHERE user_id = ? AND game_title = ? AND platform = ?',
      [user.id, title, platform], function(err, results) {
          if (err) callback(err)
          else callback(null, results.length > 0)
      }
  )
}

let addGame = (user, title, platform, callback) => {
    DBConnection.query('INSERT INTO `games` SET ?', {
        user_id: user.id, game_title: title, platform: platform
    }, callback);
}

let removeGame = (user, title, platform, callback) => {
    DBConnection.query(
        'DELETE FROM `games` WHERE user_id = ? AND game_title = ? AND platform = ?', 
        [user.id, title, platform], callback
    );
}

module.exports = {
  listGames, hasGame, addGame, removeGame
}