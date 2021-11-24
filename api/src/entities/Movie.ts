import slugify from "slugify";
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Genre } from "./Genre";
import slugConfig from "../config/slugify";
import hostConfig from "../config/host";

@Entity()
export class Movie {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public slug: string;

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
  public genre: Genre;

  public poster_full_path: string;

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

  @BeforeInsert()
  @BeforeUpdate()
  public addSlug() {
    this.slug = slugify(this.name, slugConfig);
  }

  @AfterLoad()
  public setPosterFullPath() {
    this.poster_full_path = `http://${hostConfig.host}:${hostConfig.port}/static/movies/${this.poster}`;
  }

}
