export interface CustomField {
  id: string;
  label: string;
  value: string;
}

export interface CompanyData {
  name: string;
  logo: string | null;
  address: string;
  phone: string;
  email: string;
  website: string;
  extraFields: CustomField[];
}

export interface ClientData {
  name: string;
  company: string;
  address: string;
  phone: string;
  email: string;
  extraFields: CustomField[];
}

export interface QuotationItem {
  id: string;
  code: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discount: number;
}

export interface TaxConfig {
  enabled: boolean;
  name: string;
  rate: number;
}

export interface CustomSection {
  id: string;
  title: string;
  fields: CustomField[];
}

export interface QuotationData {
  number: string;
  date: string;
  validUntil: string;
  currency: string;
  company: CompanyData;
  client: ClientData;
  items: QuotationItem[];
  tax: TaxConfig;
  discountEnabled: boolean;
  discountType: 'percentage' | 'amount';
  discountValue: number;
  notes: string;
  terms: string;
  customSections: CustomSection[];
}

export const DEFAULT_COMPANY: CompanyData = {
  name: '',
  logo: null,
  address: '',
  phone: '',
  email: '',
  website: '',
  extraFields: [],
};

export const DEFAULT_CLIENT: ClientData = {
  name: '',
  company: '',
  address: '',
  phone: '',
  email: '',
  extraFields: [],
};

export const DEFAULT_TAX: TaxConfig = {
  enabled: true,
  name: 'IVA',
  rate: 19,
};

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

export function createEmptyItem(): QuotationItem {
  return {
    id: generateId(),
    code: '',
    description: '',
    quantity: 1,
    unit: 'un',
    unitPrice: 0,
    discount: 0,
  };
}

export function getDefaultQuotation(): QuotationData {
  const today = new Date().toISOString().split('T')[0];
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  return {
    number: `COT-${Date.now().toString(36).toUpperCase()}`,
    date: today,
    validUntil: nextMonth.toISOString().split('T')[0],
    currency: 'CLP',
    company: { ...DEFAULT_COMPANY, extraFields: [] },
    client: { ...DEFAULT_CLIENT, extraFields: [] },
    items: [createEmptyItem()],
    tax: { ...DEFAULT_TAX },
    discountEnabled: false,
    discountType: 'percentage',
    discountValue: 0,
    notes: '',
    terms: '',
    customSections: [],
  };
}
