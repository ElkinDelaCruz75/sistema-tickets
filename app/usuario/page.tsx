const statusStyles: Record<string, string> = {
  Abierto: "bg-blue-50 text-blue-700 border border-blue-200",
  "En curso": "bg-amber-50 text-amber-700 border border-amber-200",
  Cerrado: "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

const historial = [
  {
    id: "INC-2081",
    asunto: "No puedo ingresar a VPN",
    categoria: "Acceso remoto",
    prioridad: "Alta",
    creado: "18/04/2025 08:32",
    actualizado: "18/04/2025 09:10",
    estado: "En curso" as const,
  },
  {
    id: "INC-2078",
    asunto: "Correo rebota al enviar a clientes",
    categoria: "Correo",
    prioridad: "Media",
    creado: "17/04/2025 15:12",
    actualizado: "18/04/2025 07:45",
    estado: "Abierto" as const,
  },
  {
    id: "INC-2065",
    asunto: "Actualización de software de punto de venta",
    categoria: "Aplicaciones",
    prioridad: "Baja",
    creado: "12/04/2025 10:01",
    actualizado: "14/04/2025 18:33",
    estado: "Cerrado" as const,
  },
];

export default function UsuarioTickets() {
  return (
    <div className="min-h-screen bg-[#eef1f5] text-gray-800">
      <header className="border-b border-gray-300 bg-[#f3f5f7] shadow-sm">
        <div className="mx-auto flex w-[95%] max-w-6xl flex-col gap-3 px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-gray-500">
                Portal de usuario
              </p>
              <h1 className="text-xl font-semibold text-gray-800">
                Mis tickets
              </h1>
            </div>
            <button className="rounded-sm bg-[#38a544] px-4 py-2 text-[12px] font-semibold text-white shadow-sm hover:bg-[#2f8c3a]">
              + Crear ticket
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Registra nuevas solicitudes y consulta el historial con su estado
            actual.
          </p>
        </div>
      </header>

      <main className="mx-auto flex w-[95%] max-w-6xl flex-col gap-6 px-4 py-6">
        <section className="rounded-md border border-gray-300 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm font-semibold text-gray-700">
            Crear un nuevo ticket
          </div>
          <div className="grid gap-4 px-4 py-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-gray-700">
                Asunto
              </label>
              <input
                type="text"
                placeholder="Ej: No puedo conectarme al WiFi"
                className="h-9 rounded-sm border border-gray-300 bg-white px-3 text-[13px] text-gray-800 shadow-[inset_0_1px_0_rgba(0,0,0,0.05)] focus:border-gray-400 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-gray-700">
                Categoría
              </label>
              <select className="h-9 rounded-sm border border-gray-300 bg-white px-3 text-[13px] text-gray-800 shadow-[inset_0_1px_0_rgba(0,0,0,0.05)] focus:border-gray-400 focus:outline-none">
                <option>Acceso remoto</option>
                <option>Red / WiFi</option>
                <option>Correo</option>
                <option>Hardware</option>
                <option>Aplicaciones</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-gray-700">
                Prioridad
              </label>
              <div className="flex gap-3 text-[13px] text-gray-700">
                {["Baja", "Media", "Alta", "Crítica"].map((p) => (
                  <label key={p} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="prioridad"
                      className="accent-[#38a544]"
                    />
                    {p}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-gray-700">
                Adjuntar evidencia
              </label>
              <input
                type="file"
                className="text-[13px] text-gray-700 file:mr-3 file:rounded-sm file:border-0 file:bg-[#e2e6ea] file:px-3 file:py-2 file:text-[12px] file:font-semibold file:text-gray-800"
              />
            </div>
            <div className="sm:col-span-2 flex flex-col gap-2">
              <label className="text-[13px] font-semibold text-gray-700">
                Descripción
              </label>
              <textarea
                rows={3}
                placeholder="Describe el problema, cuándo empezó y si afecta a más usuarios"
                className="rounded-sm border border-gray-300 bg-white px-3 py-2 text-[13px] text-gray-800 shadow-[inset_0_1px_0_rgba(0,0,0,0.05)] focus:border-gray-400 focus:outline-none"
              />
            </div>
            <div className="sm:col-span-2 flex justify-end gap-2 pb-1">
              <button className="rounded-sm border border-gray-300 bg-white px-4 py-2 text-[12px] font-semibold text-gray-700 shadow-sm hover:bg-gray-100">
                Cancelar
              </button>
              <button className="rounded-sm bg-[#38a544] px-4 py-2 text-[12px] font-semibold text-white shadow-sm hover:bg-[#2f8c3a]">
                Enviar ticket
              </button>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-md border border-gray-300 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm font-semibold text-gray-700">
            Historial de tickets
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead className="bg-[#f8fafc] text-gray-600">
                <tr>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Ticket
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Asunto
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Categoría
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Prioridad
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Creado
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Actualizado
                  </th>
                  <th className="border-b border-gray-300 px-3 py-2 text-left font-semibold">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {historial.map((t, idx) => (
                  <tr
                    key={t.id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#f7f9fb]"}
                  >
                    <td className="border-b border-gray-200 px-3 py-2 font-semibold text-gray-700">
                      {t.id}
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
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-700">
                      {t.creado}
                    </td>
                    <td className="border-b border-gray-200 px-3 py-2 text-gray-700">
                      {t.actualizado}
                    </td>
                    <td className="border-b border-gray-200 px-3 py-2">
                      <span
                        className={`rounded-sm px-2 py-1 text-[12px] font-semibold ${statusStyles[t.estado]}`}
                      >
                        {t.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 bg-[#f8fafc] px-3 py-2 text-[12px] text-gray-600">
            <span>Mostrando (1 a {historial.length})</span>
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
        </section>
      </main>
    </div>
  );
}
