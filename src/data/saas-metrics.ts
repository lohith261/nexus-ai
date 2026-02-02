export interface SaasMetrics {
  date: string;
  mrr: number;
  newCustomers: number;
  churnedCustomers: number;
  cac: number;
  nps: number;
  supportTickets: number;
  featureAdoption: number;
}

export const saasMetricsData: SaasMetrics[] = [
  // Generate 24 months of realistic SaaS data
  ...Array.from({ length: 24 }, (_, i) => {
    const date = new Date(2023, i, 1);
    const baseMrr = 50000 + i * 2500;
    const seasonalFactor = 1 + 0.1 * Math.sin((i / 12) * 2 * Math.PI);
    const randomFactor = 0.9 + Math.random() * 0.2;
    
    // October drop scenario
    const octoberDrop = i === 9 ? 0.77 : 1;
    
    return {
      date: date.toISOString().split('T')[0],
      mrr: Math.round(baseMrr * seasonalFactor * randomFactor * octoberDrop),
      newCustomers: Math.round((50 + i * 2) * randomFactor * (i === 9 ? 0.6 : 1)),
      churnedCustomers: Math.round((5 + i * 0.5) * randomFactor),
      cac: Math.round(150 + Math.random() * 50),
      nps: Math.round(40 + Math.random() * 20 + (i === 9 ? -15 : 0)),
      supportTickets: Math.round(100 + i * 3 + Math.random() * 50),
      featureAdoption: Math.round(30 + i * 1.5 + Math.random() * 10),
    };
  }),
];

export const datasetInfo = {
  name: "SaaS Metrics 2023-2024",
  description: "Monthly metrics for a B2B SaaS company",
  rows: 24,
  columns: [
    { name: "date", type: "date", description: "Month" },
    { name: "mrr", type: "number", description: "Monthly Recurring Revenue ($)" },
    { name: "newCustomers", type: "number", description: "New Customer Acquisitions" },
    { name: "churnedCustomers", type: "number", description: "Churned Customers" },
    { name: "cac", type: "number", description: "Customer Acquisition Cost ($)" },
    { name: "nps", type: "number", description: "Net Promoter Score" },
    { name: "supportTickets", type: "number", description: "Support Ticket Volume" },
    { name: "featureAdoption", type: "number", description: "Feature Adoption Rate (%)" },
  ],
};