# AST CLI JavaScript Wrapper

## Project Overview

The AST CLI JavaScript Wrapper is a core library within the Checkmarx AST (Application Security Testing) project ecosystem. It provides a shared, technology-neutral JavaScript/TypeScript interface for interacting with the AST CLI, which is the underlying command-line tool for security scanning and analysis.

This wrapper abstracts the complexity of executing the AST CLI binary across different operating systems (Windows, macOS, Linux) and exposes a clean, well-typed API for features like:
- Application Security scanning (ASCA)
- Container scanning (realtime scanning)
- IaC (Infrastructure as Code) scanning
- KICS scanning
- OSS (Open Source Software) scanning
- Secret scanning and masking
- Learn More descriptions and samples
- Codebashing integration
- Chat integration
- Results querying and analysis

The library is published to the GitHub npm registry as `@Checkmarx/ast-cli-javascript-wrapper` and serves as a dependency for various Checkmarx integrations and tools.

## Architecture

### High-Level Design

The wrapper follows a modular architecture where each security scanning feature or capability is encapsulated in its own module:

```
CxWrapper (Main entry point)
├── CxConfig (Configuration & credentials)
├── CxAsca (Application Security scanning)
├── CxBFL (Business Logic Flaw detection)
├── CxChat (AI-powered chat)
├── CxCodeBashing (Training integration)
├── CxContainerRealtime (Real-time container scanning)
├── CxIac (Infrastructure as Code scanning)
├── CxKicsRealTime (KICS real-time scanning)
├── CxLearnMore (Learning materials)
├── CxMask (Secret masking)
├── CxOss (Open Source Software scanning)
├── CxPredicate (Predicate queries)
├── CxProject (Project management)
├── CxRemediation (SAST remediation suggestions)
├── CxResults (Results processing)
├── CxScan (Generic scan operations)
├── CxSecrets (Secret detection)
└── ExecutionService (CLI binary execution)
```

### Key Components

- **CxWrapper**: Main class that orchestrates all operations. Accepts a `CxConfig` object for credentials and configuration.
- **CxConfig**: Handles API authentication (API key or client credentials) and CLI configuration.
- **ExecutionService**: Responsible for spawning and managing the AST CLI binary, capturing output, and error handling.
- **Feature Modules**: Each module (CxAsca, CxChat, etc.) exposes operations specific to that feature.

### Design Patterns

- **Dependency Injection**: Configuration is injected into CxWrapper at construction time.
- **Binary Execution**: Abstracts platform-specific CLI binary execution (Windows exe, macOS, Linux).
- **Logging**: Uses log4js for comprehensive logging with optional file-based logging support.
- **Type Safety**: Full TypeScript with strict type checking ensures compile-time safety.

## Repository Structure

```
ast-cli-javascript-wrapper/
├── src/
│   ├── main/                           # Source code
│   │   ├── wrapper/                    # Main wrapper and config
│   │   │   ├── CxWrapper.ts            # Main entry point class
│   │   │   ├── CxConfig.ts             # Configuration class
│   │   │   ├── CxConstants.ts          # Constants
│   │   │   ├── ExecutionService.ts     # CLI binary execution
│   │   │   ├── CxCommandOutput.ts      # Output model
│   │   │   ├── CxParamType.ts          # Parameter types
│   │   │   ├── loggerConfig.ts         # Logger setup
│   │   │   ├── utils.ts                # Utility functions
│   │   │   └── resources/              # CLI binaries (cx.exe, cx-mac, cx-linux)
│   │   ├── asca/                       # Application Security scanning
│   │   ├── bfl/                        # Business Logic Flaw detection
│   │   ├── chat/                       # Chat module
│   │   ├── codebashing/                # Codebashing integration
│   │   ├── containersRealtime/         # Container realtime scanning
│   │   ├── iacRealtime/                # IaC realtime scanning
│   │   ├── kicsRealtime/               # KICS realtime scanning
│   │   ├── learnmore/                  # Learning materials
│   │   ├── mask/                       # Secret masking
│   │   ├── oss/                        # OSS scanning
│   │   ├── predicates/                 # Predicate queries
│   │   ├── project/                    # Project operations
│   │   ├── remediation/                # Remediation suggestions
│   │   ├── results/                    # Results processing (CVSS, data models)
│   │   ├── scan/                       # Generic scan operations
│   │   ├── secrets/                    # Secret detection
│   │   └── scaRealtime/                # SCA realtime scanning
│   └── tests/                          # Test files
│       ├── *.test.ts                   # Jest test files
│       ├── BaseTest.ts                 # Base test class with shared setup
│       └── data/                       # Test data fixtures
├── dist/                               # Compiled JavaScript output (generated)
├── package.json                        # npm package definition
├── tsconfig.json                       # TypeScript compilation config
├── jest.config.js                      # Jest testing config
├── jest.setup.js                       # Jest global setup
├── .eslintrc.json                      # ESLint configuration
├── .github/
│   ├── workflows/                      # GitHub Actions workflows
│   ├── scripts/                        # Build and utility scripts
│   ├── dependabot.yml                  # Dependabot configuration
│   └── release.yml                     # Release configuration
├── CODEOWNERS                          # Code owners file
├── README.md                           # Project README
└── CLAUDE.md                           # This file
```

