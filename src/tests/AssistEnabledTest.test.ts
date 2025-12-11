import { CxWrapper } from '../main/wrapper/CxWrapper';
import { BaseTest } from './BaseTest';
import { ExecutionService } from '../main/wrapper/ExecutionService';
import { CxConstants } from '../main/wrapper/CxConstants';

describe('cxOneAssistEnabled tenant setting', () => {
  const baseConfig = new BaseTest();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns true when assist key value is true (lowercase)', async () => {
    jest.spyOn(ExecutionService.prototype, 'executeMapTenantOutputCommands')
      .mockResolvedValue(new Map([[CxConstants.ASSIST_KEY, 'true']]));
    const wrapper = new CxWrapper(baseConfig);
    const enabled = await wrapper.cxOneAssistEnabled();
    expect(enabled).toBe(true);
  });

  it('returns true when assist key value is TRUE (uppercase)', async () => {
    jest.spyOn(ExecutionService.prototype, 'executeMapTenantOutputCommands')
      .mockResolvedValue(new Map([[CxConstants.ASSIST_KEY, 'TRUE']]));
    const wrapper = new CxWrapper(baseConfig);
    const enabled = await wrapper.cxOneAssistEnabled();
    expect(enabled).toBe(true);
  });

  it('returns false when assist key value is false', async () => {
    jest.spyOn(ExecutionService.prototype, 'executeMapTenantOutputCommands')
      .mockResolvedValue(new Map([[CxConstants.ASSIST_KEY, 'false']]));
    const wrapper = new CxWrapper(baseConfig);
    const enabled = await wrapper.cxOneAssistEnabled();
    expect(enabled).toBe(false);
  });

  it('returns false when assist key is missing', async () => {
    jest.spyOn(ExecutionService.prototype, 'executeMapTenantOutputCommands')
      .mockResolvedValue(new Map([[CxConstants.IDE_SCANS_KEY, 'true']]));
    const wrapper = new CxWrapper(baseConfig);
    const enabled = await wrapper.cxOneAssistEnabled();
    expect(enabled).toBe(false);
  });

  it('trims whitespace around key/value before evaluating', async () => {
    jest.spyOn(ExecutionService.prototype, 'executeMapTenantOutputCommands')
      .mockResolvedValue(new Map([[`  ${CxConstants.ASSIST_KEY}  `, '  true  ']]));
    const wrapper = new CxWrapper(baseConfig);
    const enabled = await wrapper.cxOneAssistEnabled();
    expect(enabled).toBe(true);
  });
});
