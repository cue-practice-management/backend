import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { EmailAlreadyExistsException } from './exceptions/email-already-exists.exception';
import { PhoneNumberAlreadyExistsException } from './exceptions/phone-number-already-exists.exception';
import { DocumentNumberAlreadyExistsException } from './exceptions/document-number-already-exists.exception';
import { UpdateUserRequestDto } from './dtos/update-user-request.dto';
import { CreateBaseUserDto } from './dtos/create-base-user.dto';
import { UserFilterDto } from './dtos/user-filter.dto';
import { UserNotFoundException } from '@auth/exceptions/user-not-found-exception';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    this.validateUniqueFields(createUserDto);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    return createdUser.save();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  async validateUniqueFields(
    createUserDto: CreateUserDto | CreateBaseUserDto | UpdateUserRequestDto,
  ): Promise<void> {
    const { email, documentNumber, phoneNumber } = createUserDto;

    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { documentNumber }, { phoneNumber }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new EmailAlreadyExistsException();
      }

      if (existingUser.documentNumber === documentNumber) {
        throw new DocumentNumberAlreadyExistsException();
      }

      if (existingUser.phoneNumber === phoneNumber) {
        throw new PhoneNumberAlreadyExistsException();
      }
    }
  }

  async validateUniqueFieldsForUpdate(
    userId: string,
    updateUserDto: UpdateUserRequestDto,
  ): Promise<void> {
    const { email, documentNumber, phoneNumber } = updateUserDto;

    const existingUser = await this.userModel.findOne({
      _id: { $ne: userId },
      $or: [{ email }, { documentNumber }, { phoneNumber }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new EmailAlreadyExistsException();
      }

      if (existingUser.documentNumber === documentNumber) {
        throw new DocumentNumberAlreadyExistsException();
      }

      if (existingUser.phoneNumber === phoneNumber) {
        throw new PhoneNumberAlreadyExistsException();
      }
    }
  }


  async updatePassword(userId: string, newPassword: string): Promise<User> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    return user.save();
  }

  buildFilter(filter: UserFilterDto): Record<string, any> {
    const { fullName, email, documentNumber, gender } = filter;
    const filterObject: Record<string, any> = {};

    if (fullName) {
      filterObject.$or = [
        { firstName: { $regex: fullName, $options: 'i' } },
        { lastName: { $regex: fullName, $options: 'i' } },
      ];
    }

    if (email) {
      filterObject.email = { $regex: email, $options: 'i' };
    }
    if (documentNumber) {
      filterObject.documentNumber = { $regex: documentNumber, $options: 'i' };
    }

    if (gender) {
      filterObject.gender = gender;
    }

    return filterObject;
  }
}