## Technology Stack

### Language & Runtime
- **TypeScript** (5.6.3+) — Primary language for type safety and modern JavaScript features
- **Node.js** — Runtime environment
- **CommonJS** — Module system (compiled to es5)

### Core Dependencies
- **log4js** (6.9.1+) — Logging framework for console and file-based logging

### Development Dependencies
- **Jest** (29.7.0+) — Testing framework
- **ts-jest** (29.2.2+) — TypeScript preprocessor for Jest
- **ts-mockito** (2.6.1+) — Mocking library for TypeScript
- **ESLint** (8.1.0+) with TypeScript parser — Code linting and style enforcement
- **TypeScript** (5.6.3+) — TypeScript compiler
- **copyfiles** (2.4.1+) — Utility for copying files during build

### Build Output
- Compiled JavaScript in `dist/` directory
- Declaration files (.d.ts) for type information
- Source maps for debugging

### Platform Support
- Windows (cx.exe binary included)
- macOS (cx-mac binary included)
- Linux (cx-linux binary included)

## Development Setup

### Prerequisites

- **Node.js** (Latest LTS recommended)
- **npm** (7.0.0 or higher)
- Git (for cloning and version control)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CheckmarxDev/ast-cli-javascript-wrapper.git
cd ast-cli-javascript-wrapper
```

2. Install dependencies:
```bash
npm install
```

### Build

Compile TypeScript to JavaScript:
```bash
npm run build
```

This command:
- Compiles all `.ts` files from `src/` to `dist/` using TypeScript
- Runs postbuild script to copy CLI binaries and test data

### Development Workflow

```bash
# Build the project
npm run build

# Run tests
npm test

# Run linting
npm run lint

# Fix linting issues automatically
npm run lint-and-fix
```

### Integration Tests Setup

For integration tests that communicate with actual AST services, set environment variables:

**Linux/macOS:**
```bash
export CX_CLIENT_ID="your-client-id"
export CX_CLIENT_SECRET="your-client-secret"
export CX_APIKEY="your-api-key"
export CX_BASE_URI="https://ast.checkmarx.net"
export CX_BASE_AUTH_URI="https://auth.checkmarx.net"
export CX_TENANT="your-tenant"
export PATH_TO_EXECUTABLE="/path/to/cli/binary"
```

**Windows (PowerShell):**
```powershell
setx CX_CLIENT_ID "your-client-id"
setx CX_CLIENT_SECRET "your-client-secret"
setx CX_APIKEY "your-api-key"
setx CX_BASE_URI "https://ast.checkmarx.net"
setx CX_BASE_AUTH_URI "https://auth.checkmarx.net"
setx CX_TENANT "your-tenant"
setx PATH_TO_EXECUTABLE "C:\path\to\cli\binary"
```

## Coding Standards

### TypeScript Configuration

The project uses strict TypeScript compiler options:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "sourceMap": true,
    "removeComments": false
  }
}
```

Key enforcements:
- **Strict Mode**: All TypeScript strict checks enabled
- **No Implicit Any**: All variables must have explicit types
- **No Unused Locals**: All declared variables must be used
- **Consistent Casing**: File and variable naming must follow conventions

### Linting Rules

ESLint is configured with TypeScript support:
- Enforces consistent code style across the codebase
- Catches potential bugs and anti-patterns
- Must pass linting before merging

Run linting with:
```bash
npm run lint
npm run lint-and-fix  # Auto-fix issues
```

### Naming Conventions

