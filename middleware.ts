import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader?.startsWith("Basic ")) {
    const encoded = authHeader.split(" ")[1];
    const decoded = atob(encoded);
    const [username, password] = decoded.split(":");

    if (
      username === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Autenticación requerida", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Area"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};