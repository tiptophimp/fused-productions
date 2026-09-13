import { SignJWT, jwtVerify } from 'jose';

export type AccessClaims = {
  sub: string;
  email: string;
  role: 'admin' | 'client' | 'vendor';
  name: string;
};

function secretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters');
  }
  return new TextEncoder().encode(secret);
}

export async function signAccessToken(claims: AccessClaims) {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(claims.sub)
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey());
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, secretKey());
  return {
    sub: String(payload.sub),
    email: String(payload.email),
    role: payload.role as AccessClaims['role'],
    name: String(payload.name),
  } satisfies AccessClaims;
}

export const ACCESS_COOKIE = 'fp_access';
export const REFRESH_COOKIE = 'fp_refresh';
