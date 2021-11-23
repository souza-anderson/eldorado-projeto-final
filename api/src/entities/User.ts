import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import bcryptjs from "bcryptjs";
@Entity()
export class User {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

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
  public async hashPassword() {
    this.password = await bcryptjs.hash(this.password, 10);
  }
}
