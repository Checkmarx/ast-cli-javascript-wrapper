export default class CxDastScan {
  scanId: string;
  initiator: string;
  scanType: string;
  created: string;
  riskRating: string;
  alertRiskLevel: object;
  startTime: string;
  scanDuration: number;
  lastStatus: string;
  statistics: string;
  scannedPathsCount: number;
  source: string;

  static parseDastScan(resultObject: any): CxDastScan[] {
    let scans: CxDastScan[] = [];

    const parseDastScanResult = (result: any): CxDastScan => {
      const scan = new CxDastScan();
      scan.scanId = result.ScanID;
      scan.initiator = result.Initiator;
      scan.scanType = result.ScanType;
      scan.created = result.Created;
      scan.riskRating = result.RiskRating;
      scan.alertRiskLevel = result.AlertRiskLevel;
      scan.startTime = result.StartTime;
      scan.scanDuration = result.ScanDuration;
      scan.lastStatus = result.LastStatus;
      scan.statistics = result.Statistics;
      scan.scannedPathsCount = result.ScannedPathsCount;
      scan.source = result.Source;
      return scan;
    }

    if (resultObject instanceof Array) {
      scans = resultObject.map((result: any) => parseDastScanResult(result));
    } else {
      const scan = parseDastScanResult(resultObject)
      scans.push(scan);
    }
    return scans;
  }
}

