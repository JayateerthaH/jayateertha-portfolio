// All portfolio content lives here. Edit this file to update the site.
// Rule: only add what you have built and can explain in an interview.

export const profile = {
  name: "Jayateertha Handigol",
  role: "Backend Engineer · Java, Spring Boot, Microservices",
  headline: "I design backend systems in Java and Spring Boot: microservices with Spring Cloud, data that stays consistent under concurrency, and services that fail safely.",
  location: "Hubballi, Karnataka, India",
  email: "govindkh888@gmail.com",
  links: {
    github: "https://github.com/JayateerthaH",
    linkedin: "https://www.linkedin.com/in/jayateertha-handigol-8234bb28b/",
    leetcode: "https://leetcode.com/u/Jayateertha/",
  },
  // Export your resume to PDF, put it in /public, then set this to "/Jayateertha_Handigol_Resume.pdf".
  resumeUrl: null,
  openTo: "SDE, Backend Developer and Software Engineer roles (graduating 2027)",
};

export const about = [
  "I'm a Computer Science student at KLE Technological University (graduating 2027, CGPA 8.84). I work on the backend: service boundaries, authentication between services, data consistency, concurrency and running Java well on limited hardware.",
  "I built my event management platform twice. First as Spring Cloud microservices with an API gateway, service discovery, central configuration and a database per service. Then, when running 11 containers was too expensive to host, I consolidated it into a modular monolith that keeps the same boundaries and runs live on a 512 MB server. Building both taught me what each architecture costs.",
];

