import { PrismaClient, Role } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.lecturer.deleteMany({});
  await prisma.department.deleteMany({});
  await prisma.user.deleteMany({});

  const department1 = await prisma.department.create({
    data: {
      name: 'S1 Informatika',
    },
  });

  const department2 = await prisma.department.create({
    data: {
      name: 'S1 Sistem Informasi',
    },
  });

  const user = await prisma.user.create({
    data: {
      username: 'informatika',
      password: 'admin',
      role: Role.FAKULTAS,
      departmentId: department1.id,
    },
  });

  const user1 = await prisma.user.create({
    data: {
      username: 'sistem-informasi',
      password: 'admin',
      role: Role.PRODI,
      departmentId: department2.id,
    },
  });

  // Seeder for Lecturer
  for (let i = 0; i < 5; i++) {
    await prisma.lecturer.create({
      data: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number('08##########'),
        departmentId: department1.id,
      },
    });
  }

  for (let i = 0; i < 5; i++) {
    await prisma.lecturer.create({
      data: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number('08##########'),
        departmentId: department2.id,
      },
    });
  }
  console.log('Seeding completed, and old data has been cleared.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
