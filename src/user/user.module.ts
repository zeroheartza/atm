import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { AccountService } from './service/account.service';
import { adminController } from './controller/admin.controller'
import { tbLog } from './entities/tbLog.entity';
import { tbAccount } from './entities/tbAccount.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { JwtModule } from "@nestjs/jwt";


@Module({
  imports: [
    TypeOrmModule.forFeature([
      tbLog,
      tbAccount
    ])
    , ScheduleModule.forRoot(),
    JwtModule.register({
      secret: 'secret',
    })
  ],
  controllers: [
    adminController,
 
  ],
  providers: [
    UserService,
    AccountService,

  ]
})
export class UserModule { }

