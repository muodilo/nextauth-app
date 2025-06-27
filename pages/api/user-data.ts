import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

type UserData = {
  fullname: string;
  email: string;
  role: string;
};

const mockedAdmins: UserData[] = [
  {
    fullname: "Alice Admin",
    email: "alice@company.com",
    role: "admin",
  },
  {
    fullname: "Bob Boss",
    email: "bob@company.com",
    role: "admin",
  },
  {
    fullname: "Charlie Chief",
    email: "charlie@company.com",
    role: "admin",
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }

  return res.status(200).json({
    message: "Protected admin users data",
    users: mockedAdmins,
  });
}
