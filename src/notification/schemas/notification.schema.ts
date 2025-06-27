import { BaseSchema } from "@common/types/base.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "@user/schemas/user.schema";
import { Types } from "mongoose";

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


    @Prop({ required: true })
    type: string;

    @Prop({ type: Object })
    metadata?: Record<string, any>;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
export type NotificationDocument = Notification & Document;
