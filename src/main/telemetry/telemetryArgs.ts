import { CxConstants } from "../wrapper/CxConstants";
import { TelemetryEventOptions } from "./TelemetryEventOptions";

const ATTRIBUTE_SEPARATOR = ";";
const KEY_VALUE_SEPARATOR = "=";

/**
 * Replaces the separator characters so a value can't break the key=value;key=value format.
 * The values sent (IDs, enum values, timestamps, package@version) never legitimately contain them.
 */
export function sanitizeAttributeValue(value: string): string {
    return value.replace(/[;=]/g, "_");
}

/**
 * Serializes event attributes as key=value;key=value.
 * Entries with an empty or undefined value, or an invalid key, are left out.
 */
export function serializeEventAttributes(attributes: { [key: string]: string | undefined } | undefined): string {
    if (!attributes) {
        return "";
    }
    const pairs: string[] = [];
    Object.keys(attributes).forEach((key) => {
        const value = attributes[key];
        if (!key || /[;=]/.test(key) || value === undefined || value === null || value === "") {
            return;
        }
        pairs.push(key + KEY_VALUE_SEPARATOR + sanitizeAttributeValue(String(value)));
    });
    return pairs.join(ATTRIBUTE_SEPARATOR);
}

function pushIfSet(args: string[], flag: string, value: string | undefined): void {
    if (value !== undefined && value !== null && value !== "") {
        args.push(flag, value);
    }
}

/**
 * Builds the `cx telemetry ai` flags for an event. Only flags with a value are included.
 */
export function buildTelemetryEventArgs(options: TelemetryEventOptions): string[] {
    const args: string[] = [];
    pushIfSet(args, CxConstants.AI_PROVIDER, options.aiProvider);
    pushIfSet(args, CxConstants.TYPE, options.eventType);
    pushIfSet(args, CxConstants.SUB_TYPE, options.subType);
    pushIfSet(args, CxConstants.ENGINE, options.engine);
    pushIfSet(args, CxConstants.PROBLEM_SEVERITY, options.problemSeverity);
    pushIfSet(args, CxConstants.SCAN_TYPE_FLAG, options.scanType);
    pushIfSet(args, CxConstants.STATUS, options.status);
    if (typeof options.totalCount === "number" && options.totalCount >= 0) {
        args.push(CxConstants.TOTAL_COUNT, Math.floor(options.totalCount).toString());
    }
    pushIfSet(args, CxConstants.AGENT, options.agent);
    pushIfSet(args, CxConstants.AGENT_VERSION, options.agentVersion);
    pushIfSet(args, CxConstants.CX_PLUGIN_VERSION, options.cxPluginVersion);
    pushIfSet(args, CxConstants.PLUGIN_TYPE, options.pluginType);
    pushIfSet(args, CxConstants.STATUS_RESULT, options.statusResult);
    pushIfSet(args, CxConstants.REPO_URL, options.repoUrl);
    pushIfSet(args, CxConstants.EVENT_ATTRIBUTES, serializeEventAttributes(options.eventAttributes));
    return args;
}
