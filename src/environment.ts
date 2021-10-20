import { config } from 'dotenv';
config();

export type Environment = {
  PORT?: number;
};

export const environment = Object.assign({}, process.env) as Environment;
