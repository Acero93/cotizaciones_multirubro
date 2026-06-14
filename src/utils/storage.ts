import type { QuotationData } from '../types';

const STORAGE_KEY = 'cotizador_multirubro_data';

export function saveQuotation(data: QuotationData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage not available
  }
}

export function loadQuotation(): QuotationData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as QuotationData;
  } catch {
    return null;
  }
}

export function clearQuotation(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
