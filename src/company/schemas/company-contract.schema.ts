import { BaseSchema } from "@common/types/base.schema";
import { SoftDeletableDocument } from "@common/types/soft-deletable-document";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CompanyContractStatus } from "company/enums/company-contract-status.enum";
import { CompanyContractType } from "company/enums/company-contract-type.enum";
import { softDeletePlugin } from "@common/plugins/soft-delete.plugin";
import * as mongoosePaginate from "mongoose-paginate-v2";
import { Company } from "./company.schema";
import mongoose from "mongoose";

@Schema({ timestamps: true })
export class CompanyContract extends BaseSchema {
    @Prop({ required: true, type: mongoose.Types.ObjectId, ref: Company.name })
    company: mongoose.Types.ObjectId;

    @Prop({ required: true, unique: true })
    fileUrl: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ required: true, enum: CompanyContractStatus })
    status: CompanyContractStatus

    @Prop({ required: true, enum: CompanyContractType })
    type: CompanyContractType

    @Prop({ required: false })
    observations?: string;
}

export type CompanyContractDocument = SoftDeletableDocument<CompanyContract>;

export const CompanyContractSchema = SchemaFactory.createForClass(CompanyContract);

CompanyContractSchema.plugin(mongoosePaginate);
CompanyContractSchema.plugin(softDeletePlugin);

