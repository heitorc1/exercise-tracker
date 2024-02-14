import { scrypt, scryptSync } from 'crypto';
import { APP_KEY } from '@/infra/config';

const salt = APP_KEY;
const keylen = 64;

export async function hashPassword(password: string) {
  return new Promise<string>((resolve, reject) => {
    scrypt(password, salt, keylen, (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('hex'));
    });
  });
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  return new Promise<boolean>((resolve, reject) => {
    scrypt(password, salt, keylen, (err, derivedKey) => {
      if (err) reject(err);
      const derivedPassword = derivedKey.toString('hex');
      resolve(derivedPassword === hashedPassword);
    });
  });
}

export function hashPasswordSync(password: string) {
  return scryptSync(password, salt, keylen);
}
