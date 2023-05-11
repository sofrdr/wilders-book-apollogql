import { IsEmail, IsStrongPassword } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @IsEmail()
   @Column({ unique: true })
   email: string;

   @Column()
   @IsStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
   })
   password: string;
}
