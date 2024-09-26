export class LecturerDocs {
  static params() {
    return { name: 'uuid', example: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2' };
  }

  static queryDepartment() {
    return {
      name: 'department',
      type: String,
      required: false,
      description: 'Filter by department',
      example: 'Sastra Informatika',
    };
  }

  static queryName() {
    return {
      name: 'name',
      type: String,
      required: false,
      description: 'Filter by name',
      example: 'Sang Surya',
    };
  }

  static createResponse() {
    return {
      status: 200,
      description: 'Success get lecturer',
      example: {
        statusCode: 200,
        message: 'Success get lecturer',
        data: {
          uuid: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2',
          name: 'Sang Surya',
          email: 'sangsurya@gmail.com',
          phoneNumber: '08123456789',
          department: {
            uuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
            name: 'Sastra Informatika',
          },
          createdAt: '2024-08-29T16:38:09.714Z',
          updatedAt: '2024-08-29T16:41:41.648Z',
        },
      },
    };
  }

  static findAllResponse() {
    return {
      status: 200,
      description: 'Success get all lecturers',
      example: {
        statusCode: 200,
        message: 'Success get all lecturers',
        data: [
          {
            uuid: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2',
            name: 'Sang Surya',
            email: 'sangsurya@gmail.com',
            phoneNumber: '08123456789',
            department: {
              uuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
              name: 'Sastra Informatika',
            },
            createdAt: '2024-08-29T16:38:09.714Z',
            updatedAt: '2024-08-29T16:41:41.648Z',
          },
          {
            uuid: 'cb3c7074-d657-446e-b115-86a00baf8294',
            name: 'Kampus Biru',
            email: 'kampusbiru@gmail.com',
            phoneNumber: '123456789',
            department: {
              uuid: 'c77dc43f-888e-4c60-8795-08660f95326b',
              name: 'Kimia Syariah',
            },
            createdAt: '2024-08-29T16:46:33.297Z',
            updatedAt: '2024-08-29T16:46:33.297Z',
          },
        ],
      },
    };
  }

  static findOneResponse() {
    return {
      status: 200,
      description: 'Success get lecturer',
      example: {
        statusCode: 200,
        message: 'Success get lecturer',
        data: {
          uuid: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2',
          name: 'Sang Surya',
          email: 'sangsurya@gmail.com',
          phoneNumber: '08123456789',
          department: {
            uuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
            name: 'Sastra Informatika',
          },
          createdAt: '2024-08-29T16:38:09.714Z',
          updatedAt: '2024-08-29T16:41:41.648Z',
        },
      },
    };
  }

  static updateResponse() {
    return {
      status: 200,
      description: 'Success update lecturer',
      example: {
        statusCode: 200,
        message: 'Success update lecturer',
        data: {
          uuid: '7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2',
          name: 'Sang Surya',
          email: 'sangsurya@gmail.com',
          phoneNumber: '08123456789',
          department: {
            uuid: 'd1d8a267-365a-4556-8881-12aad8dbde63',
            name: 'Sastra Informatika',
          },
          createdAt: '2024-08-29T16:38:09.714Z',
          updatedAt: '2024-08-29T16:38:09.714Z',
        },
      },
    };
  }

  static removeResponse() {
    return {
      status: 200,
      description: 'Success delete lecturer',
      example: {
        statusCode: 200,
        message: 'Success delete lecturer',
        data: 'Success delete Lecturer with uuid: 7c82d4c1-439d-42e6-9ef5-d5d2bd104bb2',
      },
    };
  }
}
