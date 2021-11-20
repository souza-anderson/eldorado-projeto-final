import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Genre } from "./Genre";

@Entity()
export class Movie {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public synopsis: string;

  @Column()
  public poster: string;

  @Column()
  public release_year: Date;

  @Column()
  public billing: number;

  @ManyToOne(() => Genre)
  @JoinColumn({
    name: "genre_id",
    referencedColumnName: "id"
  })
  public genre_id: number

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  @BeforeInsert()
  public createdAt() {
    this.created_at = new Date();
  }

  @BeforeUpdate()
  public updatedAt() {
    this.updated_at = new Date();
  }

}
