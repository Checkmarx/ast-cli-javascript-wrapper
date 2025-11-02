export default class CxCodeBashing {
  lessonUrl: string;

  static parseCodeBashing(resultObject: any[]): CxCodeBashing[] {
    let codeBashingLink: CxCodeBashing[] = [];
    codeBashingLink = resultObject.map((member: any) => {
      const codeBashing = new CxCodeBashing();
      codeBashing.lessonUrl = member.lessonUrl;
      return codeBashing;
    });
    return codeBashingLink;
  }
}
