const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('application', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    link: {
        type: DataTypes.STRING(5000),
        validate: {
            isUrl: true
        }
    },
    duration: {
        type: DataTypes.STRING
    },
    remuneration: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0
        }
    },
    currency: {
        type: DataTypes.STRING
    },
    postulation: {
        type: DataTypes.DATEONLY
    },
    company: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.STRING
    },
    annotations: {
        type: DataTypes.STRING(5000)
    },
    candidate: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }


  }, {
    timestamps: false
  });
};