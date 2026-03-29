import { javaCourseData } from '../data/java-course-data';

const API_BASE_URL = 'http://localhost:5005/api'; // Adjust this to your backend URL

async function createJavaCourse() {
  try {
    console.log('🚀 Starting Java course creation...');
    console.log(`📚 Course: ${javaCourseData.name}`);
    console.log(`📖 Chapters: ${javaCourseData.chapters.length}`);
    console.log(`🎯 Total Topics: ${javaCourseData.chapters.reduce((acc: number, chap: any) => acc + chap.topics.length, 0)}`);
    console.log(`⏱️  Total Duration: ${javaCourseData.chapters.reduce((acc: number, chap: any) => acc + chap.durationDays, 0)} days`);
    console.log('');

    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(javaCourseData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Java course created successfully!');
    console.log('📋 Course ID:', result.data.id);
    console.log('📝 Course Details:');
    console.log('   - Name:', result.data.name);
    console.log('   - Chapters:', result.data.chapters.length);
    console.log('   - Created At:', new Date(result.data.createdAt).toLocaleString());

    // Log chapter details
    console.log('\n📖 Chapter Breakdown:');
    result.data.chapters.forEach((chapter: any, index: number) => {
      console.log(`   ${index + 1}. ${chapter.title}`);
      console.log(`      - Topics: ${chapter.topics.length}`);
      console.log(`      - Duration: ${chapter.durationDays} days`);
    });

    return result.data;

  } catch (error) {
    console.error('❌ Error creating Java course:', error);
    throw error;
  }
}

// Execute the course creation
if (require.main === module) {
  createJavaCourse()
    .then(() => {
      console.log('\n🎉 Java course creation completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Java course creation failed:', error);
      process.exit(1);
    });
}

export { createJavaCourse };