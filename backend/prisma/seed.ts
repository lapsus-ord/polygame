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
    insertGameDefinition({
      slug: 'bombparty',
      name: 'Bomb Party',
      logo: '💣',
      description: 'Jeu de mots explosif',
      enabled: true,
      color: '#e5c094',
    }),
    insertGameDefinition({
      slug: 'cowboy-clicker',
      name: 'Bang!',
      logo: 'noto-v1:pistol',
      description: 'Ready, Steady, Bang!',
      enabled: true,
      color: '#3dbd31',
    }),
    insertGameDefinition({
      slug: 'motus',
      name: 'MUTOS',
      logo: 'twemoji:letter-q',
      description: 'Prêt à vous détruire le cerveau ?',
      enabled: true,
      color: '#f7b735',
    }),
    insertGameDefinition({
      slug: 'guesswho',
      name: 'Kiesse',
      logo: 'twemoji:person-facepalming',
      description: 'Le vrai Qui est-ce !',
      enabled: true,
      color: '#da171d',
    }),
    insertGameDefinition({ slug: 'lambda-1', name: 'Lambda Game Def 1' }),
    insertGameDefinition({ slug: 'lambda-2', name: 'Lambda Game Def 2' }),
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

async function insertGameDefinition(def: {
  slug: string;
  name: string;
  logo?: string;
  description?: string;
  enabled?: boolean;
  color?: string;
}) {
  try {
    const definitionCreated = prisma.gameDefinition.create({
      data: def,
    });

    console.log(await definitionCreated);
  } catch (error) {
    if (!(error instanceof PrismaClientKnownRequestError)) throw error;
    if (error.code !== 'P2002') throw error;

    console.error(
      `>>> Game definition with the slug "${def.slug}" already exists`
    );
  }
}
