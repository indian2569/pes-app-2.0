/** Response of POST /api/auth/login (JwtResponse in pes.yaml), stored as the logged-in user. */
export interface AuthUserDTO {
    token: string;
    id: number;
    username: string;
    email: string;
    roles: string[];
}
