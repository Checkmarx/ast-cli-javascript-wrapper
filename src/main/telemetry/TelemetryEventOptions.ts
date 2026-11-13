/**
 * Options for a Dev Assist analytics telemetry event (`cx telemetry ai`).
 *
 * Every field is optional. A flag is sent to the CLI only when its value is set,
 * so callers pass just the fields that apply to their event.
 */
export interface TelemetryEventOptions {
    /** AI assistant used for a remediation, e.g. Copilot, Claude, Cursor. */
    aiProvider?: string;
    /** Event type, e.g. install, authentication, Scan, click. */
    eventType?: string;
    /** Event sub type, e.g. installation, authentication, scantriggerd, fixWithAIChat. */
    subType?: string;
    /** Realtime engine, e.g. Asca, Oss, Secrets, IaC, Containers. */
    engine?: string;
    /** Vulnerability severity, e.g. Critical, High, Medium, Low, Info. */
    problemSeverity?: string;
    /** Legacy detection field kept for compatibility with existing events. */
    scanType?: string;
    /** Success or Failure. */
    status?: string;
    /** Number of findings in a scan. */
    totalCount?: number;
    /** IDE or agent name sent in the telemetry payload, e.g. VS Code, Cursor. Overrides CxConfig.agentName for this call. */
    agent?: string;
    /** IDE or agent version, e.g. 1.140.0. */
    agentVersion?: string;
    /** Checkmarx plugin version, e.g. 2.74.0. */
    cxPluginVersion?: string;
    /** IDE or CLI. */
    pluginType?: string;
    /** Outcome message, e.g. "Critical=1, High=0, Medium=2, Low=0, Info=0". */
    statusResult?: string;
    /** Git repository URL, without credentials. */
    repoUrl?: string;
    /** Event-specific attributes, sent as key=value;key=value. */
    eventAttributes?: { [key: string]: string | undefined };
}
