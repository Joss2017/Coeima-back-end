import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//----------Mise en place des différentes colommnes via type ORM  de l'entité topics----------//

export class Message {
  //-------------------------------- génération de la clé primaire------------------------------------//

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  //-------------------------------- génération auto de la date---------------------------------------//

  @CreateDateColumn()
  date_creation: Date;

  //-------------------------------- génération des colonnes-------------------------------------------//

  @Column({
    nullable: true,
    type: 'text',
  })
  body: string;

  //----------------------liaison 2 clés étrangères sender/receiver avec l'entité users--------------------//

  @ManyToOne(() => User, (users) => users.messagesReceived, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  Receiver: User;

  @ManyToOne(() => User, (users) => users.messagesSent, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  Sender: User;
}
