/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentsController } from './comment.controller';

@Module({
  controllers: [CommentsController],
  providers: [CommentService]
})
export class CommentModule {}
