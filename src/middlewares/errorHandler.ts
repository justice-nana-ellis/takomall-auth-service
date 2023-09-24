import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const statusCodeMatch = err.message.match(/\((\d+)\)$/);
    const statusCode = statusCodeMatch ? parseInt(statusCodeMatch[1]) : 400;
  
    return res.status(statusCode).send(err);
}
