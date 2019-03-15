module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: DataTypes.STRING
    },
    {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            len: [1],
        }
    },
    {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1],
        }
    },
    {
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1],
        }
    },
    {
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        }
    });
    

    User.associate = function(models) {
        User.hasMany(models.Barcode, {
            onDelete: "cascade"
        })
        User.hasMany(models.Item, {
            onDelete: "cascade"
        });
    };

    return User;
}