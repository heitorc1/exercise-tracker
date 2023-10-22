import {
  ICreateExercise,
  IUser,
  IUserRepository,
  ICreateUser,
  IUpdateUser,
  IUserQueries,
} from './interfaces';
import { hashPassword } from 'helpers/passwordHandler';
import { v4 as uuidv4 } from 'uuid';

export class UserRepository implements IUserRepository {
  constructor(private readonly userQueries: IUserQueries) {}

  public find(id: string): IUser | undefined {
    return this.userQueries.find(id);
  }

  public list() {
    const users = this.userQueries.list();

    if (!users?.length) {
      return null;
    }

    return users as IUser[];
  }

  public async create(data: ICreateUser) {
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

  public hasUsername(username: string) {
    return !!this.userQueries.getByUsername(username);
  }

  public hasEmail(email: string) {
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

  public createExercise(id: string, body: ICreateExercise) {
    const uuid = uuidv4();
    const date = new Date().toISOString();
    const formattedDate = new Date(body.date).toISOString();

    return this.userQueries.createExercise(id, {
      id: uuid,
      description: body.description,
      userId: id,
      duration: body.duration,
      date: formattedDate,
      createdAt: date,
      updatedAt: date,
    });
  }
}
