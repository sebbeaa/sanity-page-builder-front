import bcrypt from "bcryptjs";
import client from "@/actions/client/client";

export default async function handler(req, res) {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if username exists
  const exists = await client.fetch(
    `*[_type == "user" && username == $username][0]`,
    { username }
  );
  if (exists) {
    return res.status(409).json({ message: "Username already taken" });
  }

  // Create new user
  await client.create({
    _type: "user",
    username,
    password: hashedPassword,
  });

  res.status(201).send("User created");
}
