import prisma from '@/app/lib/prisma'

async function main() {
    await prisma.tenant.createMany({
        data: [
            { slug: 'tenant1', name: 'Admin' },
            { slug: 'tenant2', name: 'User' },
        ],
        skipDuplicates: true,
    })

    console.log('Seed completed')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
