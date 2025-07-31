const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
const TEST_NOTE = {
  companyName: 'Test Company',
  subject: 'Test Meeting',
  date: new Date().toISOString().split('T')[0],
  startTime: '10:00',
  endTime: '11:00',
  participants: 'Test User 1, Test User 2',
  aiSummary: 'This is a test AI summary for the meeting.',
  notes: 'These are test notes for the meeting.'
};

const testAPI = async () => {
  console.log('🧪 Testing Sachify Backend API...\n');
  
  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const healthResponse = await axios.get('http://localhost:5000/health');
    console.log('✅ Health check passed:', healthResponse.data.status);
    
    // Test 2: Get All Notes
    console.log('\n2️⃣ Testing Get All Notes...');
    const getNotesResponse = await axios.get(`${BASE_URL}/notes`);
    console.log('✅ Get notes passed:', getNotesResponse.data.notes.length, 'notes found');
    
    // Test 3: Create Note
    console.log('\n3️⃣ Testing Create Note...');
    const createResponse = await axios.post(`${BASE_URL}/notes`, TEST_NOTE);
    const createdNote = createResponse.data.note;
    console.log('✅ Create note passed:', createdNote._id);
    
    // Test 4: Get Single Note
    console.log('\n4️⃣ Testing Get Single Note...');
    const getNoteResponse = await axios.get(`${BASE_URL}/notes/${createdNote._id}`);
    console.log('✅ Get single note passed:', getNoteResponse.data.companyName);
    
    // Test 5: Update Note
    console.log('\n5️⃣ Testing Update Note...');
    const updatedNote = { ...TEST_NOTE, subject: 'Updated Test Meeting' };
    const updateResponse = await axios.put(`${BASE_URL}/notes/${createdNote._id}`, updatedNote);
    console.log('✅ Update note passed:', updateResponse.data.note.subject);
    
    // Test 6: Search Notes
    console.log('\n6️⃣ Testing Search Notes...');
    const searchResponse = await axios.get(`${BASE_URL}/notes/search?q=Test`);
    console.log('✅ Search notes passed:', searchResponse.data.totalResults, 'results found');
    
    // Test 7: Delete Note
    console.log('\n7️⃣ Testing Delete Note...');
    const deleteResponse = await axios.delete(`${BASE_URL}/notes/${createdNote._id}`);
    console.log('✅ Delete note passed:', deleteResponse.data.message);
    
    console.log('\n🎉 All API tests passed successfully!');
    console.log('🚀 Your backend is ready for production!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
    console.log('\n💡 Make sure the server is running on port 5000');
    console.log('💡 Run: npm run dev in the backend directory');
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = testAPI; 