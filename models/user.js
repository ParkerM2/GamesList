
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the User model a name of type STRING
      name: DataTypes.STRING,
      password: DataTypes.STRING,
  });

//   User.associate = function(models) {
//     // Associating User with games
//     // When an User is deleted, also delete any associated Posts
//     User.hasMany(models.Games, {
//       onDelete: "cascade"
//     });
//   };

  return User;
};
