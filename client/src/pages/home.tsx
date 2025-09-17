import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { TaxResult, TAX_BRACKETS_2024, STANDARD_DEDUCTION_2024 } from "@shared/schema";
import { DollarSign, Calculator, Info, BarChart2, AlertTriangle } from "lucide-react";

export default function Home() {
  const [income, setIncome] = useState("");
  const [taxResult, setTaxResult] = useState<TaxResult | null>(null);
  const [inputError, setInputError] = useState("");
  const { toast } = useToast();

  const calculateTaxMutation = useMutation({
    mutationFn: async (grossIncome: number) => {
      const response = await apiRequest("POST", "/api/calculate-tax", { grossIncome });
      return response.json() as Promise<TaxResult>;
    },
    onSuccess: (result) => {
      setTaxResult(result);
      setInputError("");
    },
    onError: (error: any) => {
      toast({
        title: "Calculation Error",
        description: error.message || "Failed to calculate tax. Please try again.",
        variant: "destructive",
      });
    },
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    return (rate * 100).toFixed(1) + '%';
  };

  const formatInputValue = (value: string) => {
    // Preserve minus sign and remove other non-numeric characters except commas and periods
    let cleanValue = value.replace(/[^\d,.-]/g, '');
    
    // Only allow one minus sign at the beginning
    if (cleanValue.includes('-')) {
      const parts = cleanValue.split('-');
      if (parts[0] === '') {
        // Minus sign at beginning
        cleanValue = '-' + parts.slice(1).join('');
      } else {
        // Minus sign elsewhere, remove it
        cleanValue = parts.join('');
      }
    }
    
    // Format with commas only for positive numbers
    if (cleanValue && !cleanValue.startsWith('-')) {
      const numericValue = parseFloat(cleanValue.replace(/,/g, ''));
      if (!isNaN(numericValue)) {
        return numericValue.toLocaleString('en-US');
      }
    }
    
    return cleanValue;
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatInputValue(e.target.value);
    setIncome(formattedValue);
    setInputError("");
  };

  const validateAndCalculate = () => {
    const numericIncome = parseFloat(income.replace(/,/g, ''));
    
    if (isNaN(numericIncome)) {
      setInputError("Please enter a valid income amount");
      return;
    }
    
    if (numericIncome < 0) {
      setInputError("Income amount cannot be negative");
      return;
    }
    
    if (numericIncome === 0) {
      setInputError("Please enter an income amount greater than 0");
      return;
    }
    
    if (numericIncome > 10000000) {
      setInputError("Income amount seems unusually high");
      return;
    }

    calculateTaxMutation.mutate(numericIncome);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      validateAndCalculate();
    }
  };

  const isBracketActive = (bracket: typeof TAX_BRACKETS_2024[0]) => {
    if (!taxResult) return false;
    return taxResult.taxableIncome >= bracket.min && taxResult.taxableIncome < bracket.max;
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-sans text-foreground mb-2">
            US Income Tax Calculator
          </h1>
          <p className="text-lg text-muted-foreground font-sans">
            Calculate your 2024 federal income tax based on gross annual income
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Income Input Card */}
            <Card className="bg-card rounded-lg border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-card-foreground font-sans">Annual Income</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="grossIncome" className="block text-sm font-medium text-card-foreground mb-2">
                      Gross Annual Income
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        type="text"
                        id="grossIncome"
                        data-testid="input-gross-income"
                        value={income}
                        onChange={handleIncomeChange}
                        onKeyPress={handleKeyPress}
                        className="w-full pl-8 pr-4 py-3 bg-input border border-border rounded-lg text-card-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                        placeholder="75,000"
                      />
                    </div>
                    {inputError && (
                      <div className="mt-2 text-sm text-destructive" data-testid="text-income-error">
                        {inputError}
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={validateAndCalculate}
                    disabled={calculateTaxMutation.isPending}
                    data-testid="button-calculate-tax"
                    className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
                  >
                    {calculateTaxMutation.isPending ? "Calculating..." : "Calculate Tax"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Standard Deduction Info */}
            <Card className="bg-card rounded-lg border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Info className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground font-sans">Standard Deduction 2024</h3>
                </div>
                
                <div className="space-y-3 text-sm text-card-foreground">
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Single Filer</span>
                    <span className="font-medium">{formatCurrency(STANDARD_DEDUCTION_2024.single)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Married Filing Jointly</span>
                    <span className="font-medium">{formatCurrency(STANDARD_DEDUCTION_2024.marriedFilingJointly)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Head of Household</span>
                    <span className="font-medium">{formatCurrency(STANDARD_DEDUCTION_2024.headOfHousehold)}</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    This calculator uses the standard deduction for single filers ({formatCurrency(STANDARD_DEDUCTION_2024.single)}) by default.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Tax Results Card */}
            <Card className="bg-card rounded-lg border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Calculator className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-card-foreground font-sans">Tax Calculation Results</h2>
                </div>

                {taxResult ? (
                  <>
                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 gap-4 mb-6">
                      <div className="bg-muted rounded-lg p-4">
                        <div className="text-sm text-muted-foreground mb-1">Federal Tax Owed</div>
                        <div className="text-2xl font-bold text-card-foreground" data-testid="text-tax-owed">
                          {formatCurrency(taxResult.federalTax)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">Effective Tax Rate</div>
                          <div className="text-xl font-bold text-card-foreground" data-testid="text-effective-rate">
                            {formatPercentage(taxResult.effectiveRate)}
                          </div>
                        </div>
                        <div className="bg-muted rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">After-Tax Income</div>
                          <div className="text-xl font-bold text-card-foreground" data-testid="text-after-tax-income">
                            {formatCurrency(taxResult.afterTaxIncome)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Income Breakdown */}
                    <div className="space-y-3 pt-4 border-t border-border">
                      <h3 className="font-medium text-card-foreground mb-3">Income Breakdown</h3>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Gross Income</span>
                        <span className="font-medium text-card-foreground" data-testid="text-gross-income">
                          {formatCurrency(taxResult.grossIncome)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Standard Deduction</span>
                        <span className="font-medium text-card-foreground" data-testid="text-standard-deduction">
                          -{formatCurrency(taxResult.standardDeduction)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm pt-2 border-t border-border/50">
                        <span className="text-muted-foreground">Taxable Income</span>
                        <span className="font-medium text-card-foreground" data-testid="text-taxable-income">
                          {formatCurrency(taxResult.taxableIncome)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Enter your gross annual income above to see your tax calculation results.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tax Brackets Card */}
            <Card className="bg-card rounded-lg border border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                    <BarChart2 className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground font-sans">2024 Federal Tax Brackets</h3>
                </div>
                
                <div className="space-y-3">
                  {TAX_BRACKETS_2024.map((bracket, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center py-2 text-sm border-b border-border/30 ${
                        isBracketActive(bracket) 
                          ? 'bg-accent/10 -mx-3 px-3 rounded' 
                          : ''
                      }`}
                      data-testid={`row-tax-bracket-${index}`}
                    >
                      <span className={isBracketActive(bracket) ? "text-accent-foreground font-medium" : "text-muted-foreground"}>
                        {formatPercentage(bracket.rate)}
                      </span>
                      <span className={`font-medium ${isBracketActive(bracket) ? "text-accent-foreground" : "text-card-foreground"}`}>
                        {formatCurrency(bracket.min)} - {bracket.max === Infinity ? '∞' : formatCurrency(bracket.max)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    These are marginal tax rates for single filers. Your highlighted bracket shows where your taxable income falls.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Disclaimer Section */}
        <Card className="mt-12 bg-card rounded-lg border border-border">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-destructive/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <AlertTriangle className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-card-foreground font-sans mb-2">Important Disclaimer</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    This calculator provides estimates for federal income tax only and is intended for educational purposes. 
                    It does not include state taxes, FICA taxes (Social Security and Medicare), or other deductions you may be eligible for.
                  </p>
                  <p>
                    Actual tax calculations may vary based on your complete financial situation, filing status, and available deductions. 
                    Please consult a tax professional or use official IRS tools for accurate tax planning and preparation.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
