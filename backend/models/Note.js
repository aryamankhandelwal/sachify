const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Note = sequelize.define('Note', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  companyName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [1, 100]
    }
  },
  subject: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      len: [1, 200]
    }
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true
    }
  },
  startTime: {
    type: DataTypes.STRING(5),
    allowNull: false,
    validate: {
      is: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    }
  },
  endTime: {
    type: DataTypes.STRING(5),
    allowNull: false,
    validate: {
      is: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    }
  },
  participants: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1, 500]
    }
  },
  aiSummary: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1, 2000]
    }
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1, 5000]
    }
  }
}, {
  tableName: 'notes',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  indexes: [
    {
      fields: ['companyName', 'date']
    },
    {
      fields: ['createdAt']
    }
  ]
});

// Instance method to calculate duration
Note.prototype.getDuration = function() {
  const start = new Date(`2000-01-01T${this.startTime}:00`);
  const end = new Date(`2000-01-01T${this.endTime}:00`);
  const diffMs = end - start;
  return Math.round(diffMs / 60000); // Return minutes
};

// Virtual field for duration (not stored in database)
Note.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  values.duration = this.getDuration();
  return values;
};

module.exports = Note; 