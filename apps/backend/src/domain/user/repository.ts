import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from 'helpers/passwordHandler';
import {
  ICreateUser,
  IUpdateUser,
  IUser,
  IUserQueries,
  IUserRepository,
} from './interfaces';

export class UserRepository implements IUserRepository {
  constructor(private readonly userQueries: IUserQueries) {}

  public find(id: string): IUser | undefined {
    return this.userQueries.find(id);
  }

  public getByUsername(username: string): IUser | undefined {
    return this.userQueries.getByUsername(username);
  }

  public list(): IUser[] {
    return this.userQueries.list();
  }

  public async create(data: ICreateUser): Promise<IUser> {
    const id = uuidv4();
    const date = new Date().toISOString();
    const modifiedPassword = await hashPassword(data.password);
    return this.userQueries.create({
      id,
      username: data.username,
      password: modifiedPassword,
      email: data.email,
      createdAt: date,
      updatedAt: date,
    });
  }

  public hasUsername(username: string): boolean {
    return !!this.userQueries.getByUsername(username);
  }

  public hasEmail(email: string): boolean {
    return this.userQueries.hasEmail(email);
  }

  public async update(id: string, data: IUpdateUser): Promise<IUser> {
    let modifiedPassword: string | undefined;
    if (data.password) {
      modifiedPassword = await hashPassword(data.password!);
    }
    const date = new Date().toISOString();

    return this.userQueries.update(id, {
      username: data.username,
      email: data.email,
      password: modifiedPassword,
      updatedAt: date,
      id,
    });
  }

  public delete(id: string): boolean {
    return this.userQueries.delete(id);
  }
}
