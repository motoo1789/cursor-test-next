import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // ミドルウェアロジックをここに追加できます
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};