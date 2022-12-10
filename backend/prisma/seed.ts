import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      username: 'Admin',
      role: 'ADMIN',
      password: await bcrypt.hash('admin', 10),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'User',
      role: 'USER',
      password: await bcrypt.hash('user', 10),
    },
  });

  console.log({ user1, user2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
