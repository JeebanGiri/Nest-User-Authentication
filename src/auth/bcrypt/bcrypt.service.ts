import { Injectable } from '@nestjs/common/decorators';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  constructor() {}
  async bcryptPassword(password: string): Promise<string> {
    const securityRound = 10;
    const hashPassword = await bcrypt.hash(password, securityRound);
    return hashPassword;
  }

  async comparePassword( password: string, hashPassword: string): Promise<boolean> {
    const isMatched = await bcrypt.compare(password, hashPassword);
    return isMatched;
  }
}
