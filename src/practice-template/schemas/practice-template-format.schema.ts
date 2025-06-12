import { BaseSchema } from "@common/types/base.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";
import { PracticeTemplate } from "./practice-template.schema";

@Schema({ timestamps: true })
export class PracticeTemplateFormat extends BaseSchema {
    @Prop({
        type: Types.ObjectId,
        ref: 'PracticeTemplate',
        required: false,
        set: (v: any) =>
            typeof v === 'string' ? new Types.ObjectId(v) : v,
    })
    template: Types.ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    fileUrl: string;
}

export type PracticeTemplateFormatDocument = PracticeTemplateFormat & Document;
export const PracticeTemplateFormatSchema = SchemaFactory.createForClass(PracticeTemplateFormat);

PracticeTemplateFormatSchema.index({ template: 1 });
PracticeTemplateFormatSchema.plugin(mongoosePaginate);