import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react';
import {
  type QuotationData,
  type QuotationItem,
  type TaxConfig,
  getDefaultQuotation,
  generateId,
  createEmptyItem,
} from '../types';

type Action =
  | { type: 'SET_QUOTATION'; payload: QuotationData }
  | { type: 'RESET' }
  | { type: 'SET_FIELD'; field: keyof QuotationData; value: unknown }
  | { type: 'SET_COMPANY_FIELD'; field: string; value: string }
  | { type: 'SET_COMPANY_LOGO'; logo: string | null }
  | { type: 'ADD_COMPANY_EXTRA_FIELD' }
  | { type: 'REMOVE_COMPANY_EXTRA_FIELD'; id: string }
  | { type: 'UPDATE_COMPANY_EXTRA_FIELD'; id: string; label: string; value: string }
  | { type: 'SET_CLIENT_FIELD'; field: string; value: string }
  | { type: 'ADD_CLIENT_EXTRA_FIELD' }
  | { type: 'REMOVE_CLIENT_EXTRA_FIELD'; id: string }
  | { type: 'UPDATE_CLIENT_EXTRA_FIELD'; id: string; label: string; value: string }
  | { type: 'ADD_ITEM' }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'UPDATE_ITEM'; id: string; field: keyof QuotationItem; value: string | number }
  | { type: 'SET_TAX'; tax: TaxConfig }
  | { type: 'SET_DISCOUNT'; enabled: boolean; discountType: 'percentage' | 'amount'; value: number }
  | { type: 'ADD_CUSTOM_SECTION' }
  | { type: 'REMOVE_CUSTOM_SECTION'; id: string }
  | { type: 'UPDATE_CUSTOM_SECTION_TITLE'; id: string; title: string }
  | { type: 'ADD_CUSTOM_SECTION_FIELD'; sectionId: string }
  | { type: 'REMOVE_CUSTOM_SECTION_FIELD'; sectionId: string; fieldId: string }
  | { type: 'UPDATE_CUSTOM_SECTION_FIELD'; sectionId: string; fieldId: string; label: string; value: string };

function reducer(state: QuotationData, action: Action): QuotationData {
  switch (action.type) {
    case 'SET_QUOTATION':
      return action.payload;
    case 'RESET':
      return getDefaultQuotation();
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_COMPANY_FIELD':
      return { ...state, company: { ...state.company, [action.field]: action.value } };
    case 'SET_COMPANY_LOGO':
      return { ...state, company: { ...state.company, logo: action.logo } };
    case 'ADD_COMPANY_EXTRA_FIELD':
      return {
        ...state,
        company: {
          ...state.company,
          extraFields: [...state.company.extraFields, { id: generateId(), label: '', value: '' }],
        },
      };
    case 'REMOVE_COMPANY_EXTRA_FIELD':
      return {
        ...state,
        company: {
          ...state.company,
          extraFields: state.company.extraFields.filter((f) => f.id !== action.id),
        },
      };
    case 'UPDATE_COMPANY_EXTRA_FIELD':
      return {
        ...state,
        company: {
          ...state.company,
          extraFields: state.company.extraFields.map((f) =>
            f.id === action.id ? { ...f, label: action.label, value: action.value } : f
          ),
        },
      };
    case 'SET_CLIENT_FIELD':
      return { ...state, client: { ...state.client, [action.field]: action.value } };
    case 'ADD_CLIENT_EXTRA_FIELD':
      return {
        ...state,
        client: {
          ...state.client,
          extraFields: [...state.client.extraFields, { id: generateId(), label: '', value: '' }],
        },
      };
    case 'REMOVE_CLIENT_EXTRA_FIELD':
      return {
        ...state,
        client: {
          ...state.client,
          extraFields: state.client.extraFields.filter((f) => f.id !== action.id),
        },
      };
    case 'UPDATE_CLIENT_EXTRA_FIELD':
      return {
        ...state,
        client: {
          ...state.client,
          extraFields: state.client.extraFields.map((f) =>
            f.id === action.id ? { ...f, label: action.label, value: action.value } : f
          ),
        },
      };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, createEmptyItem()] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, [action.field]: action.value } : i
        ),
      };
    case 'SET_TAX':
      return { ...state, tax: action.tax };
    case 'SET_DISCOUNT':
      return {
        ...state,
        discountEnabled: action.enabled,
        discountType: action.discountType,
        discountValue: action.value,
      };
    case 'ADD_CUSTOM_SECTION':
      return {
        ...state,
        customSections: [
          ...state.customSections,
          { id: generateId(), title: '', fields: [] },
        ],
      };
    case 'REMOVE_CUSTOM_SECTION':
      return {
        ...state,
        customSections: state.customSections.filter((s) => s.id !== action.id),
      };
    case 'UPDATE_CUSTOM_SECTION_TITLE':
      return {
        ...state,
        customSections: state.customSections.map((s) =>
          s.id === action.id ? { ...s, title: action.title } : s
        ),
      };
    case 'ADD_CUSTOM_SECTION_FIELD':
      return {
        ...state,
        customSections: state.customSections.map((s) =>
          s.id === action.sectionId
            ? { ...s, fields: [...s.fields, { id: generateId(), label: '', value: '' }] }
            : s
        ),
      };
    case 'REMOVE_CUSTOM_SECTION_FIELD':
      return {
        ...state,
        customSections: state.customSections.map((s) =>
          s.id === action.sectionId
            ? { ...s, fields: s.fields.filter((f) => f.id !== action.fieldId) }
            : s
        ),
      };
    case 'UPDATE_CUSTOM_SECTION_FIELD':
      return {
        ...state,
        customSections: state.customSections.map((s) =>
          s.id === action.sectionId
            ? {
                ...s,
                fields: s.fields.map((f) =>
                  f.id === action.fieldId
                    ? { ...f, label: action.label, value: action.value }
                    : f
                ),
              }
            : s
        ),
      };
    default:
      return state;
  }
}

interface QuotationContextType {
  data: QuotationData;
  dispatch: Dispatch<Action>;
}

const QuotationContext = createContext<QuotationContextType | null>(null);

export function QuotationProvider({ children }: { children: ReactNode }) {
  const [data, dispatch] = useReducer(reducer, null, getDefaultQuotation);

  return (
    <QuotationContext.Provider value={{ data, dispatch }}>
      {children}
    </QuotationContext.Provider>
  );
}

export function useQuotation() {
  const ctx = useContext(QuotationContext);
  if (!ctx) throw new Error('useQuotation must be used within QuotationProvider');
  return ctx;
}
