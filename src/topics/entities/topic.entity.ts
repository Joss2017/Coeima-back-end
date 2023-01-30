import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

//----------Mise en place des différentes colommnes via type ORM  de l'entité topics----------//

export class Topic {
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

  @Column({
    default: false,
    nullable: true,
  })
  favorites: boolean;

  @Column({
    nullable: true,
  })
  url: string;

  @Column({
    default: false,
    nullable: false,
  })
  tag: boolean;

  //----------------------liaison tables suivant leurs cardinalités via clé étrangére--------------------//

  @ManyToOne(() => User, (user) => user.topics, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  userId: User;

  @OneToMany(() => Comment, (comments) => comments.topicId, {
    onDelete: 'CASCADE',

    //----------------------Rattache les propriétés de l'entité à celle-ci--------------------//

    eager: true,
  })
  comments: Comment[];
}
