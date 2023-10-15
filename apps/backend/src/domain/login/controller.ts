import { NextFunction, Request, Response } from 'express';
import { ILoginController, ILoginService } from './interfaces';
import { loginSchema } from './schemas';

export class LoginController implements ILoginController {
  constructor(private readonly service: ILoginService) {}

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const data = loginSchema.parse(req.body);

      const response = await this.service.login(data);

      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}
