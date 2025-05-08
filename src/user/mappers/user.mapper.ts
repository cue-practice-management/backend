import { Injectable } from "@nestjs/common";
import { UserResponseDto } from "@user/dtos/user-response.dto";
import { User } from "@user/schemas/user.schema";

@Injectable({})
export class UserMapper {

    public toDto(user: User): UserResponseDto{
        return {
            _id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            photoUrl: user.photoUrl
        };
    }
}