import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export class UserDocs {
  static userParam() {
    return {
      name: 'username',
      description: 'Find user by username',
      example: 'Sang Surya',
      type: String,
    };
  }

  static register() {
    return {
      status: 201,
      description: 'Success create user',
      type: CreateUserDto,
      example: {
        statusCode: 201,
        message: 'Success create user',
        data: {
          uuid: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2',
          username: 'Sang Surya',
          password: 'thisismypassword',
          departmentUuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
        },
      },
    };
  }

  static findAll() {
    return {
      status: 200,
      description: 'Success get all users',
      type: CreateUserDto,
      example: {
        statusCode: 200,
        message: 'Success get all users',
        data: [
          {
            username: 'babayo',
            password:
              '$2b$10$PRxpQDT0r1kZWIqXgOB6EuK5Iin2WN/8x68WXybS31gcoJJef70TC',
            department: {
              uuid: '94890b53-20cf-41ca-adfe-d3e0dd9686af',
              name: 'Kimia Syariah',
            },
            role: 'PRODI',
            createdAt: '2024-09-02T15:02:36.245Z',
            updatedAt: '2024-09-04T09:25:49.979Z',
          },
          {
            username: 'goku',
            password:
              '$2b$10$qp3yGHexjaQySlBOM2a/A.muWHP4IeDyrZyazNdZ6aWIH72b4/QuS',
            department: {
              uuid: '0b105513-22de-456d-a998-4b574abb6d3e',
              name: 'Sastra Informatika',
            },
            role: 'FAKULTAS',
            createdAt: '2024-09-04T09:26:13.912Z',
            updatedAt: '2024-09-04T09:41:14.615Z',
          },
        ],
        totalData: 2,
      },
    };
  }

  static findOne() {
    return {
      status: 200,
      description: 'Success get user',
      type: CreateUserDto,
      example: {
        statusCode: 200,
        message: 'Success get user',
        data: {
          uuid: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2',
          username: 'Sang Surya',
          password: 'thisismypassword',
          departmentUuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
        },
      },
    };
  }

  static update() {
    return {
      status: 200,
      description: 'Success update user',
      type: UpdateUserDto,
      example: {
        statusCode: 200,
        message: 'Success update user',
        data: {
          uuid: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2',
          username: 'Sang Surya',
          password: 'thisismypassword',
          departmentUuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
        },
      },
    };
  }

  static remove() {
    return {
      status: 200,
      description: 'Success delete user',
      type: CreateUserDto,
      example: {
        statusCode: 200,
        message: 'Success delete user',
        data: 'Success delete user with username: trunk',
      },
    };
  }
}
