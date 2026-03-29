# Java Course Creation Scripts

This directory contains scripts to create a comprehensive Java programming course with all chapters and topics.

## Course Overview

The Java course includes:
- **18 Chapters** covering Java from basics to advanced topics
- **150+ Topics** across all chapters
- **85 Days** total duration
- Topics range from basic syntax to advanced concepts like Spring Framework, microservices, and best practices

## Files

- `java-course-data.ts` - TypeScript data file containing the complete course structure
- `create-java-course.ts` - TypeScript script to create the course via API
- `create-java-course.js` - JavaScript version of the creation script

## Usage

### Prerequisites

1. Make sure the backend server is running on `http://localhost:3000`
2. Ensure MongoDB is connected and the database is accessible

### Running the Scripts

#### Option 1: TypeScript Version (Recommended)
```bash
npm run create-java-course
```

#### Option 2: JavaScript Version
```bash
npm run create-java-course-js
```

### Manual Execution

You can also run the scripts directly:

```bash
# TypeScript
npx ts-node src/scripts/create-java-course.ts

# JavaScript
node src/scripts/create-java-course.js
```

## Course Structure

The course covers the following chapters:

1. **Introduction to Java** (5 days)
2. **Variables, Data Types, and Operators** (4 days)
3. **Control Flow Statements** (5 days)
4. **Object-Oriented Programming Fundamentals** (7 days)
5. **Inheritance and Polymorphism** (6 days)
6. **Interfaces and Abstract Classes** (5 days)
7. **Exception Handling** (4 days)
8. **Arrays and Collections Framework** (6 days)
9. **Generics and Advanced Collections** (4 days)
10. **File I/O and Serialization** (5 days)
11. **Multithreading and Concurrency** (7 days)
12. **Java 8+ Features** (6 days)
13. **JDBC and Database Connectivity** (5 days)
14. **Design Patterns in Java** (6 days)
15. **Unit Testing and JUnit** (4 days)
16. **Spring Framework Basics** (8 days)
17. **Advanced Topics and Best Practices** (5 days)

## API Endpoint

The script sends a POST request to `/api/courses` with the complete course data.

## Output

The script will display:
- Course creation progress
- Course ID and details
- Chapter breakdown with topic counts and durations
- Success/failure status

## Troubleshooting

- **Server not running**: Make sure the backend server is started with `npm run dev`
- **Database connection**: Ensure MongoDB is running and accessible
- **Port issues**: Update `API_BASE_URL` in the script if using a different port
- **CORS issues**: Make sure CORS is properly configured in the backend

## Customization

You can modify the `javaCourseData` object in the data files to:
- Add/remove chapters
- Modify topic titles
- Adjust chapter durations
- Update course description

The script will automatically recalculate totals and send the updated data to the API.