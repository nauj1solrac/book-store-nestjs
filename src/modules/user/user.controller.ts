import { Delete, ParseIntPipe, Patch, UseGuards } from '@nestjs/common';
import { Body, Get, Param, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport'
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { RoleType } from '../role/roletype.enum';
import { ReadUserDto } from './dto';

@Controller('user')
export class UserController {
    constructor(private readonly _userService: UserService){}
    
    @Get(':userId')
    // @Roles(RoleType.ADMINISTRATOR)
    // @UseGuards(AuthGuard(), RoleGuard)
    getUser(@Param('userId', ParseIntPipe) userId: number): Promise<ReadUserDto>{
        return this._userService.get(userId)
    }

    // @UseGuards(AuthGuard())
    @Get()
    getUsers(): Promise<ReadUserDto[]>{
        return this._userService.getAll()
    }

    @Patch(':userId')
    updateUser(@Param('userId', ParseIntPipe) userId: number, @Body() user: User){
        return this._userService.update(userId, user)
    }

    @Delete(':userId')
    async deleteUser(@Param('userId', ParseIntPipe) userId: number): Promise<void>{
        return this._userService.delete(userId)
    }

    @Post('setRole/:userId/:roleId')
    setRoleToUser(
        @Param('userId', ParseIntPipe) userId: number, 
        @Param('roleId', ParseIntPipe) roleId: number
    ): Promise<boolean>{
        return this._userService.setRoleToUser(userId, roleId)
    }
}