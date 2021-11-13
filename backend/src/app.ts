import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
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
    // Add logging middleware
    this.express.use(morgan('combined', { stream: new LoggerStream() }));
    this.express.use(cors());
    this.express.use(helmet());
  }

  private routes(): void {
    this.express.get('/api/auth/v1', (_req: Request, res: Response) => {
      res.json('Hello from Auth service');
    });
  }
}

export default new App().express;