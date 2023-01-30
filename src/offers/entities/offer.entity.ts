import { User } from 'src/users/entities/user.entity';
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

//----------Mise en place des différentes colommnes via type ORM  de l'entité offers----------//

export class Offer {
  //-------------------------------- génération de la clé primaire------------------------------------//

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  //-------------------------------- génération des colonnes-------------------------------------------//

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  title: string;

  @Column({
    nullable: true,
  })
  picture: string;

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
