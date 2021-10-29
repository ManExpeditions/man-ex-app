import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { LoggerStream } from './lib/logger';

class App {
  // reference to Express instance
  public express: express.Application;

  // Configure Express
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(express.json());
    this.express.use(morgan('combined', { stream: new LoggerStream() }));
  }

  private routes(): void {
    this.express.get('/', (_req: Request, res: Response) => {
      res.json('Hello from Auth service');
    });
  }
}

export default new App().express;
