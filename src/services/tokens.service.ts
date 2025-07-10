import jwt from "jsonwebtoken";

export function generateTokens(
    id: string,
    jti: string,
    secretKey: string
): { accessToken: string; refreshToken: string } {
    const accessToken = generateToken(id, jti, secretKey, "15m");

    const refreshToken = generateToken(id, jti, secretKey, "7d");

    return {
        accessToken,
        refreshToken,
    };
}

export function verifyToken(
    token: string,
    secretKey: string
): { id: string; jti: string } | null {
    const decoded = jwt.verify(token, secretKey) as {
        id: string;
        jti: string;
    };
    return decoded;
}

export function generateToken(
    id: string,
    jti: string,
    secretKey: string,
    expiresIn: string
): string {
    return jwt.sign({ id, jti }, secretKey, { expiresIn: expiresIn as any });
}
