import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserSeeder } from './seeders/user.seeder';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          // ⬇ Aquí es donde más adelante se agregan los discriminadores
          // Por ahora, dejamos solo el esquema base
          // schema.discriminator('student', StudentSchema); (se hará en StudentsModule)

          return schema;
        },
      },
    ]),

  ],
  providers: [UserService, UserSeeder],
  exports: [UserService],
})
export class UserModule {}
