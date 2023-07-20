import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Body,
    Get,
    Delete,
    Param,
    Put,
  } from '@nestjs/common';
import { UsersService } from "./users.service";
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController{
    constructor(private userService: UsersService){}
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signUp(@Body() createUserDto: CreateUserDto) {
      return this.userService.signUp(createUserDto);
    }

    @Get()
    findAll() {
      return this.userService.findAll();
    }
  
    @Delete(':id')
    deleteData(@Param('id') id: string) {
      return this.userService.deleteData(+id);
    }
  
    // @Put(':id')
    // update(@Param('id') @Body() createUserDto: CreateUserDto) {
    //   return this.userService.update(createUserDto);
    // }
}