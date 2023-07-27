import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class RequestPasswordResetDto{
    @ApiProperty({
        description: 'Enter your email to reset your password',
        example: 'xyz@gmail.com'
    })
    @IsEmail()
    email: string;
}