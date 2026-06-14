import type { QuotationItem, TaxConfig } from '../types';

export function calcItemTotal(item: QuotationItem): number {
  const subtotal = item.quantity * item.unitPrice;
  return subtotal - item.discount;
}

export function calcSubtotal(items: QuotationItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

export function calcTotalDiscount(items: QuotationItem[]): number {
  return items.reduce((sum, item) => sum + item.discount, 0);
}

export function calcTaxAmount(subtotal: number, discountValue: number, discountEnabled: boolean, discountType: 'percentage' | 'amount', tax: TaxConfig): number {
  if (!tax.enabled) return 0;
  let base = subtotal;
  if (discountEnabled) {
    if (discountType === 'percentage') {
      base = subtotal * (1 - discountValue / 100);
    } else {
      base = subtotal - discountValue;
    }
  }
  return base * (tax.rate / 100);
}

export function calcTotal(
  subtotal: number,
  discountEnabled: boolean,
  discountType: 'percentage' | 'amount',
  discountValue: number,
  tax: TaxConfig
): number {
  let base = subtotal;
  if (discountEnabled) {
    if (discountType === 'percentage') {
      base = subtotal * (1 - discountValue / 100);
    } else {
      base = subtotal - discountValue;
    }
  }
  if (tax.enabled) {
    base = base * (1 + tax.rate / 100);
  }
  return base;
}

export function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return new Intl.NumberFormat('es-CL', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + ' ' + currency;
  }
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('es-CL').format(n);
}