export const projects = [
  {
    id: "microservices",
    route: "/projects/event-platform-microservices",
    name: "Event Platform: Microservices",
    tagline: "10 Spring Boot services behind an API gateway, each with its own database, discovered through Eureka and configured from one config server.",
    status: "Runs locally with Docker Compose. Not deployed: the 11 containers are allocated about 5.9 GB of memory, which free hosting doesn't cover.",
    repo: "https://github.com/JayateerthaH/event-platform-microservices",
    live: null,
    stack: ["Java 21", "Spring Boot 3", "Spring Cloud Gateway", "Netflix Eureka", "OpenFeign", "Spring Cloud Config", "Spring Cloud LoadBalancer", "Spring Security", "PostgreSQL", "Quartz", "Docker Compose"],
    numbers: [
      ["10", "Spring Boot services"],
      ["6", "PostgreSQL databases"],
      ["11", "containers"],
      ["12", "Feign clients"],
      ["1", "shared security starter"],
      ["~5.9 GB", "container memory limits"],
    ],
    showArchitecture: true,
    decisions: [
      {
        title: "One gateway, JWT checked once",
        body: "A Spring Cloud Gateway filter validates the JWT at the edge, lets public routes through, and forwards the user's id, name and roles as headers. Downstream services never parse tokens themselves.",
        tradeoff: "The gateway is a single point of failure and an extra network hop; production needs several replicas.",
      },
      {
        title: "Services trust only the gateway",
        body: "A shared library, packaged as a Spring Boot auto-configuration, adds a filter to every service that rejects any request without the internal service key. Only the gateway sits on the public Docker network.",
        tradeoff: "One static shared secret: if it leaks, any caller can impersonate a user. Signed internal tokens or mTLS are the next step.",
      },
      {
        title: "Database per service",
        body: "Six PostgreSQL databases (auth, events, management, attendance, dashboard, scheduler). No service reads another's tables; data it needs comes over a Feign call.",
        tradeoff: "No ACID transaction across services, so registration and notification need an outbox or saga to stay consistent.",
      },
      {
        title: "Discovery and client-side load balancing",
        body: "Every service registers with Eureka. Gateway routes use lb://service-name and Feign clients call services by name, so instances can be added without changing configuration.",
        tradeoff: "Eureka is one more component to run; on Kubernetes, built-in Services would replace it.",
      },
      {
        title: "Configuration in one place",
        body: "A Spring Cloud Config server serves each service's YAML from a config repository; secrets come from environment variables, never from the repo.",
        tradeoff: "Services can't start until the config server is healthy, so startup order matters.",
      },
      {
        title: "Compose that starts in the right order",
        body: "Multi-stage Dockerfiles, health checks on every container, depends_on: service_healthy for startup order, and CPU and memory limits per container.",
        tradeoff: "Compose runs on one machine; real resilience needs an orchestrator such as Kubernetes.",
      },
    ],
    lessonsTitle: "What building it taught me",
    lessons: [
      "Synchronous Feign chains add latency and can cascade failures; there are no circuit breakers yet (Resilience4j is next).",
      "The QR notification call starts inside the registration transaction, so it could fire for a registration that later rolls back. The monolith fixes this with after-commit events.",
      "The registration lock is a synchronized method, which protects only one instance, and scaling out instances is the whole point of microservices. A database-level lock is required.",
    ],
  },
  {
    id: "campusevents",
    route: "/projects/campusevents",
    name: "CampusEvents: Modular Monolith",
    tagline: "The same platform consolidated into one deployable with 10 modules, live on a 512 MB server. Register, get a QR ticket, check in, earn a certificate.",
    status: "Live. The backend runs on a free plan and may take about 30 seconds to wake up.",
    repo: "https://github.com/JayateerthaH/Event-Management-complete",
    live: "https://campusevents-jh.vercel.app",
    stack: ["Java 21", "Spring Boot 4", "Spring Security", "Spring Data JPA", "PostgreSQL", "Quartz", "Docker", "JUnit"],
    numbers: [
      ["10", "modules, schema each"],
      ["200+", "REST endpoints"],
      ["120+", "JUnit tests"],
      ["26", "end-to-end journeys"],
      ["74 s → 34 s", "startup at 0.5 CPU"],
      ["330 → 125 MB", "application JAR"],
    ],
    showArchitecture: false,
    decisions: [
      {
        title: "Same boundaries, one deployable",
        body: "The microservices became modules with separate PostgreSQL schemas that talk through small Java interfaces (EventApi, AttendanceApi). Network calls became method calls; the seams stayed.",
        tradeoff: "No independent scaling per module; notifications would be the first to split out again.",
      },
      {
        title: "Rotating refresh tokens",
        body: "Short-lived JWT access tokens plus single-use refresh tokens in HttpOnly cookies. A refresh proceeds only if deleting the old token affects exactly one row, so replayed or parallel refreshes fail safely.",
        tradeoff: "The access token is held in browser storage; a strict Content-Security-Policy is the next step.",
      },
      {
        title: "No double-booked seats",
        body: "Seat check, registration and waitlist promotion run under one lock that wraps the whole database transaction, so the commit lands before the next request reads the seat count.",
        tradeoff: "Correct for one instance; a conditional UPDATE or row lock is needed for several.",
      },
      {
        title: "Side effects after commit",
        body: "QR emails, badges and analytics run in after-commit, asynchronous event listeners. An email outage can't roll back a registration, and a rolled-back registration never sends a ticket.",
        tradeoff: "A crash between commit and listener loses the event; an outbox table would fix that.",
      },
      {
        title: "Performance by measurement",
        body: "I reproduced the free tier's CPU and memory limits locally, found JVM warm-up, an unused 189 MB dependency and N+1 count queries, then fixed each: JVM flags, removed the dependency, one grouped query.",
        tradeoff: "Serial GC and C1-only compilation trade peak throughput for fast startup.",
      },
      {
        title: "AI with guardrails",
        body: "Claude or Gemini behind one LlmClient interface, chosen by configuration. Schema-validated JSON output, PII redaction, per-user rate limits, timeouts and a non-AI fallback for every feature.",
        tradeoff: "Rate limits live in memory; Redis is needed for several instances.",
      },
    ],
    lessonsTitle: "What I'm improving next",
    lessons: [
      "Database-level seat locking with a concurrency test",
      "Flyway migrations instead of Hibernate auto-update",
      "A CI pipeline running tests on every pull request",
    ],
  },
];

