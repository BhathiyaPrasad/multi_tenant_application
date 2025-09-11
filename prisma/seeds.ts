import prisma from "@/app/lib/prisma"
import bcrypt from "bcrypt"

async function main() {
    const tenant1 = await prisma.tenant.upsert({
        where: { slug: "tenant1" },
        update: {},
        create: { slug: "tenant1", name: "Admin" },
    })

    const tenant2 = await prisma.tenant.upsert({
        where: { slug: "tenant2" },
        update: {},
        create: { slug: "tenant2", name: "User" },
    })

    const passwordHash = await bcrypt.hash("password123", 10)

    await prisma.user.upsert({
        where: { email: "admin@tenant1.com" },
        update: {},
        create: {
            email: "admin@tenant1.com",
            password: passwordHash,
            tenantId: tenant1.id,
        },
    })

    await prisma.user.upsert({
        where: { email: "user@tenant2.com" },
        update: {},
        create: {
            email: "user@tenant2.com",
            password: passwordHash,
            tenantId: tenant2.id,
        },
    })

    await prisma.blogs.createMany({
        data: [
            {
                title: "Welcome to Tenant1",
                content: "This is the first blog post for tenant1.",
                tenantId: tenant1.id,
                type: "general",
                Description: "Introductory blog post for tenant1",
            },
            {
                title: "Tenant2 Updates",
                content: "Some updates for tenant2 users.",
                tenantId: tenant2.id,
                type: "news",
                Description: "Update blog post for tenant2",
            },
        ],
        skipDuplicates: true,
    })

    console.log("Seed completed ✅")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
