"use client";

import { useEffect, useMemo, useState } from "react";
import { listUsers, saveUser, Role, UserRecord } from "@/app/lib/userService";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

const allPermissions = [
  "tickets:read",
  "tickets:write",
  "users:manage",
  "reports:view",
];

async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", enc);
  const bytes = Array.from(new Uint8Array(digest));
  return btoa(String.fromCharCode(...bytes));
}

async function seedDeveloperUser() {
  const username = "ElkinTics";
  const password = "830508";
  const role: Role = "Desarrollador";
  const perm = [
    "tickets:read",
    "tickets:write",
    "users:manage",
    "reports:view",
  ];

  const snap = await getDocs(collection(db, "users"));
  const exists = snap.docs.some((d) => d.id === username);
  if (exists) return;

  const passwordHash = await hashPassword(password);
  await saveUser({ username, role, passwordHash, permissions: perm });
}

export default function UserAdminPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("User");
  const [selectedPerms, setSelectedPerms] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const permArray = useMemo(() => Array.from(selectedPerms), [selectedPerms]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        await seedDeveloperUser();
        const data = await listUsers();
        setUsers(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const togglePerm = (perm: string) => {
    setSelectedPerms((prev) => {
      const next = new Set(prev);
      if (next.has(perm)) next.delete(perm);
      else next.add(perm);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    setLoading(true);
    try {
      const passwordHash = await hashPassword(password);
      await saveUser({ username, role, passwordHash, permissions: permArray });
      const data = await listUsers();
      setUsers(data);
      setUsername("");
      setPassword("");
      setSelectedPerms(new Set());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef1f5] text-gray-800">
      <header className="border-b border-gray-300 bg-[#f3f5f7] shadow-sm">
        <div className="mx-auto flex w-[95%] max-w-7xl flex-col gap-3 px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-gray-500">
                Gestión de usuarios
              </p>
              <h1 className="text-xl font-semibold text-gray-800">
                Roles y permisos
              </h1>
            </div>
            <span className="rounded-sm bg-gray-200 px-2 py-1 text-[12px] font-semibold text-gray-700">
              Roles: Desarrollador / Admin / User
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Crea usuarios, asigna roles y permisos. El usuario "ElkinTics" (rol
            Desarrollador) se crea automáticamente si no existe.
          </p>
        </div>
      </header>

      <main className="mx-auto flex w-[95%] max-w-7xl flex-col gap-6 px-4 py-6">
        <section className="rounded-md border border-gray-300 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm font-semibold text-gray-700">
            Crear / actualizar usuario
          </div>
          <form
            className="grid gap-4 px-4 py-4 sm:grid-cols-2"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-gray-700">
                Usuario
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ej: jdoe"
                className="h-9 rounded-sm border border-gray-300 bg-white px-3 text-[13px] text-gray-800 shadow-[inset_0_1px_0_rgba(0,0,0,0.05)] focus:border-gray-400 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="h-9 rounded-sm border border-gray-300 bg-white px-3 text-[13px] text-gray-800 shadow-[inset_0_1px_0_rgba(0,0,0,0.05)] focus:border-gray-400 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-gray-700">
                Rol
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="h-9 rounded-sm border border-gray-300 bg-white px-3 text-[13px] text-gray-800 shadow-[inset_0_1px_0_rgba(0,0,0,0.05)] focus:border-gray-400 focus:outline-none"
              >
                <option value="Desarrollador">Desarrollador</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="text-[13px] font-semibold text-gray-700">
                Permisos
              </label>
              <div className="flex flex-wrap gap-3 text-[13px] text-gray-700">
                {allPermissions.map((perm) => (
                  <label key={perm} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={selectedPerms.has(perm)}
                      onChange={() => togglePerm(perm)}
                      className="accent-[#38a544]"
                    />
                    {perm}
                  </label>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2 flex justify-end gap-2 pb-1">
              <button
                type="button"
                onClick={() => {
                  setUsername("");
                  setPassword("");
                  setRole("User");
                  setSelectedPerms(new Set());
                }}
                className="rounded-sm border border-gray-300 bg-white px-4 py-2 text-[12px] font-semibold text-gray-700 shadow-sm hover:bg-gray-100"
              >
                Limpiar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-sm bg-[#38a544] px-4 py-2 text-[12px] font-semibold text-white shadow-sm hover:bg-[#2f8c3a] disabled:opacity-60"
              >
                {loading ? "Guardando..." : "Guardar usuario"}
              </button>
            </div>
          </form>
        </section>

        <section className="overflow-hidden rounded-md border border-gray-300 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm font-semibold text-gray-700">
            Usuarios registrados
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead className="bg-[#f8fafc] text-gray-600">
                <tr>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Usuario
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Rol
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Permisos
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <tr
                    key={u.username}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#f7f9fb]"}
                  >
                    <td className="border-b border-gray-200 px-3 py-2 font-semibold text-gray-700">
                      {u.username}
                    </td>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-700">
                      {u.role}
                    </td>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-700">
                      {(u.permissions || []).join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
