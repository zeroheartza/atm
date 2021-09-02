import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ViewlogDto {
 

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly id: string



}