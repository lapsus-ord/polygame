import { PrismaClient, Role } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

async function main() {
  console.log('--- Seeding the DB ---');

  await Promise.all([
    insertUser('admin', 'admin', Role.ADMIN),
    insertUser('test', 'test', Role.USER),
    insertGameDefinition('bombparty', 'Bomb Party'),
    insertGameDefinition('cowboy-clicker', 'Ready Steady Bang!'),
  ]);
}

async function insertUser(
  username: string,
  password: string,
  role: Role
): Promise<void> {
  try {
    const user = prisma.user.create({
      data: {
        username: username,
        password: await argon2.hash(password),
        role: role,
      },
    });

    console.log(await user);
  } catch (error) {
    if (!(error instanceof PrismaClientKnownRequestError)) throw error;
    if (error.code !== 'P2002') throw error;

    console.error(`>>> User with the username "${username}" already exists`);
  }
}

async function insertGameDefinition(slug: string, name: string) {
  try {
    const gameDefinition = prisma.gameDefinition.create({
      data: {
        slug: slug,
        name: name,
      },
    });

    console.log(await gameDefinition);
  } catch (error) {
    if (!(error instanceof PrismaClientKnownRequestError)) throw error;
    if (error.code !== 'P2002') throw error;

    console.error(`>>> Game definition with the slug "${slug}" already exists`);
  }
}
