import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TransferDto {
 

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly assignor: string
    


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly assignee: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly amount: string

   

}