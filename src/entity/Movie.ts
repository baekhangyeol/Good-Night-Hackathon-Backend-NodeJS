import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, getRepository } from "typeorm";

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

    constructor(title: string, genre: string, releaseDate: Date, endDate: Date, isShowing: boolean) {
        this.title = title;
        this.genre = genre;
        this.releaseDate = releaseDate;
        this.endDate = endDate;
        this.isShowing = isShowing;
    }
}