import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

//----------Mise en place des différentes colommnes via type ORM  de l'entité offers----------//

@Entity()
export class Offer {
  //-------------------------------- génération de la clé primaire------------------------------------//

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  //-------------------------------- génération des colonnes-------------------------------------------//

  @Column({
    nullable: true,
    type: 'varchar',
  })
  picture: string;

  @Column({
    nullable: false,
    unique: true,
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
    nullable: true,
    type: 'varchar',
  })
  price: string;

  //----------------------liaison tables suivant leurs cardinalités via clé étrangére--------------------//
  @ManyToOne(() => User, (user) => user.offers, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  createdBy: User;
}
