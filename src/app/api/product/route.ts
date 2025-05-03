import { Prisma, PrismaClient } from "@/generated/prisma";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const categories = searchParams.getAll("category");
  const brands = searchParams.getAll("brand");
  const colors = searchParams.getAll("color"); // Propably for delete
  const minPrice = Number(searchParams.get("min")) || 0;
  const maxPrice = Number(searchParams.get("max")) || 10000;
  const sort = searchParams.get("sortBy") || "createdAt_desc";
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  let orderBy: Prisma.ProductOrderByWithRelationInput = {};

  switch (sort) {
    case "price_asc":
      orderBy = { price: "asc" };
      break;
    case "price_desc":
      orderBy = { price: "desc" };
      break;
    case "name_asc":
      orderBy = { name: "asc" };
      break;
    case "name_desc":
      orderBy = { name: "desc" };
      break;
    case "createdAt_asc":
      orderBy = { createdAt: "asc" };
      break;
    case "createdAt_desc":
      orderBy = { createdAt: "desc" };
      break;
    default:
      orderBy = {};
  }
  const where = {
    category: {
      name: { in: categories.length ? categories : undefined },
    },
    brand: {
      name: { in: brands.length ? brands : undefined },
    },
    colors: {
      some: {
        name: { in: colors.length ? colors : undefined },
      },
    },
    price: {
      gte: minPrice,
      lte: maxPrice,
    },
    name: {
      contains: search,
      mode: "insensitive" as const,
    },
  };
  const prisma = new PrismaClient();

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        images: true,
        brand: true,
        category: true,
        colors: true,
      },
    }),

    prisma.product.count({
      where: {
        category: categories.length ? { name: { in: categories } } : undefined,
        brand: brands.length ? { name: { in: brands } } : undefined,
        colors: colors.length
          ? {
              some: {
                name: { in: colors },
              },
            }
          : undefined,
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    }),
  ]);

  return new Response(
    JSON.stringify({
      products,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
