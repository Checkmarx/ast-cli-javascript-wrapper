import { CxWrapper } from '../main/wrapper/CxWrapper';
import { CxCommandOutput } from "../main/wrapper/CxCommandOutput";
import { BaseTest } from "./BaseTest";

describe("Telemetry cases", () => {
    const cxScanConfig = new BaseTest();

    it('TelemetryAIEvent Successful case with minimal parameters - ai log', async () => {
        const wrapper = new CxWrapper(cxScanConfig);
        const cxCommandOutput: CxCommandOutput = await wrapper.telemetryAIEvent(
            "Cursor", 
            "click",  
            "ast-results.viewPackageDetails",
            "secrets",   
            "high",
            "",
            "",
            0
        );
        console.log("Json object from telemetryAIEvent successful case: " + JSON.stringify(cxCommandOutput));
        expect(cxCommandOutput.exitCode).toBe(0);
    });

    it('TelemetryAIEvent Successful case with minimal parameters - detection log', async () => {
        const wrapper = new CxWrapper(cxScanConfig);
        const cxCommandOutput: CxCommandOutput = await wrapper.telemetryAIEvent(
            "",
            "",
            "",
            "",
            "",
            "asca",
            "Critical",
            10
        );
        console.log("Json object from telemetryAIEvent successful case: " + JSON.stringify(cxCommandOutput));
        expect(cxCommandOutput.exitCode).toBe(0);
    });


    it('TelemetryAIEvent Successful case with edge case parameters', async () => {
        const wrapper = new CxWrapper(cxScanConfig);
        const cxCommandOutput: CxCommandOutput = await wrapper.telemetryAIEvent(
            "",        
            "",
            "",             
            "",          
            "",
            "",
            "",
            0
        );
        console.log("Json object from telemetryAIEvent with empty parameters: " + JSON.stringify(cxCommandOutput));
        expect(cxCommandOutput.exitCode).toBe(0);
    });
});

// The bundled CLI must support the analytics flags (AST-182268) for these cases to pass.
// Set CX_TELEMETRY_ANALYTICS_FLAGS=true once a CLI with those flags is bundled.
const describeAnalytics = process.env.CX_TELEMETRY_ANALYTICS_FLAGS === "true" ? describe : describe.skip;

describeAnalytics("Telemetry analytics events", () => {
    const cxScanConfig = new BaseTest();
    const envelope = { agent: "VS Code", agentVersion: "1.140.0", cxPluginVersion: "2.74.0", pluginType: "IDE" };

    it("install event", async () => {
        const output = await new CxWrapper(cxScanConfig).telemetryEvent({
            ...envelope, eventType: "install", subType: "installation", status: "Success",
            statusResult: "Plugin installed successfully.",
            eventAttributes: { installationId: "vscode-7f3a9b2c-4d6e-4f10-a1b2-c3d4e5f67890", installationTimestamp: "2026-11-12T10:00:00Z" },
        });
        expect(output.exitCode).toBe(0);
    });

    it("authentication event", async () => {
        const output = await new CxWrapper(cxScanConfig).telemetryEvent({
            ...envelope, eventType: "authentication", subType: "authentication", status: "Success",
            statusResult: "Authentication successful.",
            eventAttributes: { authMethod: "APIKey", loginTimestamp: "2026-11-12T10:00:00Z" },
        });
        expect(output.exitCode).toBe(0);
    });

    it("scan event", async () => {
        const output = await new CxWrapper(cxScanConfig).telemetryEvent({
            ...envelope, eventType: "Scan", subType: "scantriggerd", engine: "Asca", problemSeverity: "High",
            totalCount: 3, status: "Success", statusResult: "Critical=0, High=2, Medium=1, Low=0, Info=0",
            repoUrl: "https://github.com/Checkmarx/ast-cli-javascript-wrapper", eventAttributes: { apiVersion: "v2" },
        });
        expect(output.exitCode).toBe(0);
    });

    it("remediation event", async () => {
        const output = await new CxWrapper(cxScanConfig).telemetryEvent({
            ...envelope, eventType: "click", subType: "fixWithAIChat", engine: "Oss", problemSeverity: "High",
            aiProvider: "Copilot", status: "Success", statusResult: "Remediation completed successfully.",
            eventAttributes: { vulnerabilityId: "lodash@4.17.20", remediationMode: "DevAssist" },
        });
        expect(output.exitCode).toBe(0);
    });
});