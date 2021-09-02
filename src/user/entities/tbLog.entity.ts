import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class tbLog {
    @PrimaryGeneratedColumn()
    logId : number

    @Column()
    accountID: string

    @Column()
    category: string

    @Column()
    amount: string

    @Column()
    status: string

    @Column()
    time: string


    
}