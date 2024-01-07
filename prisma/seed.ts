import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {

    const user1 = await prisma.user.upsert({
        where: { email: 'arthur.broudoux@gmail.com' },
        update: {},
        create: {
            email: 'arthur.broudoux@gmail.com',
            firstName: 'arthur',
            password: 'azertyuiop',
        },
    });

    const user2 = await prisma.user.upsert({
        where: { email: 'antionio.bertinau@gmail.com' },
        update: {},
        create: {
            email: 'antionio.bertinau@gmail.com',
            firstName: 'antonio',
            password: 'azertyuiop',
        },
    });

    console.log({ user1, user2 });
}

main().catch((e) => {
    console.error(e); 
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
