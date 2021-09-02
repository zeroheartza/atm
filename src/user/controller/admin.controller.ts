import { BadRequestException, Body, Controller, Delete, Get, Param, Post, ValidationPipe, Put, Res, HttpStatus, Injectable, Req } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ValidationError } from "class-validator";
import { TransferDto } from "../dto/transfer.dto";
import { AccountDto } from "../dto/account.dto";
import { CraeteDto } from "../dto/create.dto";
import { ViewlogDto } from "../dto/viewLog.dto";
import { AccountService } from "../service/account.service";


@Injectable()
@ApiTags('user')
@Controller('user')
export class adminController {

   constructor(
      private readonly accountService: AccountService,

   ) { }

   
   @Post('create')
   @ApiOkResponse()
   async create(@Body(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
   })) craeteDto: CraeteDto
   ) {
      const user = await this.accountService.userCreate(craeteDto);
      return user
   }


   @Post('deposit')
   @ApiOkResponse()
   async deposit(@Body(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
   })) accountDto: AccountDto
   ) {
      const user = await this.accountService.userDeposit(accountDto);
      return user
   }

   @Post('withdraw')
   @ApiOkResponse()
   async withdraw(@Body(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
   })) accountDto: AccountDto
   ) {
      const user = await this.accountService.userWithdraw(accountDto);
      return user
   }


   @Post('transfer')
   @ApiOkResponse()
   async transfer(@Body(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
   })) transferDto: TransferDto
   ) {
      const user = await this.accountService.userTransfer(transferDto);
      return user
   }


   @Post('getLog')
   @ApiOkResponse()
   async getLog(@Body(new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => new BadRequestException(errors),
   })) viewlogDto: ViewlogDto
   ) {
      const user = await this.accountService.userGetLog(viewlogDto);
      return user
   }


}