import { createHash, randomBytes } from 'crypto';

export function createRefreshToken() {
  return randomBytes(48).toString('hex');
}

export function hashRefreshToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}
