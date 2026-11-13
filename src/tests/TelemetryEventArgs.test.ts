import { CxWrapper } from "../main/wrapper/CxWrapper";
import { CxConfig } from "../main/wrapper/CxConfig";
import { CxCommandOutput } from "../main/wrapper/CxCommandOutput";
import { ExecutionService } from "../main/wrapper/ExecutionService";
import { buildTelemetryEventArgs, sanitizeAttributeValue, serializeEventAttributes } from "../main/telemetry/telemetryArgs";

// These tests check the generated CLI arguments only. They don't run the CLI and don't need a tenant.
describe("Telemetry event arguments", () => {

    describe("sanitizeAttributeValue", () => {
        it("replaces ; and = with _", () => {
            expect(sanitizeAttributeValue("a;b=c")).toBe("a_b_c");
        });

        it("keeps values without separators unchanged", () => {
            expect(sanitizeAttributeValue("lodash@4.17.20")).toBe("lodash@4.17.20");
        });
    });

    describe("serializeEventAttributes", () => {
        it("returns an empty string when there are no attributes", () => {
            expect(serializeEventAttributes(undefined)).toBe("");
            expect(serializeEventAttributes({})).toBe("");
        });

        it("joins attributes as key=value;key=value", () => {
            expect(serializeEventAttributes({ authMethod: "APIKey", loginTimestamp: "2026-11-12T10:00:00Z" }))
                .toBe("authMethod=APIKey;loginTimestamp=2026-11-12T10:00:00Z");
        });

        it("leaves out empty values and invalid keys", () => {
            expect(serializeEventAttributes({ a: "1", b: "", c: undefined, "d=x": "2", "e;y": "3" })).toBe("a=1");
        });

        it("sanitizes values that contain separators", () => {
            expect(serializeEventAttributes({ vulnerabilityId: "x;y=z" })).toBe("vulnerabilityId=x_y_z");
        });
    });

    describe("buildTelemetryEventArgs", () => {
        it("sends only the flags that are set", () => {
            const args = buildTelemetryEventArgs({ eventType: "Scan", subType: "scantriggerd", engine: "Asca", status: "Success" });
            expect(args).toEqual(["--type", "Scan", "--sub-type", "scantriggerd", "--engine", "Asca", "--status", "Success"]);
        });

        it("sends every analytics flag when all fields are set", () => {
            const args = buildTelemetryEventArgs({
                aiProvider: "Copilot",
                eventType: "click",
                subType: "fixWithAIChat",
                engine: "Oss",
                problemSeverity: "High",
                scanType: "oss",
                status: "Success",
                totalCount: 3,
                agent: "Cursor",
                agentVersion: "3.27.22",
                cxPluginVersion: "2.74.0",
                pluginType: "IDE",
                statusResult: "Remediation completed successfully.",
                repoUrl: "https://github.com/org/repo",
                eventAttributes: { vulnerabilityId: "lodash@4.17.20", remediationMode: "DevAssist" },
            });
            expect(args).toEqual([
                "--ai-provider", "Copilot",
                "--type", "click",
                "--sub-type", "fixWithAIChat",
                "--engine", "Oss",
                "--problem-severity", "High",
                "--scan-type", "oss",
                "--status", "Success",
                "--total-count", "3",
                "--agent", "Cursor",
                "--agent-version", "3.27.22",
                "--cx-plugin-version", "2.74.0",
                "--plugin-type", "IDE",
                "--status-result", "Remediation completed successfully.",
                "--repo-url", "https://github.com/org/repo",
                "--event-attributes", "vulnerabilityId=lodash@4.17.20;remediationMode=DevAssist",
            ]);
        });

        it("sends a total count of zero", () => {
            expect(buildTelemetryEventArgs({ totalCount: 0 })).toEqual(["--total-count", "0"]);
        });

        it("leaves out a negative total count", () => {
            expect(buildTelemetryEventArgs({ totalCount: -1 })).toEqual([]);
        });
    });

    describe("CxWrapper.telemetryEvent", () => {
        let spy: jest.SpyInstance;

        beforeEach(() => {
            spy = jest.spyOn(ExecutionService.prototype, "executeCommands")
                .mockResolvedValue(Object.assign(new CxCommandOutput(), { exitCode: 0 }));
        });

        afterEach(() => {
            spy.mockRestore();
        });

        function createWrapper(): CxWrapper {
            const config = new CxConfig();
            config.pathToExecutable = "cx-test";
            config.apiKey = "test-key";
            config.agentName = "VS Code_2.74.0";
            return new CxWrapper(config);
        }

        it("uses the event agent instead of the configured agent", async () => {
            await createWrapper().telemetryEvent({ eventType: "Scan", agent: "VS Code" });
            const commands: string[] = spy.mock.calls[0][1];
            expect(commands.slice(0, 2)).toEqual(["telemetry", "ai"]);
            expect(commands.filter(c => c === "--agent").length).toBe(1);
            expect(commands[commands.indexOf("--agent") + 1]).toBe("VS Code");
        });

        it("uses the configured agent when the event has none", async () => {
            await createWrapper().telemetryEvent({ eventType: "Scan" });
            const commands: string[] = spy.mock.calls[0][1];
            expect(commands.filter(c => c === "--agent").length).toBe(1);
            expect(commands[commands.indexOf("--agent") + 1]).toBe("VS Code_2.74.0");
        });

        it("still sends the authentication arguments", async () => {
            await createWrapper().telemetryEvent({ eventType: "Scan", agent: "VS Code" });
            const commands: string[] = spy.mock.calls[0][1];
            expect(commands[commands.indexOf("--apikey") + 1]).toBe("test-key");
        });
    });
});
