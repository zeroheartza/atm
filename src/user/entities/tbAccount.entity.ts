import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class tbAccount {
    @PrimaryGeneratedColumn()
    Id: number

    @Column()
    accountID: string

    @Column()
    amount: string

   
}