import { BaseSchema } from "@common/types/base.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "@user/schemas/user.schema";
import { Types } from "mongoose";
import { NotificationType } from "notification/enums/notification-type.enum";
import { NotificationMetadata } from "notification/types/notification-metadata.types";

@Schema({ timestamps: true })
export class Notification extends BaseSchema {
    @Prop({ required: true, type: Types.ObjectId, ref: User.name })
    recipient: Types.ObjectId;

    @Prop({ required: true, type: String })
    title: string;


    @Prop({ required: true, type: String })
    message: string;

    @Prop({ required: true, type: Boolean, default: false })
    read: boolean;

    @Prop({ required: true, enum: NotificationType })
    type: NotificationType;

    @Prop({ type: Object })
    metadata?: NotificationMetadata;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
