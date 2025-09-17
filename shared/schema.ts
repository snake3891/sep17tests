import { z } from "zod";

export const FILING_STATUSES = [
  "single",
  "marriedFilingJointly", 
  "marriedFilingSeparately",
  "headOfHousehold"
] as const;

export type FilingStatus = typeof FILING_STATUSES[number];

export const taxCalculationSchema = z.object({
  grossIncome: z.number().min(1, "Income must be greater than 0").max(10000000, "Income amount seems unusually high"),
  filingStatus: z.enum(FILING_STATUSES),
});

export type TaxCalculation = z.infer<typeof taxCalculationSchema>;

export interface TaxResult {
  grossIncome: number;
  filingStatus: FilingStatus;
  standardDeduction: number;
  taxableIncome: number;
  federalTax: number;
  effectiveRate: number;
  afterTaxIncome: number;
  applicableBracket: {
    rate: number;
    min: number;
    max: number;
  };
}

export const TAX_BRACKETS_2024 = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191050, rate: 0.24 },
    { min: 191050, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 }
  ],
  marriedFilingJointly: [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 }
  ],
  marriedFilingSeparately: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 365600, rate: 0.35 },
    { min: 365600, max: Infinity, rate: 0.37 }
  ],
  headOfHousehold: [
    { min: 0, max: 16550, rate: 0.10 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191050, rate: 0.24 },
    { min: 191050, max: 243700, rate: 0.32 },
    { min: 243700, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 }
  ]
};

export const STANDARD_DEDUCTION_2024 = {
  single: 14600,
  marriedFilingJointly: 29200,
  marriedFilingSeparately: 14600,
  headOfHousehold: 21900
};

export const FILING_STATUS_LABELS = {
  single: "Single",
  marriedFilingJointly: "Married Filing Jointly",
  marriedFilingSeparately: "Married Filing Separately", 
  headOfHousehold: "Head of Household"
} as const;
