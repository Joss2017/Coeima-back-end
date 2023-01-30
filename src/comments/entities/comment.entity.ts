import { Topic } from 'src/topics/entities/topic.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//---------------------Mise en place des différentes colommnes via type ORM de l'entité comments -----------//

export class Comment {
  //-------------------------------- génération de la clé primaire------------------------------------//

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  //-------------------------------- génération auto de la date---------------------------------------//

  @CreateDateColumn()
  date_creation: Date;

  //-------------------------------- génération des colonnes-------------------------------------------//

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  title: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  body: string;

  //----------------------liaison tables suivant leurs cardinalités via clé étrangére--------------------//

  @ManyToOne(() => User, (users) => users.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  userId: User;

  @ManyToOne(() => Topic, (topics) => topics.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  topicId: Topic;
}
