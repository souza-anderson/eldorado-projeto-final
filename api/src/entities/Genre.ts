import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Genre {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

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
