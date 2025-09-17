import { z } from "zod";

export const taxCalculationSchema = z.object({
  grossIncome: z.number().min(1, "Income must be greater than 0").max(10000000, "Income amount seems unusually high"),
});

export type TaxCalculation = z.infer<typeof taxCalculationSchema>;

export interface TaxResult {
  grossIncome: number;
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

export const TAX_BRACKETS_2024 = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191050, rate: 0.24 },
  { min: 191050, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 }
];

export const STANDARD_DEDUCTION_2024 = {
  single: 14600,
  marriedFilingJointly: 29200,
  headOfHousehold: 21900
};
