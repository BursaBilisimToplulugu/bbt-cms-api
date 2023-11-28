import * as crypto from 'crypto';

interface Crypt {
  iv: string;
  value: string;
}

export function encrypt(text: string): Crypt {
  const key = Buffer.from(process.env.EMAIL_CRYPT_KEY, 'hex');
  const iv = Buffer.from(process.env.EMAIL_CRYPT_IV, 'hex');
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), value: encrypted.toString('hex') };
}

export function decrypt(decryptObject: Crypt): string {
  const key = Buffer.from(process.env.EMAIL_CRYPT_KEY, 'hex');
  const iv = Buffer.from(process.env.EMAIL_CRYPT_IV, 'hex');
  const encryptedText = Buffer.from(decryptObject.value, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
