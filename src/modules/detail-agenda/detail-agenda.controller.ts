import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { DetailAgendaService } from './detail-agenda.service';
import { UpdateDetailAgendumDto } from './dto/update-detail-agendum.dto';
import { Response } from '../../helper/response';
import {
  DetailAgendum,
  DetailAgendums,
} from './entities/detail-agendum.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Detail Agenda')
@Controller('detail-agendas')
export class DetailAgendaController {
  constructor(private readonly detailAgendaService: DetailAgendaService) {}

  @Version('1')
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Success create detail agenda',
    example: {
      statusCode: 201,
      message: 'Success create detail agenda',
      data: {
        uuid: '73a3e3cc-ab51-41aa-b68a-a7a4045ce41e',
        title: 'Rapat Anggaran Rebrain',
        description:
          'Rapat ini berisi tentang RebrainStudio yang akan menjadi vendor Unmuh Jember',
        location: 'CC Lt 4.2',
        start: '2024-05-20T05:00:00.000Z',
        finish: '2024-06-20T06:30:00.000Z',
        typeAgenda: {
          uuid: '57de51a5-7dc5-4e0d-8242-3e00431097c0',
          name: 'rapat Eksternal coy',
        },
        departments: [
          {
            uuid: 'ae4daf7c-39f9-4c7c-89d2-d6e2727bdbee',
            name: 'S1 Informatika',
          },
        ],
        createdAt: '2024-08-29T16:16:39.218Z',
        updatedAt: '2024-08-29T16:16:39.218Z',
      },
    },
  })
  async create(@Body() createDetailAgendumDto: any): Promise<Response> {
    try {
      const result: DetailAgendums = await this.detailAgendaService.create(
        createDetailAgendumDto,
      );
      return Response.success(
        HttpStatus.CREATED,
        'Success create detail agenda',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed create detail agenda',
      );
    }
  }

  @Version('1')
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Success get all detail agenda',
    type: DetailAgendums,
    example: {
      statusCode: 200,
      message: 'Success get all detail agenda',
      data: [
        {
          uuid: '09de4ce7-9acc-4d57-a86d-7a81deb98e40',
          title: 'Rapat Paripurna testing brp ini suksesss harusnya',
          start: '2024-05-20T05:00:00.000Z',
          finish: '2024-06-20T06:30:00.000Z',
          typeAgenda: {
            uuid: '57de51a5-7dc5-4e0d-8242-3e00431097c0',
            name: 'rapat Eksternal coy',
          },
          location: 'CC Lt 4.2',
          author: 'informatika',
        },
        {
          uuid: '45e7b993-e9dd-43eb-bf48-c3cdd4af2881',
          title: 'Rapat Paripurna testing brp ini suksesss harusnya',
          start: '2024-05-20T05:00:00.000Z',
          finish: '2024-06-20T06:30:00.000Z',
          typeAgenda: {
            uuid: '57de51a5-7dc5-4e0d-8242-3e00431097c0',
            name: 'rapat Eksternal coy',
          },
          location: 'CC Lt 4.2',
          author: 'informatika',
        },
      ],
    },
  })
  async findAll(@Query('username') username: string): Promise<Response> {
    try {
      const result: DetailAgendums[] =
        await this.detailAgendaService.findAllByUserDepartment(username);
      return Response.success(
        HttpStatus.OK,
        'Success get all detail agenda',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed get all detail agenda',
      );
    }
  }

  @Version('1')
  @Get(':uuid')
  @ApiResponse({
    status: 200,
    description: 'Success get detail agenda',
    type: DetailAgendum,
    example: {
      statusCode: 200,
      message: 'Success get detail agenda',
      data: {
        uuid: '45e7b993-e9dd-43eb-bf48-c3cdd4af2881',
        title: 'Rapat Paripurna testing brp ini suksesss harusnya',
        description: 'coba 123',
        start: '2024-05-20T05:00:00.000Z',
        finish: '2024-06-20T06:30:00.000Z',
        typeAgenda: {
          uuid: '57de51a5-7dc5-4e0d-8242-3e00431097c0',
          name: 'rapat Eksternal coy',
        },
        departments: [
          {
            uuid: 'ae4daf7c-39f9-4c7c-89d2-d6e2727bdbee',
            name: 'S1 Informatika',
          },
        ],
        location: 'CC Lt 4.2',
        createdAt: '2024-08-29T07:26:20.063Z',
        updatedAt: '2024-08-29T07:26:20.077Z',
      },
    },
  })
  async findOne(@Param('uuid') uuid: string): Promise<Response> {
    try {
      const result: DetailAgendum =
        await this.detailAgendaService.findOne(uuid);
      return Response.success(
        HttpStatus.OK,
        'Success get detail agenda',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed get detail agenda',
      );
    }
  }

  @Version('1')
  @Patch(':uuid')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'absent',
          maxCount: 1,
        },
        {
          name: 'notulen',
          maxCount: 1,
        },
      ],
      {
        storage: diskStorage({
          destination: 'public',
          filename: (req, file, callback) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
      },
    ),
  )
  async update(
    @Param('uuid') uuid: string,
    @Body() updateDetailAgendumDto: UpdateDetailAgendumDto,
    @UploadedFiles()
    files: {
      absent?: Express.Multer.File[];
      notulen?: Express.Multer.File[];
    },
  ): Promise<Response> {
    try {
      const result = await this.detailAgendaService.update(
        uuid,
        updateDetailAgendumDto,
        files,
      );
      return Response.success(
        HttpStatus.OK,
        'Success update detail agenda',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed update detail agenda',
      );
    }
  }

  @Version('1')
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string): Promise<Response> {
    try {
      const result: string = await this.detailAgendaService.remove(uuid);
      return Response.success(
        HttpStatus.OK,
        'Success delete detail agenda',
        result,
      );
    } catch (error) {
      throw Response.error(
        error.status,
        error.message || 'Failed delete detail agenda',
      );
    }
  }
}
