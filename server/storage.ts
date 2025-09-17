// This tax calculator doesn't require persistent storage
// All calculations are stateless based on input values

export interface IStorage {
  // No storage methods needed for tax calculator
}

export class MemStorage implements IStorage {
  constructor() {
    // Tax calculator is stateless - no storage needed
  }
}

export const storage = new MemStorage();
