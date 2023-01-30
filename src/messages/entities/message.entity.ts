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

  @Column('uuid')
  idSender?: string;

  @Column('uuid')
  idReceiver?: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  body: string;

  //----------------------liaison tables suivant leurs cardinalités via clé étrangére--------------------//

  @ManyToOne(() => User, (users) => users.id, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  userId: User;
}
