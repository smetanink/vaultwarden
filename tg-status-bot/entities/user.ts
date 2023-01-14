import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export default class User {
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
