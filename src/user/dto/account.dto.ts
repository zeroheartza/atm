import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AccountDto {
 

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly id: string

    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly amount: string


}