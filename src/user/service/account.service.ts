

import { TransferDto } from "../dto/transfer.dto";
import { AccountDto } from "../dto/account.dto";
import { CraeteDto } from "../dto/create.dto";
import { ViewlogDto } from "../dto/viewLog.dto";
import { UserService } from "./user.service";

export class AccountService extends UserService {
    constructor() {
        super()
    }

    async userCreate( craeteDto: CraeteDto) {
        const user = await this.userCreateId(craeteDto.id);
        return user
    }

    async userDeposit(accountDto:AccountDto) {
        const user = await this.userDepositId(accountDto.id,accountDto.amount);
        return user
    }
    
    async userWithdraw(accountDto:AccountDto) {
        const user = await this.userWithdrawId(accountDto.id,accountDto.amount);
        return user
    }

    async userTransfer(transferDto: TransferDto) {
        const user = await this.userTransferId(transferDto.assignee,transferDto.assignor,transferDto.amount);
        return user
    }

    async userGetLog(viewlogDto: ViewlogDto) {
        const user = await this.userGetLogId(viewlogDto.id);
        return user
    }

}