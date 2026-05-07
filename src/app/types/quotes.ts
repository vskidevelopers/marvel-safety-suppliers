export interface QuoteData {
  id?: string;
  companyName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  location?: string;
  items?: string;
  estimatedQuantity?: string;
  deliveryDate?: string;
  notes?: string;
  status?: "pending" | "contacted" | "quoted" | "converted" | "archived";
  submittedAt?: any;
  updatedAt?: any;
}
