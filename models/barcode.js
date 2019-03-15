module.exports = function(sequelize, DataTypes) {
    var Barcode = sequelize.define('Barcode', {
        barcode_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        photo_url: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    Barcode.associate = function(models) {
        Barcode.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

        Barcode.hasMany(models.Item);
    };

    return Barcode;
};