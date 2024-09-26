export class DepartmentDocs {
  static params() {
    return { name: 'uuid', example: 'd1d8a267-365a-4556-8881-12aad8dbde63' };
  }

  static createResponse() {
    return {
      status: 201,
      description: 'Success create department',
      example: {
        statusCode: 201,
        message: 'Success create department',
        data: {
          uuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
          name: 'Sastra Informatika',
          createdAt: '2024-08-29T15:48:02.661Z',
          updatedAt: '2024-08-29T15:48:02.661Z',
        },
      },
    };
  }

  static findAllResponse() {
    return {
      status: 200,
      description: 'Success get all departments',
      example: {
        statusCode: 200,
        message: 'Success get all departments',
        data: [
          {
            uuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
            name: 'Sastra Informatika',
            createdAt: '2024-08-29T15:48:02.661Z',
            updatedAt: '2024-08-29T15:48:02.661Z',
          },
          {
            uuid: 'c77dc43f-888e-4c60-8795-08660f95326b',
            name: 'Kimia Syariah',
            createdAt: '2024-08-29T15:55:30.638Z',
            updatedAt: '2024-08-29T15:55:30.638Z',
          },
        ],
      },
    };
  }

  static findOneResponse() {
    return {
      status: 200,
      description: 'Success get department',
      example: {
        statusCode: 200,
        message: 'Success get department',
        data: {
          uuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
          name: 'Sastra Informatika',
          createdAt: '2024-08-29T15:48:02.661Z',
          updatedAt: '2024-08-29T15:48:02.661Z',
        },
      },
    };
  }

  static updateResponse() {
    return {
      status: 200,
      description: 'Success update department',
      example: {
        statusCode: 200,
        message: 'Success update department',
        data: {
          uuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
          name: 'Sastra Informatika',
          createdAt: '2024-08-29T15:48:02.661Z',
          updatedAt: '2024-08-29T15:48:02.661Z',
        },
      },
    };
  }

  static deleteResponse() {
    return {
      status: 200,
      description: 'Success delete department',
      example: {
        statusCode: 200,
        message: 'Success delete department',
        data: 'Success delete Department with uuid: d1d8a267-365a-4556-8881-12aad8dbde63',
      },
    };
  }
}
