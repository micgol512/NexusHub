import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Czyszczenie bazy danych...");

  await prisma.reviewMedia.deleteMany();
  await prisma.review.deleteMany();
  await prisma.ratingCount.deleteMany();

  await prisma.faq.deleteMany();
  await prisma.discussion.deleteMany();

  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  await prisma.transaction.deleteMany();

  await prisma.coupon.deleteMany();
  await prisma.paymentMethod.deleteMany();
  await prisma.address.deleteMany();

  await prisma.wishlistItem.deleteMany();
  await prisma.favouriteItem.deleteMany();

  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();

  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.color.deleteMany();

  await prisma.user.deleteMany();

  console.log("✅ Baza danych została wyczyszczona.");
}

main()
  .catch((e) => {
    console.error("❌ Błąd przy czyszczeniu bazy:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