- **Classes**: PascalCase (e.g., `CxWrapper`, `ExecutionService`)
- **Functions/Methods**: camelCase (e.g., `executeCommand`, `getTrimmedMapValue`)
- **Constants**: UPPER_SNAKE_CASE (e.g., in CxConstants)
- **Private members**: Prefix with underscore (e.g., `_config`)
- **Interfaces/Types**: PascalCase (e.g., `CxConfig`, `CxParamType`)

### Import Patterns

- Prefer named imports for clarity
- Organize imports by: standard library, third-party, local modules
- No circular dependencies

## Project Rules

### Code Ownership

Default code owners (defined in CODEOWNERS):
- @cx-anurag-dalke
- @cx-rah-pid

### Versioning & Release

- Semantic versioning (MAJOR.MINOR.PATCH)
- Current version: 0.0.155
- Published to GitHub npm registry (not public npm)

### Package Configuration

Published package includes:
- All compiled JavaScript in `dist/main/`
- TypeScript declarations for type safety
- README.md

### Binary Management

The wrapper bundles platform-specific AST CLI binaries:
- Windows: `cx.exe`
- macOS: `cx-mac`
- Linux: `cx-linux`

These are automatically selected at runtime based on `process.platform`.

### Dependency Management

**Overrides** (to address security vulnerabilities):
- `bluebird`: 3.7.2 (transitive dependency pinning)
- `debug`: ^4.4.0 (security fix)
- `flatted`: ^3.4.2 (security fix)
- `picomatch`: 2.3.2 (security fix - AST-143876)

All overrides are security-driven and documented in `package.json`.

### CLI Version Pinning (`checkmarx-ast-cli.version`)

The file `checkmarx-ast-cli.version` at the repo root is the **single source of truth** for the bundled AST CLI binary version (currently `2.3.48`). It is read by the GitHub Actions workflow at build time to determine which binary version is in use.

**Update process** (automated via `.github/workflows/update-cli.yml`):
1. The workflow fires on `workflow_dispatch` or a `repository_dispatch` event of type `cli-version-update`.
2. It fetches the latest release tag from `github.com/Checkmarx/ast-cli`.
3. If the latest tag differs from the value in `checkmarx-ast-cli.version`, it writes the new tag to the file, downloads the new binaries via `.github/scripts/update_cli.sh`, re-tracks them with Git LFS, and opens a PR.

**Manual update rules**:
- Do not edit `checkmarx-ast-cli.version` directly without also updating the binaries; the file and the binaries in `src/main/wrapper/resources/` must stay in sync.
- Bump the version only when the target CLI release has passed its own test suite; never pin to a pre-release tag in `main`.
- After merging a CLI bump PR, verify that all integration tests pass against the new binary before releasing a new wrapper version.

### Don'ts

The following are explicitly prohibited — they introduce security risk, break consumers, or undermine the dependency governance model:

