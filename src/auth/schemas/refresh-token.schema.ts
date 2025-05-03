import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "@users/schemas/user.schema";
import mongoose, { Document } from "mongoose";

@Schema({
    versionKey: false,
    timestamps: true
})
export class RefreshToken extends Document{
    @Prop({ required: true })
    token: string;

    @Prop({ required: true })
    deviceInfo: string;

    @Prop({ required: true })
    ip: string;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name
    })
    user: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    expiresAt: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);