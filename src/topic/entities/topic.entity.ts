import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

//-------------------------------- génération de l'entité par decorator @Entity ---------------------//

@Entity()
export class Topic {
  //-------------------------------- génération de la clé primaire------------------------------------//

  @PrimaryGeneratedColumn('uuid')
  id: string;

  //-------------------------------- génération auto de la date---------------------------------------//

  @CreateDateColumn()
  date_creation: Date;

  //-------------------------------- génération des colonnes-------------------------------------------//

  @Column({
    nullable: false,
    type: 'varchar',
    unique: true,
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
    nullable: true,
  })
  tag: boolean;

  //----------------------liaison tables suivant leurs cardinalités via clé étrangére--------------------//
  @ManyToOne(() => User, (user) => user.topics, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  createdBy: User;

  @OneToMany(() => Comment, (comments) => comments.topic, {
    onDelete: 'CASCADE',

    //---------------------- true = récupére directement les éléments propriétés de l'entité à celle-ci-------------//
    eager: true,
  })
  comments: Comment[];
}
