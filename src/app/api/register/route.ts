import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, mobileNumber, password, countryRegion = "Poland" } = body;

    if (!email || !mobileNumber || !password) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { mobileNumber }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email or mobile number already in use." },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        email,
        mobileNumber,
        password: hashedPassword,
        countryRegion,
        role: "USER",
      },
    });

    return NextResponse.json(
      { message: "User created successfully", userId: newUser.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
