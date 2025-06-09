import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false })
export class PracticeTemplateFormat {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    fileUrl: string;
}

export type PracticeTemplateFormatDocument = PracticeTemplateFormat & Document;
export const PracticeTemplateFormatSchema = SchemaFactory.createForClass(PracticeTemplateFormat);