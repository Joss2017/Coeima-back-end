import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  // -----------------------------------------------Méthode afficher tout les COMMENTS------------------------//

  async findAll() {
    const allCommentsFound: Comment[] = await this.commentRepository.find();
    console.log('topics trouvés', allCommentsFound);
    if (!allCommentsFound) {
      throw new NotFoundException(`Commentaires non trouvées`);
    }

    return allCommentsFound;
  }

  // -----------------------------------------------Méthode afficher un COMMENT-------------------------------//

  async findOne(idValue: string) {
    try {
      const oneCommentFound = await this.commentRepository.findOneBy({
        id: idValue,
      });
      console.log('commentaire trouvé----------------', oneCommentFound);
      return oneCommentFound;
    } catch (error) {
      `pas de commentaire trouvé avec l'id:${idValue}`;
      console.log(error);
    }
  }

  // -----------------------------------------------Méthode de création COMMENT-------------------------------//

  async create(createCommentDto: CreateCommentDto, connectedUser: User) {
    const { title, body } = createCommentDto;
    const newComment = await this.commentRepository.create({
      title,
      body,
      createdBy: connectedUser,
    });
    console.log('création newComment-------- ', newComment);
    try {
      return await this.commentRepository.save(newComment);
    } catch (error) {
      `les données ne sont pas crées`;
      console.log(error);
    }
  }

  // -----------------------------------------------Méthode update COMMENT-------------------------------//

  async update(
    idValue: string,
    updateCommentDto: UpdateCommentDto,
    connectedUser: User,
  ) {
    //-------------------------Recherche comments dans la BDD -------------------//

    const oneCommentFound = await this.commentRepository.findOneBy({
      id: idValue,
      createdBy: connectedUser,
    });
    console.log('connectedUser requete remove user', connectedUser);
    console.log(' topic trouvé', oneCommentFound);

    //-------------------------Gestion erreur si pas de topic dans la BDD -------//

    if (!oneCommentFound) {
      throw new NotFoundException("Ce commentaire n'existe pas");
    }

    //-------------------------Gestion erreur si  user pas autorisé -----------//

    if (
      oneCommentFound.createdBy.id !== connectedUser.id &&
      connectedUser.role !== 'admin'
    ) {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }

    //-----Destructuration de l'update afin de vérifier si données dejà existantes ----//
    const { title, body } = updateCommentDto;

    //-------------------------Gestion erreur si même valeur-----------//

    if (title) {
      oneCommentFound.title = title;
    }
    if (body) {
      oneCommentFound.body = body;
    }
    try {
      return await this.commentRepository.save(oneCommentFound);
    } catch (error) {
      ` les données ne sont pas enregistrés`;
      console.log(error);
    }
  }

  // -----------------------------------------------Méthode delete COMMENTS by Admin&User---------------------//

  async remove(idValue: string, connectedUser: User) {
    const oneCommentFound = await this.commentRepository.findOneBy({
      id: idValue,
    });
    console.log('connectedUser remove comment', connectedUser);
    console.log('commentaire trouvé', oneCommentFound);

    //-------------------------Gestion erreur si pas de topic dans la BDD -------//

    if (
      oneCommentFound.createdBy.id !== connectedUser.id &&
      connectedUser.role !== 'admin'
    ) {
      throw new UnauthorizedException(
        "Vous n'êtes pas autorisé à modifier ces informations",
      );
    }
    try {
      const result = await this.commentRepository.delete({
        id: idValue,
      });
      console.log('valeur du result par id', result);
      if (result.affected !== 0) {
        return `Cette action a supprimé le post du commentaire dont le titre était ${oneCommentFound.title}`;
      }
    } catch (error) {
      `Impossible de supprimer le commentaire`;
      console.log(error);
    }
  }
}
