module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: DataTypes.String
    });

    User.associate = function(models) {
        User.hasMany(models.barCodes, {
            onDelete: "cascade"
        });
    };

    return User;
}