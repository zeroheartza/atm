import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CraeteDto {
 

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly id: string



}