- **Never log secrets.** API keys, `clientSecret`, OAuth tokens, and any value sourced from `CxConfig` credentials must never appear in log output, error messages, or stack traces. Redact before logging (see [Log Redaction Policy](#log-redaction-policy) in the Security & Access section).
- **Never change dependency overrides without a security review.** The `overrides` block in `package.json` exists to mitigate known CVEs. Removing or loosening a pinned version requires a documented security sign-off linked to a Jira ticket.
- **Never import internal build paths in consumers.** Importing from `dist/main/...` or `src/main/...` directly is unsupported. Consumers must import only from the published package root (`@checkmarx/ast-cli-javascript-wrapper`) using the exported public API.
- **Never hardcode credentials or base URIs.** All environment-specific values must flow through `CxConfig` or environment variables.
- **Never commit CLI binaries outside Git LFS.** The three platform binaries (`cx.exe`, `cx-mac`, `cx-linux`) are tracked via LFS; committing them as plain blobs bloats the repository and will be rejected by CI.

## Testing Strategy

### Test Framework

- **Framework**: Jest 29.7.0+
- **TypeScript Support**: ts-jest preprocessor
- **Mocking**: ts-mockito for type-safe mocks

### Test Structure

Test files located in `src/tests/`:
- `*.test.ts` — Jest test files
- `BaseTest.ts` — Shared test setup and utilities
- `data/` — Test fixtures and mock data

### Test Execution

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- AssistEnabledTest.test.ts

# Watch mode for development
npm test -- --watch
```

### Key Test Suites

- **AssistEnabledTest** — Assist feature functionality
- **AuthTest** — Authentication and credential handling
- **ChatTest** — Chat integration
- **LearnMoreDescriptions** — Learn More feature
- **MaskTest** — Secret masking
- **PredicateTest** — Predicate queries
- **ProjectTest** — Project operations
- **RemediationTest** — Remediation suggestions

### Test Data

Test data is copied to `dist/` during build and test execution:
```bash
copyfiles -u 1 src/tests/data/* dist/;
```

### Coverage Expectations

- Aim for >80% code coverage
- All public APIs should have corresponding tests
- Edge cases and error scenarios should be tested

## Performance Considerations

### Large Scans and Output Handling

The `ExecutionService` spawns the AST CLI binary as a child process and captures its stdout/stderr. For operations that produce large outputs (e.g., full project scans, large OSS dependency trees, bulk results queries) keep the following in mind:

- **Stream instead of buffering.** If the consumer needs to process results incrementally, avoid collecting the entire stdout string before parsing. Pipe the child process `stdout` stream directly to a JSON/line parser rather than waiting for the process to exit.
- **Set explicit `maxBuffer` guards.** Node's default `exec` buffer is 1 MB. For scan commands expected to return large JSON payloads, use `spawn` (already done in `ExecutionService`) and consume the stream — do not switch to `execSync` or `exec` for large outputs.
- **Limit parallel scan invocations.** Each scan call spawns a new CLI process. Running more than **3–5 concurrent scans** on a single host risks memory pressure and I/O contention. Callers that parallelize scans must implement their own concurrency limit (e.g., a semaphore or a promise pool with `concurrency ≤ 4`).

### Process Lifecycle Management

Failure to clean up spawned CLI processes leads to zombie processes and resource leaks:

- **Always handle process exit and error events.** Attach handlers for `close`, `error`, and `exit` on every spawned process; do not rely solely on Promise resolution.
- **Kill child processes on timeout or cancellation.** If the caller times out or cancels, call `childProcess.kill('SIGTERM')` (or `SIGKILL` on Windows) before resolving/rejecting the outer Promise.
- **Do not reuse a single `ChildProcess` instance across invocations.** Each `ExecutionService` call must spawn a fresh process; sharing processes between concurrent requests causes interleaved output.
- **Drain streams before closing.** Wait for the `close` event (not just `exit`) to ensure all buffered output has been consumed before parsing results.

## Known Issues

### Dependency Vulnerabilities (Managed)

Several transitive dependencies have known vulnerabilities that are mitigated by pinning safer versions:

1. **picomatch** (AST-143876) — Upgraded to 2.3.2 to fix vulnerability
2. **bluebird** — Pinned to 3.7.2 for compatibility
3. **debug** — Updated to ^4.4.0 for security
4. **flatted** — Updated to ^3.4.2 for security

These overrides are managed in `package.json` and should not be changed without security review.

### Platform-Specific Considerations

- **File Permissions**: macOS and Linux binaries have execute permissions set via `fs.chmodSync(path, 0o777)` during initialization
- **Path Handling**: Paths are constructed using `path.join()` for cross-platform compatibility
- **Line Endings**: Repository uses `.gitattributes` to manage line endings across platforms

## API/Interfaces

### Main Entry Point

```typescript
import { CxWrapper } from "@checkmarx/ast-cli-javascript-wrapper";
import { CxConfig } from "@checkmarx/ast-cli-javascript-wrapper";

// Create wrapper with configuration
const config = new CxConfig();
config.apiKey = "your-api-key";
config.baseUri = "https://ast.checkmarx.net";

const wrapper = new CxWrapper(config, "optional-log-file-path");
```

### Feature Modules

Each feature is accessed as a property of CxWrapper:

```typescript
// Application Security scanning
wrapper.asca.scan(...);

// Chat
wrapper.chat.sendMessage(...);

// Results
wrapper.results.getCvss(...);

// And more: bfl, codebashing, containers, iac, kics, learnmore, mask, oss, predicates, project, remediation, scan, secrets, scaRealtime
```

### Configuration

`CxConfig` accepts:
- `apiKey` — API token for authentication
- `clientId` & `clientSecret` — OAuth credentials (alternative to apiKey)
- `baseUri` — Base URL for AST API
- `baseAuthUri` — Base URL for authentication service
- `tenant` — Tenant identifier
- `pathToExecutable` — Custom path to CLI binary (optional, auto-detected otherwise)

### Logging

```typescript
import { getLoggerWithFilePath, logger } from "path/to/loggerConfig";

// Set log file path
getLoggerWithFilePath("path/to/logfile.log");

// Log messages
logger.info("Information message");
logger.error("Error message");
logger.debug("Debug message");
```

## Build & Deployment

### Build Process

```bash
npm run build
```

Outputs:
- `dist/main/**/*` — Compiled JavaScript
- `dist/main/**/*.d.ts` — TypeScript declarations
- `dist/main/wrapper/resources/*` — CLI binaries
- `dist/**/*` — Test data and resources

### Publishing

The package is published to GitHub npm registry:

```bash
npm publish
```

Registry configuration in `package.json`:
```json
"publishConfig": {
  "registry": "https://npm.pkg.github.com"
}
```

### Release Workflow

GitHub Actions workflows handle:
- Automated testing on push/PR
- Automated dependency updates (Dependabot)
- Release automation (via `.github/workflows/release.yml`)

## Security & Access

### Code Owners

Repository code owners (CODEOWNERS):
- @cx-anurag-dalke
- @cx-rah-pid

Code review approval from these maintainers is required for merging.

### License

- **License Type**: ISC (permissive, business-friendly)
- **Copyright**: © 2021 Checkmarx Ltd. All Rights Reserved

### Secure Practices

- All sensitive credentials (API keys, tokens) are passed via environment variables or CxConfig, never hardcoded
- Communication with AST services uses HTTPS
- Type safety prevents injection vulnerabilities
- Input validation through strict TypeScript types

### Log Redaction Policy

The following values **must never appear** in any log line, error message, exception stack trace, or diagnostic output — regardless of log level:

| Data category | Examples |
|---|---|
| API keys / tokens | `CxConfig.apiKey`, `CX_APIKEY` env var value |
| OAuth client secrets | `CxConfig.clientSecret`, `CX_CLIENT_SECRET` env var value |
| OAuth access tokens | Bearer tokens returned during authentication |
| Session / refresh tokens | Any token returned by the auth service |
| Full CLI command strings | Avoid logging raw argv arrays that may contain `--apikey` or `--client-secret` values |

**How to comply:**
- Log only the _presence_ of a credential (e.g., `"apiKey provided: true"`), never its value.
- When logging CLI invocations, replace secret flag values with `[REDACTED]` before writing to the log.
- Do not log raw `CxConfig` objects or serialize them with `JSON.stringify`; destructure only the safe fields.
- Error objects caught from the CLI process must be inspected before logging — strip any line that matches a token pattern before writing to the log file.

### Least-Privilege Token Scopes

When provisioning API keys or OAuth clients for use with this wrapper, request only the scopes required for the specific integration:

- **Read-only integrations** (results viewing, learn-more, codebashing): request `ast-api:read` or equivalent read scope only.
- **Scan-triggering integrations**: additionally request `ast-api:scan`.
- **CI/CD service accounts**: use short-lived OAuth credentials (`clientId` + `clientSecret`) rather than long-lived API keys where the auth server supports it.
- **Never use admin-scoped tokens** in automated integrations; admin scopes are for human operators only.
- Rotate API keys and client secrets on a schedule defined by your organization's security policy; the wrapper itself does not cache or store tokens between invocations.

### Access Control

- Integrations authenticate using API keys or OAuth credentials
- CLI binary execution runs with inherited process permissions
- Logging is configurable to avoid logging sensitive information

## Contributing

### Before Submitting a PR

1. Ensure code passes linting: `npm run lint`
2. Ensure all tests pass: `npm test`
3. Build the project: `npm run build`
4. Update CLAUDE.md if architecture or setup changes
5. Obtain approval from code owners (CODEOWNERS)

### Commit Messages

- Use clear, descriptive commit messages
- Reference Jira tickets when applicable (e.g., "AST-12345: Fix authentication flow")
- Keep commits focused and atomic

### Branch Naming

- Feature branches: `feature/AST-xxxxx-description`
- Bug fix branches: `bug/AST-xxxxx-description`
- Documentation: `docs/description`

## Resources

- **Repository**: https://github.com/CheckmarxDev/ast-cli-javascript-wrapper
- **Issues**: https://github.com/CheckmarxDev/ast-cli-javascript-wrapper/issues
- **Package Registry**: https://npm.pkg.github.com
- **AST CLI Documentation**: Referenced in README.md

---

**Last Updated**: May 2026
**Maintained by**: Checkmarx AST Integrations Team
