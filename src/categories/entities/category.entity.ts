import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Category {
    // define columns here
    @PrimaryGeneratedColumn()
    id: number;

    // add other columns as needed
    @Column({type: 'varchar', length: 60})
    name: string;
}
