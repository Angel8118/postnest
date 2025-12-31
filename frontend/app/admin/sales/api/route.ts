import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const transactionDate = searchParams.get("transactionDate");

    return Response.json({ message: `Sales data for date: ${transactionDate}` });
}