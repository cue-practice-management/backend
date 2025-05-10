import { Document } from 'mongoose';

export type SoftDeletableDocument<T> = T & Document & {
  deleted?: boolean;
  softDelete(): Promise<void>;
};