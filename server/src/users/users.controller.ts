import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  DefaultValuePipe, ParseIntPipe, Headers, UploadedFile, UseInterceptors
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {JwtService} from "@nestjs/jwt";
import {extname} from "path";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
              private jwtService: JwtService,) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];
        const fileExtenstion = file.originalname.split('.')[1];
        const newFileName = name.split(" ").join('_')+'_'+Date.now()+'.'+fileExtenstion;

        cb(null, newFileName);
      }
    }),
    fileFilter: (req, file, cb) => {
      let ext = extname(file.originalname)
      if(ext !== '.jpg' && ext !== '.jpeg') {
        return cb(new HttpException('Only .jpg/.jpeg images are allowed!',HttpStatus.BAD_REQUEST), null);
      }
      cb(null, true)
    },
    limits: {fileSize: 1024*1024}
  }))
  async create(@Body() createUserDto: CreateUserDto,
               @UploadedFile() file: any,
               @Headers() headers) {
    try {
      // const check = this.jwtService.verify(headers.token)
      const candidate = await this.usersService.getUserByEmail(createUserDto.email, createUserDto.phone);
      if (candidate) {
        return {
          "success": false,
          "message": "User with this phone or email already exist"
        }
      }
      if (file.size > 5000000) {
        return "The file size is too big"
      }
      const user = await this.usersService.create(createUserDto, file.filename)
      return {
        "success": true,
        "user_id": user.id,
        "message": "New user successfully registered",
      };
    } catch (e) {
      return {
        // "success": false,
        // "message": "The token expired."
        error: e
      }
    }
  }


  @Get()
  async findAll(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
      @Query('limit', new DefaultValuePipe(6), ParseIntPipe) limit: number = 6,
  ) {
    if(page == 0) {
      return {
        "success": false,
        "message": "Validation failed",
        "fails": {
          "page": [
            "The page must be at least 1."
          ]
        }
      }
    }
    limit = limit > 100 ? 100 : limit;
    const data = await this.usersService.paginate({
      page,
      limit,
      route: 'http://localhost:3000/users/',
    })
    if(data.meta.itemCount == 0) {
      return {
        "success": false,
        "message": "Page not found"
      }
    }
    return {
      "success": true,
      "page": data.meta.currentPage,
      "total_pages": data.meta.totalPages,
      "total_items": data.meta.totalItems,
      "count": data.meta.itemCount,
      "links": {
        "next_url": "test",
        "prev_url": "test",
      },
      "users": data.items.map(item => {
        return {
          "id": item.id,
          "name": item.name,
          "email": item.email,
          "phone": item.phone,
          "position": item.position.name,
          "position_id": item.position.id,
          "photo": "http://localhost:5000/api/v1/uploads/" + item.photo
        }
      })
    };
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    if(typeof(id) == 'string') {
      return {
        "success": false,
        "message": "Validation failed",
        "fails": {
          "user_id": [
            "The user_id must be an integer."
          ]
        }
      }
    }
    const user = await this.usersService.findOne(+id);
    if(user) {
      return {
        "success": true,
        "user": {
          "id": user.id,
          "name": user.name,
          "email": user.email,
          "phone": user.phone,
          "position": user.position.name,
          "position_id": user.position.id,
          "photo": 'http://localhost:5000/api/v1/uploads/' + user.photo
        }
    }
    } else {
      return {
        "success": false,
        "message": "The user with the requested identifier does not exist",
        "fails": {
          "user_id" : [
            "User not found"
          ]
        }
      }
    }
  }

}
