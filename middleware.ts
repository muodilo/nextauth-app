
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      if (!token) return false;

      if (
        req.nextUrl.pathname.startsWith("/admin") &&
        token.role !== "admin"
      ) {
        return false;
      }

      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
