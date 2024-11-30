import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    this.$use(async (params, next) => {
      const modelsWithSoftDelete = [];
      if (modelsWithSoftDelete.includes(params.model)) {
        if (['findMany', 'findUnique', 'findFirst'].includes(params.action)) {
          if (!params.args) {
            params.args = {};
          }
          if (!params.args.where) {
            params.args.where = {};
          }

          params.args.where['deletedAt'] = null;
        }
      }
      return next(params);
    });
  }
}
