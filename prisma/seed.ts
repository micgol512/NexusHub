import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const userProduct = await prisma.product.findFirst();

  if (userProduct) {
    console.log("Some data already exists. Seeding skipped.");
    return;
  }

  await prisma.user.createMany({
    data: [
      {
        email: "user1@example.com",
        password: "hashedpassword1",
        mobileNumber: "111111111",
        username: "user1",
        role: "USER",
        countryRegion: "Poland",
      },
      {
        email: "user2@example.com",
        password: "hashedpassword2",
        mobileNumber: "222222222",
        username: "user2",
        role: "USER",
        countryRegion: "Poland",
      },
      {
        email: "user3@example.com",
        password: "hashedpassword3",
        mobileNumber: "333333333",
        username: "user3",
        role: "USER",
        countryRegion: "Poland",
      },
      {
        email: "user4@example.com",
        password: "hashedpassword4",
        mobileNumber: "444444444",
        username: "user4",
        role: "USER",
        countryRegion: "Poland",
      },
      {
        email: "admin@example.com",
        password: "hashedadminpassword",
        mobileNumber: "555555555",
        username: "admin",
        role: "ADMIN",
        countryRegion: "Poland",
      },
    ],
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
        description:
          "Explore our diverse selection of electronic mice for sale, featuring cutting-edge technology, ergonomic designs, and unbeatable prices. Shop now!",
        imageURL:
          "https://i.ibb.co/5WYyQd5p/ad1a62b3939f5147fb9c66c5e3d3c48daac93746.png",
      },
      {
        name: "Headphone",
        description:
          "Immerse yourself in premium audio with our selection of high-quality headphones, offering crystal-clear sound, noise cancellation, and all-day comfort. Shop now!",
        imageURL:
          "https://i.ibb.co/5WYyQd5p/ad1a62b3939f5147fb9c66c5e3d3c48daac93746.png",
      },
      {
        name: "Keyboard",
        description:
          "Discover our range of modern keyboards designed for every user - from gamers to professionals - featuring responsive keys, RGB lighting, and sleek ergonomics. Shop now!",
        imageURL:
          "https://i.ibb.co/5WYyQd5p/ad1a62b3939f5147fb9c66c5e3d3c48daac93746.png",
      },
      {
        name: "Monitor",
        description:
          "Upgrade your viewing experience with our high-performance monitors, delivering stunning visuals, fast refresh rates, and eye-friendly technology. Shop now!",
        imageURL:
          "https://i.ibb.co/5WYyQd5p/ad1a62b3939f5147fb9c66c5e3d3c48daac93746.png",
      },
      {
        name: "Webcam",
        description:
          "Stay connected in HD with our reliable webcams, perfect for video calls, streaming, and remote work - offering sharp image quality and plug-and-play setup. Shop now!",
        imageURL:
          "https://i.ibb.co/5WYyQd5p/ad1a62b3939f5147fb9c66c5e3d3c48daac93746.png",
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
