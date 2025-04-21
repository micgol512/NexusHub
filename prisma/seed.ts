import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const userExists = await prisma.user.findFirst();

  if (userExists) {
    console.log("Seed już został wykonany – użytkownicy istnieją. Pomijam...");
    return;
  }

  await prisma.user.createMany({
    data: [
      {
        email: "user1@example.com",
        password: "hashedpassword1",
        mobileNumber: "123456789",
        username: "user1",
        role: "USER",
        countryRegion: "Poland",
      },
      {
        email: "user2@example.com",
        password: "hashedpassword2",
        mobileNumber: "123456789",
        username: "user2",
        role: "USER",
        countryRegion: "Poland",
      },
      {
        email: "user3@example.com",
        password: "hashedpassword3",
        mobileNumber: "123456789",
        username: "user3",
        role: "USER",
        countryRegion: "Poland",
      },
      {
        email: "user4@example.com",
        password: "hashedpassword4",
        mobileNumber: "123456789",
        username: "user4",
        role: "USER",
        countryRegion: "Poland",
      },
      {
        email: "admin@example.com",
        password: "hashedadminpassword",
        mobileNumber: "123456789",
        username: "admin",
        role: "ADMIN",
        countryRegion: "Poland",
      },
    ],
    skipDuplicates: true,
  });

  const users = await prisma.user.findMany();

  for (const [index, user] of users.entries()) {
    await prisma.address.create({
      data: {
        userId: user.id,
        city: "Warsaw",
        country: "Poland",
        postCode: "00-001",
        province: `Mazovia - ${index}`,
      },
    });
  }

  await prisma.category.createMany({
    data: [
      {
        name: "Mouse",
        description: "High-precision mice for gaming and productivity.",
      },
      {
        name: "Headphone",
        description: "Crystal-clear sound for music and calls.",
      },
      {
        name: "Keyboard",
        description: "Mechanical and membrane keyboards for every use case.",
      },
      {
        name: "Monitor",
        description: "High-resolution displays for work and play.",
      },
    ],
  });

  await prisma.brand.createMany({
    data: [
      { name: "ROG", description: "Republic of Gamers hardware." },
      {
        name: "Logitech",
        description: "Top-tier peripherals and accessories.",
      },
      { name: "JBL", description: "Premium sound devices." },
      { name: "AOC", description: "Reliable and affordable monitors." },
      { name: "Razer", description: "Gaming gear for professionals." },
      { name: "Rexus", description: "Innovative tech solutions." },
      { name: "SteelSeries", description: "Pro-grade eSports equipment." },
      {
        name: "HyperX",
        description: "High-performance memory and gaming products.",
      },
      { name: "MSI", description: "Cutting-edge PC components and laptops." },
      {
        name: "Corsair",
        description: "Performance memory, cases, and accessories.",
      },
      { name: "Dell", description: "Computing for business and personal use." },
    ],
  });

  await prisma.color.createMany({
    data: [
      { name: "Black", hash: "#000000" },
      { name: "White", hash: "#FFFFFF" },
      { name: "Red", hash: "#FF0000" },
      { name: "Blue", hash: "#0000FF" },
      { name: "Green", hash: "#00FF00" },
    ],
  });

  const allCategories = await prisma.category.findMany();
  const allBrands = await prisma.brand.findMany();
  const allColors = await prisma.color.findMany();

  let productCount = 0;
  for (const category of allCategories) {
    for (let i = 1; i <= 5; i++) {
      const brand = allBrands[(productCount + i) % allBrands.length];
      await prisma.product.create({
        data: {
          stock: 100,
          name: `${category.name} Product ${i}`,
          description: `Description for ${category.name} product ${i}.`,
          price: parseFloat((50 + i * 10).toFixed(2)),
          categoryId: category.id,
          brandId: brand.id,
          colors: {
            connect: [
              { id: allColors[(i + 0) % allColors.length].id },
              { id: allColors[(i + 1) % allColors.length].id },
            ],
          },
          images: {
            create: [
              {
                url: `https://example.com/images/${category.name.toLowerCase()}-${i}-1.jpg`,
              },
              {
                url: `https://example.com/images/${category.name.toLowerCase()}-${i}-2.jpg`,
              },
            ],
          },
        },
      });
    }
    productCount++;
  }
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
