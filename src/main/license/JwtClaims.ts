/**
 * Represents license-related information extracted from the JWT token
 */
export class JwtClaims {
    tenantName: string;
    dastEnabled: boolean;
    allowedEngines: string[];

    constructor(tenantName: string, dastEnabled: boolean, allowedEngines: string[]) {
        this.tenantName = tenantName;
        this.dastEnabled = dastEnabled;
        this.allowedEngines = allowedEngines;
    }

    /**
     * Creates a JwtClaims instance from a JSON object
     */
    static fromJson(json: any): JwtClaims {
        return new JwtClaims(
            json.tenantName || '',
            json.dastEnabled || false,
            json.allowedEngines || []
        );
    }
}
