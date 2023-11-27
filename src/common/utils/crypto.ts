import * as bcrypt from 'bcrypt';

export const encrypt = async (password: string) => {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(password, saltOrRounds);
  return hash;
};

export const compare = async (password: string, hash: string) => {
  const match = await bcrypt.compare(password, hash);
  return match;
};
