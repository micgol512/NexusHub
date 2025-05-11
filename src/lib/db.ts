import { prisma } from "./prisma";
export async function getUserByEmailOrPhone(contact: string) {
  return await prisma.user.findFirst({
    where: {
      OR: [{ email: contact }, { mobileNumber: contact }],
    },
  });
}
