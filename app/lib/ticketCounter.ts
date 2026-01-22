import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

type CounterDoc = {
  current: number;
  updatedAt?: unknown;
};

/**
 * Obtiene y aumenta el consecutivo de tickets en Firestore.
 * Guarda el valor en counters/tickets y devuelve el nuevo ID formateado.
 */
export async function getNextTicketNumber(): Promise<string> {
  const counterRef = doc(db, "counters", "tickets");

  const nextNumeric = await runTransaction(db, async (tx) => {
    const snap = await tx.get(counterRef);

    if (!snap.exists()) {
      const first = 1;
      tx.set(counterRef, { current: first, updatedAt: serverTimestamp() });
      return first;
    }

    const data = snap.data() as CounterDoc;
    const next = (data.current ?? 0) + 1;
    tx.update(counterRef, { current: next, updatedAt: serverTimestamp() });
    return next;
  });

  return formatTicketNumber(nextNumeric);
}

function formatTicketNumber(value: number): string {
  return `T-${String(value).padStart(6, "0")}`;
}
