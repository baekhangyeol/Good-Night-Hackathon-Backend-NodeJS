import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, getRepository } from "typeorm";
import { Review } from "./Review";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({
        type: 'enum',
        enum: ['Thriller', 'Romance', 'Comic', 'Action']
    })
    genre: string;

    @Column()
    releaseDate: Date;

    @Column()
    endDate: Date;

    @Column()
    isShowing: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Review, review => review.movie)
    reviews: Review[];

    constructor(title: string, genre: string, releaseDate: Date, endDate: Date, isShowing: boolean) {
        this.title = title;
        this.genre = genre;
        this.releaseDate = releaseDate;
        this.endDate = endDate;
        this.isShowing = isShowing;
    }
}