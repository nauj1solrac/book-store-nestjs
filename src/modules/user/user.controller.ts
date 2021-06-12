import { Delete, ParseIntPipe, Patch } from '@nestjs/common';
import { Body, Get, Param, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly _userService: UserService){}
    
    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<User>{
        const user = await this._userService.get(id)
        return user
    }

    @Get()
    async getUsers(): Promise<User[]>{
        const users = await this._userService.getAll()
        return users
    }

    @Post()
    async createUser(@Body() user: User): Promise<User>{
        const createdUser = await this._userService.create(user)
        return createdUser
    }

    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User){
        const updatedUser = await this._userService.update(id, user)
        return true
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number){
        await this._userService.delete(id)
        return true
    }
}
