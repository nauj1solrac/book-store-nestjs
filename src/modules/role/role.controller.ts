import { Delete, ParseIntPipe, Patch } from '@nestjs/common';
import { Body, Get, Param, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ReadRoleDto, UpdateRoleDto } from './dtos';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dtos/create-role.dto';

@Controller('role')
export class RoleController {
    constructor(private readonly _roleService: RoleService){}
    
    @Get(':roleId')
    getRole(@Param('roleId', ParseIntPipe) roleId: number): Promise<ReadRoleDto>{
        return this._roleService.get(roleId)
    }

    @Get()
    getRoles(): Promise<ReadRoleDto[]>{
        return this._roleService.getAll()
    }

    @Post()
    createRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto>{
        return this._roleService.create(role)
    }

    @Patch(':roleId')
    updateRole(@Param('roleId', ParseIntPipe) roleId: number, @Body() role: Partial<UpdateRoleDto>){
        return this._roleService.update(roleId, role)
    }

    @Delete(':roleId')
    deleteRole(@Param('roleId', ParseIntPipe) roleId: number){
        return this._roleService.delete(roleId)
    }
}
