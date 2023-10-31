import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export function hashPasswordSync(password: string) {
  bcrypt.hashSync(password, SALT_ROUNDS);
}
