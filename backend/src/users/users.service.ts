import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/index';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilteredUser } from './dto/filtered-user.dto';

@Injectable()
export class UsersService {}
