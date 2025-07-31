const { sequelize } = require('../config/database');
const Note = require('../models/Note');
require('dotenv').config();

const sampleNotes = [
  {
    companyName: 'Acme Corp',
    subject: 'Product Development Meeting',
    date: new Date().toISOString().split('T')[0],
    startTime: '09:30',
    endTime: '10:00',
    participants: 'John Doe, Jane Smith, Mike Johnson',
    aiSummary: 'Discussed Q2 feature requirements and timeline. Team agreed on sprint planning approach and resource allocation for new product features.',
    notes: 'Discussed new feature requirements and timeline for Q2 release. Team is excited about the new direction and ready to start implementation.'
  },
  {
    companyName: 'TechStart Inc',
    subject: 'Funding Round Discussion',
    date: new Date().toISOString().split('T')[0],
    startTime: '14:00',
    endTime: '15:00',
    participants: 'Sarah Wilson, David Chen, Lisa Park',
    aiSummary: 'Reviewed Series A funding requirements and investor presentations. Discussed valuation expectations and growth metrics.',
    notes: 'Prepared investor deck and discussed funding strategy for next quarter. Need to follow up with potential investors.'
  },
  {
    companyName: 'Global Solutions',
    subject: 'Client Onboarding Call',
    date: new Date().toISOString().split('T')[0],
    startTime: '11:00',
    endTime: '11:30',
    participants: 'Mark Thompson, Emma Davis, Alex Rodriguez',
    aiSummary: 'Walked through platform features and integration requirements. Set up next steps for implementation timeline.',
    notes: 'Client showed interest in advanced analytics features. Need to prepare demo for next week.'
  }
];

const setupDatabase = async () => {
  try {
    console.log('🔗 Connecting to PostgreSQL...');
    
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL successfully!');
    
    // Sync models with database
    await sequelize.sync({ force: true }); // This will drop and recreate tables
    console.log('✅ Database tables synchronized');
    
    // Insert sample data
    console.log('📝 Inserting sample notes...');
    const insertedNotes = await Note.bulkCreate(sampleNotes);
    console.log(`✅ Inserted ${insertedNotes.length} sample notes`);
    
    // Display sample data
    console.log('\n📊 Sample Notes Created:');
    insertedNotes.forEach((note, index) => {
      console.log(`${index + 1}. ${note.companyName} - ${note.subject}`);
    });
    
    console.log('\n🎉 Database setup completed successfully!');
    console.log('🚀 You can now start the server with: npm run dev');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  } finally {
    await sequelize.close();
    console.log('🔌 Database connection closed');
  }
};

// Run setup if this file is executed directly
if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase; 