import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./Movie";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 2, scale: 1 })
    rating: number;

    @Column()
    content: string;

    @ManyToOne(() => Movie, movie => movie.reviews)
    @JoinColumn({ name: 'movieId' })
    movie: Movie;
}