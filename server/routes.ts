import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { taxCalculationSchema, TaxResult, TAX_BRACKETS_2024, STANDARD_DEDUCTION_2024 } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Calculate federal tax based on income and filing status
  app.post("/api/calculate-tax", async (req, res) => {
    try {
      const { grossIncome, filingStatus } = taxCalculationSchema.parse(req.body);
      
      const standardDeduction = STANDARD_DEDUCTION_2024[filingStatus];
      const taxableIncome = Math.max(0, grossIncome - standardDeduction);
      
      // Get tax brackets for the filing status
      const brackets = TAX_BRACKETS_2024[filingStatus];
      
      // Calculate federal tax using progressive brackets
      let federalTax = 0;
      let remainingIncome = taxableIncome;
      let applicableBracket = brackets[0];
      
      for (const bracket of brackets) {
        if (remainingIncome <= 0) break;
        
        const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
        federalTax += taxableInBracket * bracket.rate;
        remainingIncome -= taxableInBracket;
        
        // Track the bracket this income falls into
        if (taxableIncome >= bracket.min && taxableIncome < bracket.max) {
          applicableBracket = bracket;
        }
      }
      
      const effectiveRate = grossIncome > 0 ? federalTax / grossIncome : 0;
      const afterTaxIncome = grossIncome - federalTax;
      
      const result: TaxResult = {
        grossIncome,
        filingStatus,
        standardDeduction,
        taxableIncome,
        federalTax,
        effectiveRate,
        afterTaxIncome,
        applicableBracket
      };
      
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
