export default class CxEnvironment {
  id: string;
  name: string;
  url: string;
  scanType: string;
  createdAt: string;
  riskRating: string;
  lastScanTime: string;
  lastStatus: string

  static parseEnvironment(resultObject: any): CxEnvironment[] {
    let environments: CxEnvironment[] = [];

    const parseEnvironment = (result: any): CxEnvironment => {
      const environment = new CxEnvironment();
      environment.id = result.EnvironmentID;
      environment.name = result.Domain;
      environment.url = result.URL;
      environment.scanType = result.ScanType;
      environment.createdAt = result.Created;
      environment.riskRating = result.RiskRating;
      environment.lastScanTime = result.LastScanTime;
      environment.lastStatus = result.LastStatus;
      return environment;
    }

    if (resultObject instanceof Array) {
      environments = resultObject.map((result: any) => parseEnvironment(result));
    } else {
      const environment = parseEnvironment(resultObject)
      environments.push(environment);
    }
    return environments;
  }
}
