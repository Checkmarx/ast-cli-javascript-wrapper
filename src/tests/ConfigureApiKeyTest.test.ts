import {CxWrapper} from '../main/wrapper/CxWrapper';
import {CxConfig} from "../main/wrapper/CxConfig";
import {CxCommandOutput} from "../main/wrapper/CxCommandOutput";
import {ExecutionService} from "../main/wrapper/ExecutionService";
import {logger} from "../main/wrapper/loggerConfig";

// These tests never run the real cx: they check the arguments, and run Node itself for the output checks.
describe("Configure API key", () => {
    const secret = "the-secret-api-key";

    afterEach(() => {
        jest.restoreAllMocks();
    });

    function wrapper(): CxWrapper {
        const config = new CxConfig();
        config.pathToExecutable = process.execPath;
        config.apiKey = "key-from-config";
        config.agentName = "VS Code";
        return new CxWrapper(config);
    }

    function stubSensitiveCommands(): jest.SpyInstance {
        const done = new CxCommandOutput();
        done.exitCode = 0;
        return jest.spyOn(ExecutionService.prototype, "executeSensitiveCommands").mockResolvedValue(done);
    }

    it('configureApiKey runs configure set for cx_apikey, with only the given value', async () => {
        const spy = stubSensitiveCommands();

        const output = await wrapper().configureApiKey(secret);

        expect(output.exitCode).toBe(0);
        expect(spy).toHaveBeenCalledWith(process.execPath,
            ["configure", "set", "--prop-name", "cx_apikey", "--prop-value", secret]);
    });

    it('clearApiKey sets cx_apikey to an empty value', async () => {
        const spy = stubSensitiveCommands();

        await wrapper().clearApiKey();

        expect(spy).toHaveBeenCalledWith(process.execPath,
            ["configure", "set", "--prop-name", "cx_apikey", "--prop-value", ""]);
    });

    it('authLogout runs auth logout without credentials', async () => {
        const done = new CxCommandOutput();
        done.exitCode = 0;
        const spy = jest.spyOn(ExecutionService.prototype, "executeCommands").mockResolvedValue(done);

        const output = await wrapper().authLogout();

        expect(output.exitCode).toBe(0);
        expect(spy).toHaveBeenCalledWith(process.execPath, ["auth", "logout"]);
    });

    it('executeSensitiveCommands returns the exit code and never logs or returns the output', async () => {
        const info = jest.spyOn(logger, "info");
        const error = jest.spyOn(logger, "error");
        const script = `process.stdout.write('${secret}'); process.stderr.write('${secret}'); process.exit(3)`;

        const output = await new ExecutionService().executeSensitiveCommands(process.execPath, ["-e", script]);

        expect(output.exitCode).toBe(3);
        expect(output.status).not.toContain(secret);
        expect(output.payload).toBeUndefined();
        const logged = [...info.mock.calls, ...error.mock.calls].map((call) => String(call[0])).join("\n");
        expect(logged).not.toContain(secret);
    });

    it('executeSensitiveCommands passes arguments unchanged', async () => {
        const value = `a"b'c, d`;
        const script = `process.exit(process.argv[1] === ${JSON.stringify(value)} ? 0 : 1)`;

        const output = await new ExecutionService().executeSensitiveCommands(process.execPath, ["-e", script, value]);

        expect(output.exitCode).toBe(0);
    });

    it('executeSensitiveCommands reports a failure to start', async () => {
        const output = await new ExecutionService().executeSensitiveCommands("does-not-exist-cx-binary", []);

        expect(output.exitCode).toBe(-1);
    });
});
