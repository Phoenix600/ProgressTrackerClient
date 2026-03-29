export const javaCourseData = {
  name: "Complete Java Programming Course",
  description: "Master Java programming from basics to advanced concepts. Learn object-oriented programming, data structures, algorithms, and modern Java features including Java 8+ streams, lambdas, and concurrency.",

  chapters: [
    {
      title: "Introduction to Java",
      durationDays: 5,
      topics: [
        { title: "What is Java? History and Features" },
        { title: "Installing JDK and Setting up Development Environment" },
        { title: "Writing Your First Java Program" },
        { title: "Understanding JVM, JRE, and JDK" },
        { title: "Java Syntax and Basic Structure" },
        { title: "Compiling and Running Java Programs" },
        { title: "Java Development Tools (IDE, Text Editors)" }
      ]
    },
    {
      title: "Variables, Data Types, and Operators",
      durationDays: 4,
      topics: [
        { title: "Variables and Data Types (Primitive Types)" },
        { title: "Reference Types and Objects" },
        { title: "Type Casting and Conversion" },
        { title: "Arithmetic, Relational, and Logical Operators" },
        { title: "Assignment and Unary Operators" },
        { title: "Operator Precedence and Associativity" },
        { title: "String Class and String Operations" }
      ]
    },
    {
      title: "Control Flow Statements",
      durationDays: 5,
      topics: [
        { title: "Decision Making: if, if-else, nested if" },
        { title: "Switch Statements and Expressions" },
        { title: "Loops: for, while, do-while" },
        { title: "Enhanced for-each Loop" },
        { title: "Break, Continue, and Return Statements" },
        { title: "Nested Loops and Loop Control" },
        { title: "Labelled Break and Continue" }
      ]
    },
    {
      title: "Object-Oriented Programming Fundamentals",
      durationDays: 7,
      topics: [
        { title: "Classes and Objects" },
        { title: "Instance Variables and Methods" },
        { title: "Constructors and Constructor Overloading" },
        { title: "this Keyword and Method Overloading" },
        { title: "Static Variables, Methods, and Blocks" },
        { title: "Instance vs Static Members" },
        { title: "Understanding Object Creation and Memory" },
        { title: "Garbage Collection Basics" },
        { title: "Access Modifiers: public, private, protected, default" },
        { title: "Encapsulation and Data Hiding" }
      ]
    },
    {
      title: "Inheritance and Polymorphism",
      durationDays: 6,
      topics: [
        { title: "Inheritance: extends Keyword" },
        { title: "Types of Inheritance" },
        { title: "Method Overriding and super Keyword" },
        { title: "Dynamic Method Dispatch" },
        { title: "Abstract Classes and Methods" },
        { title: "Final Keyword: Classes, Methods, Variables" },
        { title: "Polymorphism: Compile-time vs Runtime" },
        { title: "Object Class and its Methods" }
      ]
    },
    {
      title: "Interfaces and Abstract Classes",
      durationDays: 5,
      topics: [
        { title: "Defining and Implementing Interfaces" },
        { title: "Multiple Inheritance with Interfaces" },
        { title: "Default and Static Methods in Interfaces" },
        { title: "Functional Interfaces and Lambda Expressions" },
        { title: "Abstract Classes vs Interfaces" },
        { title: "Marker Interfaces" },
        { title: "Interface Segregation Principle" }
      ]
    },
    {
      title: "Exception Handling",
      durationDays: 4,
      topics: [
        { title: "What are Exceptions?" },
        { title: "Checked vs Unchecked Exceptions" },
        { title: "try-catch Blocks" },
        { title: "finally Block and Resource Management" },
        { title: "throw and throws Keywords" },
        { title: "Custom Exception Classes" },
        { title: "Exception Handling Best Practices" }
      ]
    },
    {
      title: "Arrays and Collections Framework",
      durationDays: 6,
      topics: [
        { title: "Arrays: Declaration, Initialization, and Usage" },
        { title: "Multidimensional Arrays" },
        { title: "Array Operations and Common Algorithms" },
        { title: "Introduction to Collections Framework" },
        { title: "List Interface: ArrayList, LinkedList" },
        { title: "Set Interface: HashSet, TreeSet, LinkedHashSet" },
        { title: "Map Interface: HashMap, TreeMap, LinkedHashMap" },
        { title: "Queue and Deque Interfaces" },
        { title: "Iterators and Enhanced for-each Loop" },
        { title: "Comparable and Comparator Interfaces" }
      ]
    },
    {
      title: "Generics and Advanced Collections",
      durationDays: 4,
      topics: [
        { title: "Introduction to Generics" },
        { title: "Generic Classes and Methods" },
        { title: "Bounded Type Parameters" },
        { title: "Wildcards: ?, ? extends, ? super" },
        { title: "Generic Collections and Type Safety" },
        { title: "Type Erasure" },
        { title: "Generic Best Practices" }
      ]
    },
    {
      title: "File I/O and Serialization",
      durationDays: 5,
      topics: [
        { title: "File Class and File Operations" },
        { title: "Byte Streams: FileInputStream, FileOutputStream" },
        { title: "Character Streams: FileReader, FileWriter" },
        { title: "Buffered Streams for Performance" },
        { title: "Data Streams and Object Streams" },
        { title: "Serialization and Deserialization" },
        { title: "Serializable Interface and transient Keyword" },
        { title: "Externalizable Interface" },
        { title: "NIO.2 File API (Path, Paths, Files)" }
      ]
    },
    {
      title: "Multithreading and Concurrency",
      durationDays: 7,
      topics: [
        { title: "Introduction to Multithreading" },
        { title: "Creating Threads: Extending Thread vs Implementing Runnable" },
        { title: "Thread Lifecycle and States" },
        { title: "Thread Priority and Daemon Threads" },
        { title: "Thread Synchronization and Locks" },
        { title: "Inter-thread Communication: wait(), notify(), notifyAll()" },
        { title: "Deadlock Prevention and Detection" },
        { title: "Executor Framework and Thread Pools" },
        { title: "Callable and Future Interfaces" },
        { title: "Concurrent Collections" },
        { title: "Atomic Variables and Synchronizers" }
      ]
    },
    {
      title: "Java 8+ Features",
      durationDays: 6,
      topics: [
        { title: "Lambda Expressions and Functional Interfaces" },
        { title: "Method References" },
        { title: "Stream API: Intermediate and Terminal Operations" },
        { title: "Collectors and Stream Reduction" },
        { title: "Optional Class" },
        { title: "New Date/Time API (java.time package)" },
        { title: "Default and Static Methods in Interfaces" },
        { title: "forEach() Method and Enhanced Collections" },
        { title: "Predicate, Function, Consumer, Supplier Interfaces" },
        { title: "CompletableFuture for Asynchronous Programming" }
      ]
    },
    {
      title: "JDBC and Database Connectivity",
      durationDays: 5,
      topics: [
        { title: "Introduction to JDBC" },
        { title: "JDBC Drivers and DriverManager" },
        { title: "Connection, Statement, PreparedStatement" },
        { title: "ResultSet and ResultSetMetaData" },
        { title: "Batch Processing and Transactions" },
        { title: "Connection Pooling" },
        { title: "DAO Pattern and Best Practices" },
        { title: "Handling SQL Exceptions" }
      ]
    },
    {
      title: "Design Patterns in Java",
      durationDays: 6,
      topics: [
        { title: "Introduction to Design Patterns" },
        { title: "Creational Patterns: Singleton, Factory, Builder" },
        { title: "Structural Patterns: Adapter, Decorator, Facade" },
        { title: "Behavioral Patterns: Observer, Strategy, Command" },
        { title: "MVC Pattern" },
        { title: "Dependency Injection and IoC" },
        { title: "SOLID Principles" },
        { title: "Anti-patterns and Code Smells" }
      ]
    },
    {
      title: "Unit Testing and JUnit",
      durationDays: 4,
      topics: [
        { title: "Introduction to Unit Testing" },
        { title: "JUnit 5 Framework" },
        { title: "Writing Test Cases with @Test" },
        { title: "@BeforeEach, @AfterEach, @BeforeAll, @AfterAll" },
        { title: "Assertions and Assumptions" },
        { title: "Parameterized Tests" },
        { title: "Mocking with Mockito" },
        { title: "Test-Driven Development (TDD)" },
        { title: "Code Coverage and Test Reports" }
      ]
    },
    {
      title: "Spring Framework Basics",
      durationDays: 8,
      topics: [
        { title: "Introduction to Spring Framework" },
        { title: "Spring Core: IoC Container and Dependency Injection" },
        { title: "Spring Beans and Bean Lifecycle" },
        { title: "Spring Configuration: XML and Java-based" },
        { title: "Spring MVC Architecture" },
        { title: "RESTful Web Services with Spring" },
        { title: "Spring Data JPA" },
        { title: "Spring Boot Introduction" },
        { title: "Spring Security Basics" },
        { title: "Spring AOP (Aspect-Oriented Programming)" }
      ]
    },
    {
      title: "Advanced Topics and Best Practices",
      durationDays: 5,
      topics: [
        { title: "Memory Management and Performance Tuning" },
        { title: "JVM Internals and Garbage Collection" },
        { title: "Java Memory Model and Concurrency" },
        { title: "Security Best Practices" },
        { title: "Code Quality and Static Analysis" },
        { title: "Microservices with Spring Boot" },
        { title: "Containerization with Docker" },
        { title: "CI/CD Pipelines for Java Applications" },
        { title: "Performance Monitoring and Profiling" },
        { title: "Java Ecosystem and Tools" }
      ]
    }
  ]
};