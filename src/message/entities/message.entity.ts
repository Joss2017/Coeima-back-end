import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//----------Mise en place des différentes colommnes via type ORM  de l'entité topics----------//

@Entity()
export class Message {
  //-------------------------------- génération de la clé primaire------------------------------------//

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  //-------------------------------- génération auto de la date---------------------------------------//

  @CreateDateColumn()
  date_creation: Date;

  //-------------------------------- génération des colonnes-------------------------------------------//

  @Column({
    nullable: false,
    type: 'text',
  })
  body: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  files: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  legendFiles?: string;

  @Column({
    default: false,
    nullable: false,
    type: 'boolean',
  })
  isRead: boolean;

  //----------------------liaison 2 clés étrangères sender/receiver avec l'entité users--------------------//

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'sender_id' })
  sender: User;
}
