import { Prop, Schema } from "@nestjs/mongoose";
import { User } from "@user/schemas/user.schema";
import { Company } from "company/schemas/company.schema";
import mongoose from "mongoose";

@Schema({ timestamps: true })
export class CompanyMentor extends User {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: Company.name,
        required: true,
        set: (v: any) =>
            typeof v === 'string' ? new mongoose.Types.ObjectId(v) : v,
    })
    company: mongoose.Types.ObjectId;

    @Prop({ required: true })
    position: string;
}