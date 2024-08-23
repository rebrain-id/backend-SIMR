import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.lecturer.deleteMany({});
  await prisma.department.deleteMany({});

  const department = await prisma.department.create({
    data: {
      name: 'S1 Informatika',
    },
  });

  // Seeder for Lecturer
  for (let i = 0; i < 10; i++) {
    await prisma.lecturer.create({
      data: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number('08##########'),
        departmentId: department.id,
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