// One registration request through each architecture, for the interactive walkthrough.
export const traces = {
  microservices: {
    label: "Microservices",
    route: "POST /event/42/register → gateway :4005",
    steps: [
      { at: "Client", what: "POST /event/42/register with a Bearer JWT", detail: "Every request enters through the API gateway on port 4005. No business service is reachable from outside the internal Docker network." },
      { at: "Gateway: AuthenticationFilter", what: "Validate the JWT once, add identity headers", detail: "The filter checks signature and expiry, then adds userId, username, userRoles and the internal service key before forwarding. Public routes skip this step." },
      { at: "Gateway: routing + Eureka", what: "Route lb://events-service", detail: "The /event/** route points at events-service by name. Spring Cloud LoadBalancer picks a healthy instance from the Eureka registry." },
      { at: "events-service: InternalAuthFilter", what: "Accept only gateway traffic", detail: "The shared security starter checks the internal key and builds the Spring Security context from the forwarded headers. Without the key: 403." },
      { at: "events-service: RegistrationService", what: "Check duplicates and seats, save to eventsdb", detail: "@Transactional: duplicate check, seat count and insert in the events database. A full event returns 410." },
      { at: "Feign → attendance → email", what: "QR ticket and email", detail: "An @Async Feign call asks attendance-service to create the QR ticket, which calls email-service (Brevo). This call starts before the commit, a gap the monolith closes." },
    ],
  },
  monolith: {
    label: "Modular monolith",
    route: "POST /event/42/register → one Spring Boot app",
    steps: [
      { at: "Client", what: "POST /event/42/register with a Bearer JWT", detail: "The client attaches the access token and shares one refresh across tabs if it has expired." },
      { at: "JwtAuthFilter", what: "Verify signature and expiry, load the user", detail: "A OncePerRequestFilter in the Spring Security chain. Deleted accounts lose access immediately because the user is loaded on every request." },
      { at: "RegistrationController", what: "Enter the seat lock", detail: "synchronized (RegistrationLock.LOCK) wraps the transactional call, so the next request can't read the seat count before this one commits." },
      { at: "RegistrationService", what: "Check duplicates, approval and seats", detail: "@Transactional: the registration and seat count are saved together or not at all. A full event returns 410 and offers the waitlist." },
      { at: "PostgreSQL", what: "COMMIT", detail: "Rows are written to the events schema. The lock is released only after this." },
      { at: "After commit", what: "QR ticket, email, badges", detail: "@TransactionalEventListener + @Async: the QR ticket is created and emailed only after the commit succeeds. A failure here is logged and can't undo the registration." },
    ],
  },
};

export const otherProjects = [
  {
    name: "Medical Record Management System",
    stack: ["Java", "Spring Boot", "SQL"],
    body: "Normalized relational schema in Third Normal Form for patients, doctors, appointments and billing, with keys enforcing referential integrity. Modeled with ER diagrams; slow queries improved with selective indexes and join rewrites.",
    repo: null, // add the GitHub link here
  },
];

export const skills = [
  ["Languages", ["Java", "C++", "SQL"]],
  ["Backend", ["Spring Boot", "Spring Security", "Spring Data JPA", "Hibernate", "REST APIs", "JWT", "OAuth 2.0", "Quartz"]],
  ["Microservices and distributed systems", ["Spring Cloud Gateway", "Netflix Eureka", "OpenFeign", "Spring Cloud Config", "Spring Cloud LoadBalancer", "Database per service", "Service-to-service auth"]],
  ["Data", ["PostgreSQL", "Data modeling", "Normalization", "Indexing", "Transactions"]],
  ["DevOps and testing", ["Docker", "Docker Compose", "Git", "Maven", "JUnit", "Postman"]],
  ["AI integration", ["Claude API", "Gemini API", "Structured outputs"]],
];

// Clearly labelled as learning, not claimed as experience.
export const learning = ["Resilience4j", "Kafka / RabbitMQ", "Redis", "Testcontainers", "Kubernetes", "OpenTelemetry", "Spring AI and MCP"];

export const problemSolving = {
  solved: "700+",
  rating: null, // set to your exact LeetCode contest rating, e.g. "1680"
  note: "Problems solved across LeetCode and Codeforces. I practise with a mistake log and timed contests, focusing on graphs, dynamic programming and binary search on answers.",
};

export const education = {
  school: "KLE Technological University, Hubballi",
  degree: "B.E. Computer Science and Engineering",
  dates: "2023 – 2027",
  grade: "CGPA 8.84 / 10",
};

export const achievements = [
  "KCET rank 1596 among 270,000+ candidates",
  "Led recursion sessions at the University Coding Club",
  "Finalist in two hackathons and inter-college coding contests",
];
