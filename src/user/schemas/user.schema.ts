import { DocumentType } from '@common/enums/document-type.enum';
import { Gender } from '@common/enums/gender.enum';
import { UserRole } from '@common/enums/role.enum';
import { softDeletePlugin } from '@common/plugins/soft-delete.plugin';
import { BaseSchema } from '@common/types/base.schema';
import { SoftDeletableDocument } from '@common/types/soft-deletable-document';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema({
  timestamps: true,
  discriminatorKey: 'userType',
})
export class User extends BaseSchema {
  _id: Types.ObjectId;
  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: true, enum: Object.values(DocumentType), trim: true })
  typeOfDocument: DocumentType;

  @Prop({ required: true, unique: true, trim: true })
  documentNumber: string;

  @Prop({ unique: true, trim: true })
  phoneNumber?: string;

  @Prop()
  birthDate?: Date;

  @Prop({ required: true, enum: Object.values(Gender) })
  gender: Gender;

  @Prop()
  photoUrl?: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, enum: Object.values(UserRole) })
  role: UserRole;

}
export type UserDocument = SoftDeletableDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(softDeletePlugin);