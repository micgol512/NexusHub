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
          "https://i.ibb.co/8nY35v4t/20250510-2151-S-uchawki-Gamingowe-simple-compose-01jtxvy2nrfawr8kzk97fnygk5.png",
      },
      {
        name: "Keyboard",
        description:
          "Discover our range of modern keyboards designed for every user - from gamers to professionals - featuring responsive keys, RGB lighting, and sleek ergonomics. Shop now!",
        imageURL:
          "https://i.ibb.co/FqbnDJz8/20250509-2325-RBG-Klawiatura-Mechaniczna-simple-compose-01jtveyykcey2a993ravmstrcm.png",
      },
      {
        name: "Monitor",
        description:
          "Upgrade your viewing experience with our high-performance monitors, delivering stunning visuals, fast refresh rates, and eye-friendly technology. Shop now!",
        imageURL:
          "https://i.ibb.co/HD2sYjmG/20250510-2158-Zakrzywiony-monitor-gamingowy-simple-compose-01jtxwb5f5fs8sgyf17fz5h4xx.png",
      },
      {
        name: "Webcam",
        description:
          "Stay connected in HD with our reliable webcams, perfect for video calls, streaming, and remote work - offering sharp image quality and plug-and-play setup. Shop now!",
        imageURL:
          "https://i.ibb.co/Q3QpVnPf/20250510-2201-Przezroczysta-Kamerka-Internetowa-simple-compose-01jtxwk95rfxftxvm2heee5zka.png",
      },
      {
        name: "Microphone",
        description:
          "Capture every word with precision using our top-tier microphones, ideal for streaming, podcasting, and professional calls - delivering studio-quality sound. Shop now!",
        imageURL:
          "https://i.ibb.co/HD1M1BCG/Mikrofon-BLUE-Yeti-Czarny-01-removebg-preview.png",
      },
      {
        name: "Gadgets",
        description:
          "Explore our collection of innovative gadgets designed to make life easier, smarter, and more fun - from smart tech to everyday essentials. Shop now!",
        imageURL:
          "https://i.ibb.co/CK5zbZk0/Akcesoria-komputerowe-na-przezroczystym-tle.png",
      },
    ],
  });

  await prisma.brand.createMany({
    data: [
      {
        name: "ROG",
        description: "Republic of Gamers hardware.",
        imageURL:
          "https://i.ibb.co/n8ks4qww/ac0d22f85c2ec424490be9243ce01c15da91ee5b.png",
      },
      {
        name: "Logitech",
        description: "Top-tier peripherals and accessories.",
        imageURL:
          "https://i.ibb.co/nszjnHTk/f546cb8363c60c97f8b94c4d8756146da93a75ec.png",
      },
      {
        name: "JBL",
        description: "Premium sound devices.",
        imageURL:
          "https://i.ibb.co/r2Cm7Bkt/f34b5d527eeeeaa430234358689d70b0a91028b5.png",
      },
      {
        name: "AOC",
        description: "Reliable and affordable monitors.",
        imageURL:
          "https://i.ibb.co/sJb8g9RY/Aoc-international-logo-svg-removebg-preview.png",
      },
      {
        name: "Razer",
        description: "Gaming gear for professionals.",
        imageURL:
          "https://i.ibb.co/xKBq62yz/2b96ddc768babe93b4a80c71354dbb15f284150a.png",
      },
      {
        name: "Rexus",
        description: "Innovative tech solutions.",
        imageURL:
          "https://i.ibb.co/SjMq348/06d3ac25f7c851a6535029e2ba993f0b5b248273.png",
      },
      {
        name: "SteelSeries",
        description: "Pro-grade eSports equipment.",
        imageURL:
          "https://i.ibb.co/6RcTTggq/Steel-Serries-removebg-preview.png",
      },
      {
        name: "HyperX",
        description: "High-performance memory and gaming products.",
        imageURL: "https://i.ibb.co/gbwtcrDg/hyper-X-removebg-preview.png",
      },
      {
        name: "MSI",
        description: "Cutting-edge PC components and laptops.",
        imageURL:
          "https://i.ibb.co/TqNjcCtw/msi-logo-png-seeklogo-198918-removebg-preview.png",
      },
      {
        name: "Corsair",
        description: "Performance memory, cases, and accessories.",
        imageURL:
          "https://i.ibb.co/r2swrff2/png-transparent-corsair-hd-logo-thumbnail.png",
      },
      {
        name: "Dell",
        description: "Computing for business and personal use.",
        imageURL:
          "https://i.ibb.co/v6DpTC45/logo-dell-2016-removebg-preview.png",
      },
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
          price: parseFloat((Math.random() * 100).toFixed(2)),
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
                url: category.imageURL || "placeholder",
              },
              {
                url: category.imageURL || "placeholder",
              },
              {
                url: category.imageURL || "placeholder",
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
