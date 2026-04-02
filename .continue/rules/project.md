"# Project Ruleset

## 1. Technology Stack

- **Language:** TypeScript (5.x)
- **Runtime:** Node.js with Express
- **Templates:** EJS
- **Dependencies:**
  - `package.json` (Node.js dependencies)

## 2. Coding Standards

- **Linting:** ESLint with @typescript-eslint
- **Formatting:** Prettier

## 3. Project Structure

project/
├── .continue/ # Configuration and rules files
│ └── rules/ # Project rules documentation
├── src/ # Main source code
│ ├── main.ts # Server entry point (Express app)
│ └── test/ # Unit tests (Mocha/Chai)
├── views/ # EJS template files
├── scripts/ # Build and utility scripts
│ ├── certs/ # SSL certificate generation
│ └── start.sh # Server startup script
├── test/ # Integration/system tests
├── .git/ # Git repository metadata
├── .prettierrc # Prettier configuration
├── eslint.config.js # ESLint configuration
├── package.json # Project dependencies and scripts
├── package-lock.json # Dependency lock file
├── tsconfig.json # TypeScript configuration
└── lgs-chess.code-workspace # VS Code workspace settings

## 4. Development Workflow

1. Format code: `npm run format`
2. Lint code: `npm run lint`
3. Build project: `npm run compile` (if needed)
4. Start server: `./scripts/start.sh`
5. Run unit tests: `npm test`
6. Run integration tests: `npm run test:integration`

## 5. Key Features

- TypeScript strict mode configuration
- EJS template rendering with Express
- Mocha/Chai test suite for both unit and integration testing
- Prettier + ESLint integration with Airbnb style guide
- SSL certificate generation scripts
- VS Code workspace settings for optimal development environment"
