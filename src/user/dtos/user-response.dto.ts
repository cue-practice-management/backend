import { UserRole } from '@common/enums/role.enum';

export interface UserResponseDto {
  _id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  photoUrl?: string;
}
