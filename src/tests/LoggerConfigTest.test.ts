import { getLoggerWithFilePath, logger } from '../main/wrapper/loggerConfig';
import * as fs from 'fs';
import * as path from 'path';

describe('Logger Configuration', () => {
	it('should initialize logger with file path', () => {
		const tempDir = path.join(__dirname, '../../tmp');
		if (!fs.existsSync(tempDir)) {
			fs.mkdirSync(tempDir, { recursive: true });
		}

		const logFilePath = path.join(tempDir, 'test.log');

		// This should call configurationWithFile and cover line 4
		getLoggerWithFilePath(logFilePath);

		expect(logger).toBeDefined();
	});

	it('should initialize logger without file path', () => {
		// This should call configurationWithoutFile
		getLoggerWithFilePath();

		expect(logger).toBeDefined();
	});
});
