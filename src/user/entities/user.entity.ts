import { Comment } from 'src/comment/entities/comment.entity';
import { Message } from 'src/message/entities/message.entity';
import { Offer } from 'src/offer/entities/offer.entity';
import { Topic } from 'src/topic/entities/topic.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

//--Mise en place des différentes colommnes via type ORM de l'entité users --role = Admin ou User défini par défaut--//

export enum RoleEnumType {
  USER = 'user',
  ADMIN = 'admin',
}

//-------------------------------- génération de l'entité par decorator @Entity ---------------------//

@Entity()
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
    unique: true,

    //--------------------------------  par default length 255------------------------------------------//

    length: 50,
  })
  nickname: string;

  @Column({
    nullable: false,
    type: 'varchar',
    //--------------------------------propriété unique permets d'éviter doublon------------------------//

    unique: true,
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
  phone: string;

  @Column({
    nullable: true,
  })
  files: string;

  @Column({
    nullable: true,
  })
  legendFiles?: string;

  //----------------------liaison tables suivant leurs cardinalités via clé étrangére personnalisée---------//

  @OneToMany(() => Offer, (offers) => offers.createdBy, {
    onDelete: 'CASCADE',
  })
  offers: Offer[];

  @OneToMany(() => Topic, (topics) => topics.createdBy, {
    onDelete: 'CASCADE',
  })
  topics: Topic[];

  @OneToMany(() => Comment, (comments) => comments.createdBy, {
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  //--------------------------------------------liaison l'entité messages---------------------------------//

  @OneToMany(() => Message, (messages) => messages.sender, {
    onDelete: 'CASCADE',
  })
  messagesSent: Message[];

  @OneToMany(() => Message, (messages) => messages.receiver, {
    onDelete: 'CASCADE',
  })
  messagesReceived: Message[];
}
