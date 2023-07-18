import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users: any[] =[
        {
            userId: 1,
            userName: "Ramesh",
            userPassword: "hashpassword",
        },
        {
            userId: 2, 
            userName: "Rajan",
            userPassword: "hashpassword2",
        },
           
    ];

    async findOne(userName: string): Promise<User |undefined>{
        return this.users.find( user => user.userName === userName);
    }
  
}


