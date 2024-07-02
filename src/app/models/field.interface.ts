export interface Field {
    id: number;
    label: string;
    type: string;
    field_values?: Array<{ id: string; value: string; checked?: boolean }>;
    value?: string | null;
  }
  