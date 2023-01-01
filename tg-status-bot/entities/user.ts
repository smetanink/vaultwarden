import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export default class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'phone_number', type: 'text', length: 15, nullable: false, unique: true })
  phoneNumber!: string;

  @Column({ name: 'tg_number', type: 'integer', nullable: false })
  tgNumber!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
