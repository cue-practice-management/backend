import { AcademicProgram } from "@academic-program/schemas/academic-program.schema";
import { softDeletePlugin } from "@common/plugins/soft-delete.plugin";
import { SoftDeletableDocument } from "@common/types/soft-deletable-document";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "@user/schemas/user.schema";
import { Company } from "company/schemas/company.schema";
import * as mongoose from "mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";

@Schema({ timestamps: true })
export class Student extends User {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: AcademicProgram.name,
        required: true,
        set: (v: any) => (typeof v === 'string' ? new mongoose.Types.ObjectId(v) : v),
    })
    academicProgram: mongoose.Types.ObjectId;

    @Prop({ required: true })
    currentSemester: number;

    @Prop({ type: mongoose.Types.ObjectId, ref: Company.name })
    currentCompany?: mongoose.Types.ObjectId;

    @Prop()
    curriculumUrl?: string;

    @Prop()
    epsCertificationUrl?: string;
}

export type StudentDocument = SoftDeletableDocument<Student>;
export const StudentSchema = SchemaFactory.createForClass(Student);

StudentSchema.plugin(mongoosePaginate);
StudentSchema.plugin(softDeletePlugin);