export default class CxCodeBashing {
  path: string;

  static parseCodeBashing(resultObject: any[]): CxCodeBashing[] {
    let codeBashingLink: CxCodeBashing[] = [];
    codeBashingLink = resultObject.map((member: any) => {
      const codeBashing = new CxCodeBashing();
      codeBashing.path = member.path;
      return codeBashing;
    });
    return codeBashingLink;
  }
}
