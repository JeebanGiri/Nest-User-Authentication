import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Get,
  Delete,
  Param,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger/dist';
import { User } from './entities/users.entity';
import { CustomAuthGuard } from 'src/auth/auth.gard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { RequestPasswordResetDto } from './dto/request-passwordreset.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup') 
  @ApiOperation({summary: 'Users created account..'})
  @ApiCreatedResponse({
    description: 'create a user sign up object..',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'You cannot signup Try Again',
  })
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all users data.' })
  @ApiOkResponse({ type: User, isArray: true })
  @ApiOkResponse({description: 'Getting all data sucessfully!'})
  @ApiBadRequestResponse({description: 'Internal Server Errors..'})
  findAll() {
    return this.userService.findAll();
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Get an Id of user.' })
  @ApiResponse({ status: 200, description: 'User sucessfully deleted.' })
  @ApiResponse({ status: 404, description: 'User Not Found' })
  deleteData(@Param('id') id: string) {
    return this.userService.deletedData(+id);
  }

  @Get('/verifyotp/:code')
  @ApiOperation({ summary: 'get a otp Code..' })
  @ApiResponse({ status: 200, description: 'otp verification sucessfully' })
  @ApiResponse({ status: 404, description: 'User is not verified...' })
  verify(@Param('code') code: string) {
    return this.userService.verifyOtp(+code);
  }
  @UseGuards(CustomAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiOperation({ summary: 'Enter the details to enter your profile..' })
  @ApiOkResponse({  description: 'User profile is unlock' })
  @ApiBadRequestResponse({  description: 'User not found.' })
  @ApiUnauthorizedResponse({ description: 'Unathorize and invalid token' })
  userProfile(@Request() req) {
    const user = req.user;
    console.log(user);
    return user;
  }

  @UseGuards(CustomAuthGuard)
  @ApiBearerAuth('Auth')
  @Post('/changepassword')
  @ApiOperation({ summary: 'Change your password.' })
  @ApiOkResponse({ description: 'Password Change Sucessfully' })
  @ApiBadRequestResponse({ description: 'Invalid credentials match' })
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req) {
    return this.userService.changePassword(changePasswordDto, req.user);
  }

  @ApiOperation({ summary: 'Request for password reset..' })
  @ApiCreatedResponse({ description: 'Password reset sucessfully!' })
  @ApiNotFoundResponse({ description: 'Invalid email' })
  @Post('/passwordreset')
  RequestForPasswordReset(
    @Body() requestPasswordResetDto: RequestPasswordResetDto,
  ) {
    return this.userService.RequestForPasswordReset(requestPasswordResetDto);
  }

  @Patch('/resetPassword')
  @ApiOperation({ summary: 'Reset Your Password..' })
  @ApiOkResponse({ description: 'Password Reset Sucessfully..' })
  @ApiBadRequestResponse({ description: 'Password donot Match...' })
  resetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.userService.resetPassword(forgetPasswordDto);
  }
}
