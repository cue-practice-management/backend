import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification, NotificationDocument } from 'notification/schemas/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  async createNotification(
    userId: string,
    data: {
      title: string;
      message: string;
      metadata?: Record<string, any>;
    },
  ): Promise<Notification> {
    return this.notificationModel.create({
      recipient: new Types.ObjectId(userId),
      title: data.title,
      message: data.message,
      metadata: data.metadata,
    });
  }

  async markAsRead(ids: string[], userId: string): Promise<number> {
    const result = await this.notificationModel.updateMany(
      {
        _id: { $in: ids.map(id => new Types.ObjectId(id)) },
        recipient: new Types.ObjectId(userId),
        read: false,
      },
      { $set: { read: true } },
    );
    return result.modifiedCount;
  }
}
