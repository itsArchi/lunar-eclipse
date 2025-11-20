import { compare } from "bcryptjs";

export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    try {
        return await compare(password, hashedPassword);
    } catch (error) {
        console.error("Error verifying password:", error);
        return false;
    }
}
