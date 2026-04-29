const { PrismaClient } = require('./lib/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  try {
    const page = await prisma.pagina.findUnique({
      where: { slug: 'home' }
    });
    console.log(JSON.stringify(page, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

main();
