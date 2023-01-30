import { Comment } from 'src/comments/entities/comment.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { Topic } from 'src/topics/entities/topic.entity';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

//--Mise en place des différentes colommnes via type ORM de l'entité users --role = Admin ou User défini par défaut--//

export enum RoleEnumType {
  USER = 'user',
  ADMIN = 'admin',
}

export class User {
  //-------------------------------- génération de la clé primaire------------------------------------//

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  //-------------------------------- génération des colonnes-------------------------------------------//

  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.USER,
  })
  role: RoleEnumType;

  @Column({
    nullable: false,
    type: 'varchar',

    //--------------------------------  par default length 255------------------------------------------//

    length: 50,
  })
  nickname: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: true,
    length: 10,
  })
  telephone: string;

  @Column({
    nullable: true,
  })
  files?: string;

  @Column({
    nullable: true,
  })
  legendFiles?: string;

  //----------------------liaison tables suivant leurs cardinalités via clé étrangére--------------------//

  @OneToMany(() => Offer, (offers) => offers.userId, {
    onDelete: 'CASCADE',
  })
  offers: Offer[];

  @OneToMany(() => Topic, (topics) => topics.userId, {
    onDelete: 'CASCADE',
  })
  topics: Topic[];

  @OneToMany(() => Comment, (comments) => comments.userId, {
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  //----------------------liaison l'entité messages--------------------//

  @OneToMany(() => Message, (messages) => messages.Sender, {
    onDelete: 'CASCADE',
  })
  messagesSent: Message[];

  @OneToMany(() => Message, (messages) => messages.Receiver, {
    onDelete: 'CASCADE',
  })
  messagesReceived: Message[];
}
