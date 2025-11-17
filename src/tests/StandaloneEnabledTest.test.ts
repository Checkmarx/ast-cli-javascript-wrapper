import { CxWrapper } from '../main/wrapper/CxWrapper';
import { BaseTest } from './BaseTest';
import { ExecutionService } from '../main/wrapper/ExecutionService';
import { CxConstants } from '../main/wrapper/CxConstants';

describe('standaloneEnabled tenant setting', () => {
  const baseConfig = new BaseTest();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns true when standalone tenant flag is true (lowercase)', async () => {
    jest.spyOn(ExecutionService.prototype, 'executeMapTenantOutputCommands')
      .mockResolvedValue(new Map([[CxConstants.STANDALONE_KEY, 'true']]));
    const wrapper = new CxWrapper(baseConfig);
    const enabled = await wrapper.standaloneEnabled();
    expect(enabled).toBe(true);
  });

  it('returns true when standalone tenant flag is TRUE (uppercase)', async () => {
    jest.spyOn(ExecutionService.prototype, 'executeMapTenantOutputCommands')
      .mockResolvedValue(new Map([[CxConstants.STANDALONE_KEY, 'TRUE']]));
    const wrapper = new CxWrapper(baseConfig);
    const enabled = await wrapper.standaloneEnabled();
    expect(enabled).toBe(true);
  });

  it('returns false when standalone tenant flag is false', async () => {
    jest.spyOn(ExecutionService.prototype, 'executeMapTenantOutputCommands')
      .mockResolvedValue(new Map([[CxConstants.STANDALONE_KEY, 'false']]));
    const wrapper = new CxWrapper(baseConfig);
    const enabled = await wrapper.standaloneEnabled();
    expect(enabled).toBe(false);
  });

  it('returns false when standalone tenant flag key is missing', async () => {
    jest.spyOn(ExecutionService.prototype, 'executeMapTenantOutputCommands')
      .mockResolvedValue(new Map([[CxConstants.IDE_SCANS_KEY, 'true']]));
    const wrapper = new CxWrapper(baseConfig);
    const enabled = await wrapper.standaloneEnabled();
    expect(enabled).toBe(false);
  });

  it('trims whitespace around key and value before evaluating', async () => {
    // Simulate raw output map entries with leading/trailing spaces
    jest.spyOn(ExecutionService.prototype, 'executeMapTenantOutputCommands')
      .mockResolvedValue(new Map([[`  ${CxConstants.STANDALONE_KEY}  `, '  true  ']]));
    const wrapper = new CxWrapper(baseConfig);
    const enabled = await wrapper.standaloneEnabled();
    expect(enabled).toBe(true);
  });
});
