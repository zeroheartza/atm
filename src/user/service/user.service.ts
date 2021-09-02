import { getConnection, getManager } from "typeorm"
import { tbAccount } from "../entities/tbAccount.entity"
import { tbLog } from "../entities/tbLog.entity"


export class UserService {
    constructor() { }

    async userCreateId(id: string) {
        const result = await getConnection().getRepository(tbAccount).find({ where: { accountID: id } })
        if(result.length==0){
            let account = new tbAccount()
            let log = new tbLog()
            account.accountID = id
            account.amount = "0"
            await getConnection().getRepository(tbAccount).save(account)
            return { message: "สร้างบัญชีสำเร็จ" }
        }
        else{
            return { message: "มีบัญชีนี้อยู่แล้ว" }
        }
    }

    async userDepositId(id: string, amount: string) {
        var time = new Date();
        const result = await getConnection().getRepository(tbAccount).find({ where: { accountID: id } })
        if (result.length == 0) {
            return { message: "ไม่พบบัญชีนี้" }
        }
        else {
            let account = new tbAccount()
            let log = new tbLog()
            account.Id = result[0].Id
            account.accountID = id
            account.amount = (parseInt(result[0].amount) + parseInt(amount)).toString()
            await getConnection().getRepository(tbAccount).save(account)
            log.accountID = id
            log.amount = amount.toString()
            log.category = "Deposit"
            log.status = "ฝากเงินจำนวน " + `${amount}` + " บาท สำเร็จ เงินคงเหลือ " + `${account.amount}` + " บาท"
            const datetime = time.toString()
            log.time = datetime
            await getConnection().getRepository(tbLog).save(log)
            return { message: "ฝากเงินจำนวน " + `${amount}` + " บาท สำเร็จ เงินคงเหลือ " + `${account.amount}` + " บาท" }
        }
    }

    async userTransferId(assignee: string, assignor: string, amount: string) {
        var time = new Date();
        const resultAssignor = await getConnection().getRepository(tbAccount).find({ where: { accountID: assignor } })
        const resultAssignee = await getConnection().getRepository(tbAccount).find({ where: { accountID: assignee } })
        if(resultAssignor.length==0){
            return { message: "ไม่พบ บัญชีผู้โอน" }
        }
        if(resultAssignee.length==0){
            return { message: "ไม่พบ บัญชีผู้รับโอน" }
        }
        let accountAssignor = new tbAccount()
        let accountAssignee = new tbAccount()
        let log = new tbLog()
        if (parseInt(amount) > 0) {
            if (parseInt(resultAssignor[0].amount) - parseInt(amount) >= 0) {
                accountAssignor.Id = resultAssignor[0].Id
                accountAssignor.accountID = assignor
                accountAssignor.amount = (parseInt(resultAssignor[0].amount) - parseInt(amount)).toString()
                await getConnection().getRepository(tbAccount).save(accountAssignor)
                accountAssignee.Id = resultAssignee[0].Id
                accountAssignee.accountID = assignee
                accountAssignee.amount = (parseInt(resultAssignee[0].amount) + parseInt(amount)).toString()
                await getConnection().getRepository(tbAccount).save(accountAssignee)
                log.accountID = assignor
                log.amount = amount.toString()
                log.category = "Transfer"
                log.status = "โอนเงินจำนวน " + `${amount}` + " บาท ไปยังบัญชี "+`${assignee}`+" สำเร็จ  เงินคงเหลือ " + `${accountAssignor.amount}` + " บาท"
                const datetime = time.toString()
                log.time = datetime
                await getConnection().getRepository(tbLog).save(log)
                return { message: "โอนเงินจำนวน " + `${amount}` + " บาท ไปยังบัญชี "+`${assignee}`+" สำเร็จ  เงินคงเหลือ " + `${accountAssignor.amount}` + " บาท" }
            }
            else {
    
                return { message: "โอนเเงินไม่สำเร็จ ยอดเงินในบัญชีไม่เพียงพอ" }
            }
        }
        else {
        
            return { message: "ถอนเงินไม่สำเร็จ กรุณากรอกจำนวนเงินที่ถูกต้อง" }
        }
    }



    async userWithdrawId(id: string, amount: string) {
        var time = new Date();
        const result = await getConnection().getRepository(tbAccount).find({ where: { accountID: id } })

        if (result.length == 0) {
            return { message: "ไม่พบบัญชีนี้" }
        }
        else {
            let account = new tbAccount()
            let log = new tbLog()
            if (parseInt(amount) > 0) {
                if (parseInt(result[0].amount) - parseInt(amount) >= 0) {
                    if (parseInt(amount) % 100 == 0) {
                        account.Id = result[0].Id
                        account.accountID = id
                        account.amount = (parseInt(result[0].amount) - parseInt(amount)).toString()
                        await getConnection().getRepository(tbAccount).save(account)
                       
                        let str = ""
                        if (parseInt(amount) >= 1000) {
                            str = "ธนบัตร 1,000 " + (~~(parseInt(amount) / 1000)).toString() + " ใบ "
                            if ((parseInt(amount) % 1000) >= 500) {
                                str = str + "ธนบัตร 500 " + (~~((parseInt(amount) % 1000) / 500)).toString() + " ใบ "
                                if ((parseInt(amount) % 500) >= 100) {
                                    str = str + "ธนบัตร 100 " + (~~((parseInt(amount) % 500) / 100)).toString() + " ใบ "
                                }
                            }
                            else {
                                if (parseInt(amount) >= 100 && (parseInt(amount) % 1000) != 0) {
                                    str = str + "ธนบัตร 100 " + (~~((parseInt(amount) % 1000) / 100)).toString() + " ใบ "
                                }
                            }
                        }
                        else {
                            if (parseInt(amount) >= 500) {
                                str = "ธนบัตร 500 " + (~~(parseInt(amount) / 500)).toString() + " ใบ "
                                if ((parseInt(amount) % 500) >= 100) {
                                    str = str + "ธนบัตร 100 " + (~~((parseInt(amount) % 500) / 100)).toString() + " ใบ "
                                }
                            }
                            else {
                                if (parseInt(amount) >= 100) {
                                    str = "ธนบัตร 100 " + (parseInt(amount) / 100).toString() + " ใบ "
                                }
                            }
                        }

                        log.accountID = id
                        log.amount = amount.toString()
                        log.category = "Withdraw"
                        log.status = "ถอนเงินจำนวน " + `${amount}` + " บาท สำเร็จ ได้รับ " + `${str}` + " เงินคงเหลือ " + `${account.amount}` + " บาท"
                        const datetime = time.toString()
                        log.time = datetime
                        await getConnection().getRepository(tbLog).save(log)
                        return { message: "ถอนเงินจำนวน " + `${amount}` + " บาท สำเร็จ ได้รับ " + `${str}` + " เงินคงเหลือ " + `${account.amount}` + " บาท" }
                    }
                    else {
                       
                        return { message: "ถอนเงินไม่สำเร็จ ในระบบมี ธนบัตร 1000 500 100" }
                    }
                }
                else {
                  
                    return { message: "ถอนเงินไม่สำเร็จ ยอดเงินในบัญชีไม่เพียงพอ" }
                }
            }
            else {

                return { message: "ถอนเงินไม่สำเร็จ กรุณากรอกจำนวนเงินที่ถูกต้อง" }
            }
        }
    }


    
    async userGetLogId(id: string) {
        const result = await getConnection().getRepository(tbLog).find({ where: { accountID: id } })
        if(result.length==0){
            return { message: "ไม่พบบัญชีนี้" }
        }
        else{
            return { message: result }
        }
    }


}