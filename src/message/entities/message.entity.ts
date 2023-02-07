import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
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
    nullable: true,
  })
  url: string;

  //----------------------liaison 2 clés étrangères sender/receiver avec l'entité users--------------------//

  @ManyToOne(() => User, (user) => user.messagesReceived, {
    onDelete: 'CASCADE',
  })
  receiver: User;

  @ManyToOne(() => User, (user) => user.messagesSent, {
    onDelete: 'CASCADE',
    eager: true,
  })
  sender: User;
}
