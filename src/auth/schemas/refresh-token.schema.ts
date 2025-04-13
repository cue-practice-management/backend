import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({
    versionKey: false,
    timestamps: true
})
export class RefreshToken {
    @Prop({ required: true })
    token: string;

    @Prop({
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    })
    user: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    expiresAt: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);