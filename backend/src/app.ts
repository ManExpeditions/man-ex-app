import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { LoggerStream } from './lib/logger';
import routes from './routes';
import path from 'path';
import config from './env';

class App {
  // reference to Express instance
  public express: express.Application;

  // Configure Express
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.environment();
  }

  private middleware(): void {
    this.express.use(express.json());
    // Add logging middleware
    this.express.use(morgan('combined', { stream: new LoggerStream() }));
    this.express.use(cors());
    this.express.use(helmet());
  }

  private routes(): void {
    this.express.use('/api', routes);
    this.express.get('/api/v1', (_req: Request, res: Response) => {
      res.json('Hello, welcome to Manex');
    });
  }

  private environment(): void {
    if (config.node_env === 'production') {
      this.express.use(
        express.static(path.join(__dirname, '../../', '/user-frontend/build'))
      );
      this.express.get('*', (_req: Request, res: Response) => {
        res.sendFile(
          path.join(__dirname, '../../', '/NerdHub-Frontend/build/index.html')
        );
      });
    }
  }
}

export default new App().express;
