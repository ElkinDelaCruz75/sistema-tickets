"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./lib/firebase";
const statusStyles: Record<string, string> = {
  Abierto: "bg-blue-50 text-blue-700 border border-blue-200",
  "En curso": "bg-amber-50 text-amber-700 border border-amber-200",
  Cerrado: "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

type Ticket = {
  id: string;
  solicitante: string;
  numero: string;
  asunto: string;
  categoria: string;
  prioridad: "Alta" | "Media" | "Baja";
  estado: keyof typeof statusStyles;
  creacion: string;
  finalizacion: string;
};

const mockTickets: Ticket[] = [
  {
    id: "T-000541",
    solicitante: "Ana Ríos",
    numero: "T-000541",
    asunto: "Falla impresora piso 3",
    categoria: "Hardware",
    prioridad: "Media",
    estado: "En curso",
    creacion: "03/04/2025 08:25:40",
    finalizacion: "—",
  },
  {
    id: "T-000540",
    solicitante: "Carlos Méndez",
    numero: "T-000540",
    asunto: "Acceso VPN intermitente",
    categoria: "Red / VPN",
    prioridad: "Alta",
    estado: "Abierto",
    creacion: "03/04/2025 07:10:12",
    finalizacion: "—",
  },
  {
    id: "T-000538",
    solicitante: "Laura Pérez",
    numero: "T-000538",
    asunto: "Error al facturar en POS",
    categoria: "Aplicaciones",
    prioridad: "Alta",
    estado: "Cerrado",
    creacion: "02/04/2025 16:32:08",
    finalizacion: "03/04/2025 09:11:44",
  },
  {
    id: "T-000537",
    solicitante: "David Torres",
    numero: "T-000537",
    asunto: "Correo rebota a clientes",
    categoria: "Correo",
    prioridad: "Media",
    estado: "Cerrado",
    creacion: "02/04/2025 11:05:09",
    finalizacion: "02/04/2025 17:45:30",
  },
  {
    id: "T-000533",
    solicitante: "María Suárez",
    numero: "T-000533",
    asunto: "Alta de usuario SAP",
    categoria: "Aplicaciones",
    prioridad: "Baja",
    estado: "En curso",
    creacion: "01/04/2025 09:20:55",
    finalizacion: "—",
  },
];

export default function Home() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);

  useEffect(() => {
    async function loadTickets() {
      try {
        const snapshot = await getDocs(collection(db, "tickets"));
        const docs = snapshot.docs.map((d) => {
          const data = d.data() as Partial<Ticket>;
          return {
            id: d.id,
            solicitante: data.solicitante ?? "",
            numero: data.numero ?? d.id,
            asunto: data.asunto ?? "",
            categoria: data.categoria ?? "",
            prioridad: (data.prioridad as Ticket["prioridad"]) ?? "Media",
            estado: (data.estado as Ticket["estado"]) ?? "Abierto",
            creacion: data.creacion ?? "",
            finalizacion: data.finalizacion ?? "—",
          } satisfies Ticket;
        });

        if (docs.length) {
          setTickets(docs);
        }
      } catch (err) {
        console.error("Error cargando tickets", err);
      }
    }

    loadTickets();
  }, []);

  return (
    <div className="min-h-screen bg-[#eef1f5] text-gray-800">
      <header className="border-b border-gray-300 bg-[#f3f5f7] shadow-sm">
        <div className="mx-auto flex w-[95%] max-w-7xl flex-col gap-3 px-4 py-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-700">
            <span>Espacios de Trabajo:</span>
            <select className="h-8 rounded-sm border border-gray-300 bg-white px-2 text-[13px] shadow-[inset_0_1px_0_rgba(0,0,0,0.06)]">
              <option>TICS_SOPORTE</option>
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[13px] text-gray-700">
            <div className="flex items-center gap-2 font-semibold">
              <span>RESPONSABLES</span>
              <select className="h-8 rounded-sm border border-gray-300 bg-white px-2 shadow-[inset_0_1px_0_rgba(0,0,0,0.06)]">
                <option>Elkin De la Cruz</option>
              </select>
              <select className="h-8 rounded-sm border border-gray-300 bg-white px-2 shadow-[inset_0_1px_0_rgba(0,0,0,0.06)]">
                <option>977 + Tareas</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-sm border border-gray-300 bg-white px-3 py-1 text-[12px] font-semibold text-gray-700 shadow-sm hover:bg-gray-100">
                <span className="text-lg leading-none text-gray-500">＋</span>
                AGREGAR FILTRO
              </button>
              <button className="flex items-center gap-2 rounded-sm border border-gray-300 bg-white px-3 py-1 text-[12px] font-semibold text-gray-700 shadow-sm hover:bg-gray-100">
                🔍 BUSCAR
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[13px] text-gray-700">
            <button className="flex items-center gap-2 rounded-sm bg-[#38a544] px-4 py-2 text-[12px] font-semibold text-white shadow-sm hover:bg-[#2f8c3a]">
              ▶ INICIAR PROCESO
            </button>
            <span className="text-gray-500">Bandeja de tareas</span>
          </div>
        </div>
      </header>

      <main className="mx-auto w-[95%] max-w-7xl px-4 py-6">
        <div className="overflow-hidden rounded-md border border-gray-300 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead className="bg-[#f8fafc] text-gray-600">
                <tr>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Nombre del solicitante
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Numero del ticket
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Asunto
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Categoria
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Prioridad
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Estado
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Fecha de creacion (fecha y hora)
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Fecha de Finalizacion (fecha y hora)
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Accion
                  </th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t, idx) => (
                  <tr
                    key={t.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#f7f9fb]"}
                  >
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-800">
                      {t.solicitante}
                    </td>
                    <td className="border-b border-gray-200 px-3 py-2">
                      <span className="font-semibold text-gray-700">
                        {t.numero}
                      </span>
                    </td>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-800">
                      {t.asunto}
                    </td>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-700">
                      {t.categoria}
                    </td>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-700">
                      {t.prioridad}
                    </td>
                    <td className="border-b border-gray-200 px-3 py-2">
                      <span
                        className={`rounded-sm px-2 py-1 text-[12px] font-semibold ${statusStyles[t.estado]}`}
                      >
                        {t.estado}
                      </span>
                    </td>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-700">
                      {t.creacion}
                    </td>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-700">
                      {t.finalizacion}
                    </td>
                    <td className="border-b border-gray-200 px-3 py-2">
                      <button className="rounded-sm border border-gray-300 bg-white px-3 py-1 text-[12px] font-semibold text-gray-700 shadow-sm hover:bg-gray-100">
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 bg-[#f8fafc] px-3 py-2 text-[12px] text-gray-600">
            <span>Mostrando (1 a {tickets.length}) de 58</span>
            <div className="flex items-center gap-2 text-gray-500">
              <button className="rounded-sm border border-gray-300 bg-white px-2 py-1 shadow-sm hover:bg-gray-100">
                ◀
              </button>
              <span className="font-semibold text-gray-700">1</span>
              <button className="rounded-sm border border-gray-300 bg-white px-2 py-1 shadow-sm hover:bg-gray-100">
                ▶
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
