import { Product } from "../../products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Category {
    // define columns here
    @PrimaryGeneratedColumn()
    id: number;

    // add other columns as needed
    @Column({type: 'varchar', length: 60})
    name: string;

    @OneToMany(() => Product, (product) => product.category, {cascade: true})
    products: Product[];
}
