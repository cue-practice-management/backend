import { softDeletePlugin } from "@common/plugins/soft-delete.plugin";
import { BaseSchema } from "@common/types/base.schema";
import { SoftDeletableDocument } from "@common/types/soft-deletable-document";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({ timestamps: true })
export class News extends BaseSchema {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    summary: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    coverImageUrl: string;

    @Prop({ type: [String], default: [] })
    tags: string[];
}

export type NewsDocument = SoftDeletableDocument<News>;
export const NewsSchema = SchemaFactory.createForClass(News);

NewsSchema.plugin(mongoosePaginate)
NewsSchema.plugin(softDeletePlugin);

