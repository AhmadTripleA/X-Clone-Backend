import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;


export function signAccessToken(userId: string) {
  return jwt.sign({ sub: userId }, ACCESS_SECRET, { expiresIn: '15m' });
}
export function signRefreshToken(userId: string) {
  return jwt.sign({ sub: userId }, REFRESH_SECRET, { expiresIn: '7d' });
}


export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET);
}
export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET);
}
