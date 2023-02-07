import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('comment')
export class CommentsController {
  constructor(private readonly commentService: CommentService) {}

  //-------------------------Route afficher tout les COMMENTS-----------------------------//

  @Get()
  findAllComments(): Promise<Comment[]> {
    return this.commentService.findAllComments();
  }

  //-------------------------Route afficher un COMMENT-----------------------------//

  @Get(':id')
  findOneComment(@Param('id') idValue: string): Promise<Comment> {
    return this.commentService.findOneComment(idValue);
  }

  //-------------------------Route créer un COMMENT-----------------------------//

  @Post()
  @UseGuards(AuthGuard())
  createComment(
    @Body()
    createCommentDto: CreateCommentDto,
    @GetUser() connectedUser: User,
  ) {
    return this.commentService.createComment(createCommentDto, connectedUser);
  }

  //-------------------------Route update un COMMENT-----------------------------//

  @Patch(':id')
  @UseGuards(AuthGuard())
  updateComment(
    @Param('id') idValue: string,
    @GetUser() connectedUser: User,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(
      idValue,
      updateCommentDto,
      connectedUser,
    );
  }

  //-------------------------Route supprimer un COMMENT-----------------------------//

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') idValue: string, @GetUser() connectedUser: User) {
    return this.commentService.remove(idValue, connectedUser);
  }
}
