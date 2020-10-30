module.exports = function (Sequelize, DataTypes) {
    var Game = Sequelize.define("Game", {
      // Giving the Game model a name of type STRING
        game_title: DataTypes.STRING
        
    });
    
    Game.associate = function(models) {
        models.Game.belongsTo(models.User, {
            foreignKey: "userId"
        });
    }
 
  
    return Game;
  };
  