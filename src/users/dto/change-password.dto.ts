import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ChangePasswordDto{
    @ApiProperty({
        description: 'Enter Your old password.',
        example: 'old password'
    })
    @IsNotEmpty()
    @IsString()
    oldPassword: string;

    @ApiProperty({
        description: 'Setup new Password',
        example: 'new password'
    })
    @IsNotEmpty()
    @IsString()
    newPassword: string;

    @ApiProperty({
        description: 'Confirm new Password',
        example: 'confirm password'
    })
    @IsNotEmpty()
    @IsString()
    confirmPassword: string;

}