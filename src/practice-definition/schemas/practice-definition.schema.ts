import { AcademicProgram } from "@academic-program/schemas/academic-program.schema";
import { BaseSchema } from "@common/types/base.schema";
import { SoftDeletableDocument } from "@common/types/soft-deletable-document";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { PracticeTemplate } from "practice-template/schemas/practice-template.schema";
import * as mongoosePaginate from "mongoose-paginate-v2";

@Schema({ timestamps: true })
export class PracticeDefinition extends BaseSchema {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    semester: number;

    @Prop({
        type: Types.ObjectId,
        ref: AcademicProgram.name,
        required: false,
        set: (v: any) =>
            typeof v === 'string' ? new Types.ObjectId(v) : v,
    })
    academicProgram: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: PracticeTemplate.name,
        required: false,
        set: (v: any) =>
            typeof v === 'string' ? new Types.ObjectId(v) : v,
    })
    practiceTemplate: Types.ObjectId;

}

export type PracticeDefinitionDocument = SoftDeletableDocument<PracticeDefinition>;
export const PracticeDefinitionSchema = SchemaFactory.createForClass(PracticeDefinition);
PracticeDefinitionSchema.index({ academicProgram: 1, semester: 1 });
PracticeDefinitionSchema.index({ practiceTemplate: 1 });

PracticeDefinitionSchema.plugin(mongoosePaginate);

