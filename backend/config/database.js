const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgresql://personalwebsite_db_xt93_user:suoUo9x2Ynzg83U0xwtsKPyA4Wrgblz9@dpg-d208kp15pdvs73c8go60-a.oregon-postgres.render.com/personalwebsite_db_xt93', {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('📦 PostgreSQL Connected successfully!');
    
    // Sync models with database (create tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('📋 Database models synchronized');
    
    return sequelize;
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error.message);
    throw error;
  }
};

module.exports = { sequelize, connectDB }; 