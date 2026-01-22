import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export type Role = "Desarrollador" | "Admin" | "User";

export type UserRecord = {
  username: string;
  role: Role;
  passwordHash: string;
  permissions: string[];
  createdAt?: unknown;
};

export async function listUsers(): Promise<UserRecord[]> {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map((d) => ({
    username: d.id,
    ...(d.data() as Omit<UserRecord, "username">),
  }));
}

export async function saveUser(user: UserRecord) {
  const ref = doc(db, "users", user.username);
  await setDoc(ref, {
    role: user.role,
    passwordHash: user.passwordHash,
    permissions: user.permissions,
    createdAt: serverTimestamp(),
  });
}
