
module.exports = function (Sequelize, DataTypes) {
  var User = Sequelize.define("User", {
    // Giving the User model a name of type STRING
      name: DataTypes.STRING,
      password: DataTypes.STRING,
  });

  User.associate = function(models) {
    // Associating User with games
    // When an User is deleted, also delete any associated Posts
    models.User.hasMany(models.Game, {
      foreignKey: "userId"
    });
  };

//   return User;
 };
