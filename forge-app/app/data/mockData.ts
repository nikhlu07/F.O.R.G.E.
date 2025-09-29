import { Statistics, CorruptionAlert, Claim, Budget, Vendor, Challenge } from '../types';

export const statistics: Statistics = {
  corruptionPrevented: 2500000,
  contractsAnalyzed: 1247,
  detectionAccuracy: 85,
  taxpayerMoneySaved: 890000,
  activeInvestigations: 23,
  governmentAgencies: 12
};

export const corruptionAlerts: CorruptionAlert[] = [
  {
    id: 'alert-001',
    type: 'shell-company',
    severity: 'critical',
    amount: 2000000,
    description: '$2M road contract blocked - Shell company detected',
    location: 'Region Alpha',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    status: 'blocked'
  },
  {
    id: 'alert-002',
    type: 'price-inflation',
    severity: 'high',
    amount: 850000,
    description: '$850K school supplies flagged - 40% price inflation',
    location: 'Region Beta',
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    status: 'investigating'
  },
  {
    id: 'alert-003',
    type: 'phantom-project',
    severity: 'high',
    amount: 1500000,
    description: '$1.5M hospital equipment - Citizen challenge filed',
    location: 'Region Gamma',
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
    status: 'investigating'
  },
  {
    id: 'alert-004',
    type: 'bid-rigging',
    severity: 'low',
    amount: 45000,
    description: '$45K IT purchase approved - All integrity checks passed',
    location: 'Region Delta',
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    status: 'resolved'
  },
  {
    id: 'alert-005',
    type: 'bid-rigging',
    severity: 'critical',
    amount: 3000000,
    description: '$3M bridge project - Bid rigging pattern detected',
    location: 'Region Epsilon',
    timestamp: new Date(Date.now() - 1000 * 60 * 32),
    status: 'blocked'
  },
  {
    id: 'alert-006',
    type: 'shell-company',
    severity: 'medium',
    amount: 120000,
    description: '$120K office supplies - Phantom vendor identified',
    location: 'Region Zeta',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    status: 'investigating'
  }
];

export const fraudPatterns = [
  {
    id: 'phantom-projects',
    title: 'Phantom Projects',
    description: 'Projects claimed complete but don\'t exist physically',
    icon: '👻',
    riskLevel: 'critical',
    cases: 45,
    prevented: '$12.5M'
  },
  {
    id: 'price-inflation',
    title: 'Price Inflation',
    description: 'Costs 40%+ above market rate with kickback patterns',
    icon: '📈',
    riskLevel: 'high',
    cases: 89,
    prevented: '$8.9M'
  },
  {
    id: 'shell-companies',
    title: 'Shell Companies',
    description: 'Fake vendors with no business history or real address',
    icon: '🏢',
    riskLevel: 'critical',
    cases: 67,
    prevented: '$15.2M'
  },
  {
    id: 'bid-rigging',
    title: 'Bid Rigging',
    description: 'Coordinated fake competition between colluding vendors',
    icon: '🎯',
    riskLevel: 'high',
    cases: 34,
    prevented: '$6.7M'
  },
  {
    id: 'supply-chain-fraud',
    title: 'Supply Chain Fraud',
    description: 'Payments to non-existent sub-contractors',
    icon: '🔗',
    riskLevel: 'medium',
    cases: 123,
    prevented: '$4.8M'
  },
  {
    id: 'timeline-manipulation',
    title: 'Timeline Manipulation',
    description: 'Claiming completion before actual work delivery',
    icon: '⏰',
    riskLevel: 'medium',
    cases: 76,
    prevented: '$3.1M'
  }
];

export const successStories = [
  {
    id: 'case-001',
    title: 'Ghost Highway Project',
    amount: 1200000,
    description: 'Vendor claimed road construction completion. Citizens reported no road exists. CorruptGuard investigation confirmed fraud.',
    status: 'prevented',
    location: 'Region Alpha',
    method: 'citizen-reporting'
  },
  {
    id: 'case-002',
    title: 'Inflated Medical Supplies',
    amount: 340000,
    description: 'School supplies quoted 60% above market rate. AI detected price manipulation pattern.',
    status: 'prevented',
    location: 'Region Beta',
    method: 'ai-detection'
  },
  {
    id: 'case-003',
    title: 'Phantom Sub-Contractor Scheme',
    amount: 890000,
    description: 'Main contractor claimed payments to 5 sub-contractors. Blockchain analysis revealed 3 were shell companies.',
    status: 'prevented',
    location: 'Region Gamma',
    method: 'blockchain-analysis'
  }
];

export const mockClaims: Claim[] = [
  {
    id: 'claim-001',
    budgetId: 'budget-001',
    vendorId: 'vendor-001',
    amount: 45000,
    description: 'Office supplies and furniture for government building',
    status: 'approved',
    riskLevel: 'low',
    fraudScore: 25,
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    submittedBy: 'vendor-001',
    documents: ['invoice-001.pdf', 'delivery-receipt-001.pdf']
  },
  {
    id: 'claim-002',
    budgetId: 'budget-002',
    vendorId: 'vendor-002',
    amount: 2000000,
    description: 'Road construction project Phase 1',
    status: 'blocked',
    riskLevel: 'critical',
    fraudScore: 85,
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    submittedBy: 'vendor-002',
    documents: ['contract-002.pdf'],
    reviewNotes: 'Shell company detected - no physical address verification'
  },
  {
    id: 'claim-003',
    budgetId: 'budget-003',
    vendorId: 'vendor-003',
    amount: 500000,
    description: 'School building renovation and equipment',
    status: 'under-review',
    riskLevel: 'medium',
    fraudScore: 45,
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    submittedBy: 'vendor-003',
    documents: ['proposal-003.pdf', 'budget-breakdown-003.xlsx']
  }
];

export const mockBudgets: Budget[] = [
  {
    id: 'budget-001',
    totalAmount: 50000000,
    allocatedAmount: 35000000,
    remainingAmount: 15000000,
    purpose: 'Infrastructure Development 2024',
    createdBy: 'gov-001',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    status: 'active'
  },
  {
    id: 'budget-002',
    totalAmount: 25000000,
    allocatedAmount: 18000000,
    remainingAmount: 7000000,
    purpose: 'Education Modernization Program',
    createdBy: 'gov-001',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
    status: 'active'
  }
];

export const mockVendors: Vendor[] = [
  {
    id: 'vendor-001',
    name: 'TechBuild Construction Ltd',
    principal: 'vendor-principal-001',
    status: 'approved',
    registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365),
    completedProjects: 47,
    averageRating: 4.6,
    riskScore: 15,
    address: '123 Industrial Zone, Metropolis A',
    contactEmail: 'contracts@techbuild.com',
    businessType: 'Construction'
  },
  {
    id: 'vendor-002',
    name: 'QuickBuild Solutions',
    principal: 'shell-company-001',
    status: 'suspended',
    registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    completedProjects: 0,
    averageRating: 0,
    riskScore: 95,
    address: 'No physical address found',
    contactEmail: 'fake@quickbuild.fake',
    businessType: 'Unknown'
  },
  {
    id: 'vendor-003',
    name: 'EduTech Supplies Co',
    principal: 'vendor-principal-003',
    status: 'approved',
    registrationDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180),
    completedProjects: 23,
    averageRating: 4.2,
    riskScore: 28,
    address: '456 Business Park, City B',
    contactEmail: 'orders@edutech.com',
    businessType: 'Educational Equipment'
  }
];

export const mockChallenges: Challenge[] = [
  {
    id: 'challenge-001',
    invoiceHash: '0xabc123def456',
    challengerId: 'citizen-001',
    reason: 'Project claimed complete but road does not exist at specified location',
    evidence: ['photo-001.jpg', 'gps-coordinates.txt'],
    stakeAmount: 100,
    status: 'investigating',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    location: {
      lat: 19.0760,
      lng: 72.8777,
      address: 'Claimed Highway Extension, Metropolis A'
    }
  },
  {
    id: 'challenge-002',
    invoiceHash: '0xdef789ghi012',
    challengerId: 'citizen-002',
    reason: 'School equipment never delivered despite payment completion',
    evidence: ['school-visit-video.mp4', 'principal-statement.pdf'],
    stakeAmount: 50,
    status: 'resolved',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    location: {
      lat: 12.9716,
      lng: 77.5946,
      address: 'Government Primary School, City B'
    }
  }
];

export const districtData = {
    districtName: "Mumbai Central",
    stateHead: "Rajesh Kumar",
    allocatedBudget: 5000000,
    spentBudget: 3200000,
    activeProjects: 5,
    pendingClaims: 3
  };

  export const availableVendors = [
    { id: 'vendor-001', name: 'Maharashtra Construction Ltd', rating: 4.2, riskScore: 25 },
    { id: 'vendor-002', name: 'Mumbai Infrastructure Co', rating: 4.7, riskScore: 18 },
    { id: 'vendor-003', name: 'Central Highway Builders', rating: 3.9, riskScore: 45 },
  ];

  export const allocatedProjects = [
    { id: 'alloc-001', project: 'Highway Expansion Phase 2', amount: 2500000, status: 'vendor-selection' },
    { id: 'alloc-002', project: 'School Infrastructure Upgrade', amount: 800000, status: 'in-progress' },
    { id: 'alloc-003', project: 'Hospital Equipment Purchase', amount: 1200000, status: 'planning' },
  ];

  export const pendingClaims = [
    { id: 'claim-001', vendor: 'Maharashtra Construction Ltd', project: 'Highway Expansion', amount: 450000, riskScore: 35, submittedAt: new Date('2024-01-15') },
    { id: 'claim-002', vendor: 'Mumbai Infrastructure Co', project: 'School Upgrade', amount: 280000, riskScore: 22, submittedAt: new Date('2024-01-18') },
    { id: 'claim-003', vendor: 'Metro Development Corp', project: 'Hospital Equipment', amount: 890000, riskScore: 78, submittedAt: new Date('2024-01-20') },
  ];

  export const communityReports = [
    { id: 'report-001', project: 'Highway Expansion', issue: 'Construction quality concerns', priority: 'medium', date: new Date('2024-01-22') },
    { id: 'report-002', project: 'School Upgrade', issue: 'Delayed completion timeline', priority: 'high', date: new Date('2024-01-25') },
  ];

  export const stateData = {
    stateName: "Maharashtra",
    totalBudget: 25000000,
    allocatedBudget: 18500000,
    remainingBudget: 6500000,
    activeProjects: 23,
    deputiesCount: 8,
    averageRiskScore: 32
  };

  export const deputies = [
    { id: 'dep-001', name: 'Rajesh Kumar', district: 'Mumbai Central', projects: 5, performance: 4.2, riskScore: 25 },
    { id: 'dep-002', name: 'Priya Sharma', district: 'Pune East', projects: 3, performance: 4.7, riskScore: 18 },
    { id: 'dep-003', name: 'Amit Patel', district: 'Nagpur North', projects: 4, performance: 3.9, riskScore: 45 },
    { id: 'dep-004', name: 'Sunita Desai', district: 'Nashik South', projects: 6, performance: 4.5, riskScore: 22 }
  ];

  export const pendingAllocations = [
    { id: 'alloc-001', project: 'Highway Extension Phase 2', requestedAmount: 2500000, priority: 'high' },
    { id: 'alloc-002', project: 'School Infrastructure Upgrade', requestedAmount: 800000, priority: 'medium' },
    { id: 'alloc-003', project: 'Hospital Equipment Purchase', requestedAmount: 1200000, priority: 'high' }
  ];

  export const regionalAlerts = [
    { id: 'alert-001', type: 'corruption', description: 'Unusual vendor pattern in Mumbai Central', severity: 'high', deputy: 'Rajesh Kumar' },
    { id: 'alert-002', type: 'budget', description: 'Budget utilization above 90% in Pune East', severity: 'medium', deputy: 'Priya Sharma' },
    { id: 'alert-003', type: 'timeline', description: 'Project delays reported in Nagpur North', severity: 'low', deputy: 'Amit Patel' }
  ];

export function calculateFraudScore(claim: Claim): number {
  let score = 10; // Base score

  // Amount-based scoring
  if (claim.amount > 1000000) score += 40;
  if (claim.amount.toString().endsWith('00000')) score += 30;
  if (claim.amount % 100000 === 0) score += 20;

  // Vendor-based scoring
  const vendor = mockVendors.find(v => v.id === claim.vendorId);
  if (!vendor || vendor.completedProjects === 0) score += 25;

  // Time-based scoring
  const submitHour = claim.submittedAt.getHours();
  if (submitHour < 9 || submitHour > 17) score += 15;

  // Pattern-based scoring
  const vendorClaims = mockClaims.filter(c => c.vendorId === claim.vendorId);
  if (vendorClaims.length > 3) score += 10;

  // Add random variance for demo
  score += Math.floor(Math.random() * 20);

  return Math.min(score, 100);
}

export function getRiskLevel(fraudScore: number): 'low' | 'medium' | 'high' | 'critical' {
  if (fraudScore < 30) return 'low';
  if (fraudScore < 60) return 'medium';
  if (fraudScore < 80) return 'high';
  return 'critical';
}

export function getRiskColor(riskLevel: string): string {
  switch (riskLevel) {
    case 'low': return 'text-emerald-600 bg-emerald-50';
    case 'medium': return 'text-amber-600 bg-amber-50';
    case 'high': return 'text-orange-600 bg-orange-50';
    case 'critical': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export function getRiskIcon(riskLevel: string): string {
  switch (riskLevel) {
    case 'low': return '✅';
    case 'medium': return '⚠️';
    case 'high': return '🚨';
    case 'critical': return '🔴';
    default: return '❓';
  }
}

export const initialTransactions = [
  { id: 'TX001', description: 'Payment for materials', amount: 5000, category: 'Operations', vendor: 'Global Supplies', employee: 'John Doe', time: '2023-10-27T10:00:00Z', location: 'New York' },
  { id: 'TX002', description: 'Consulting fee', amount: 12000, category: 'Services', vendor: 'Innovate LLC', employee: 'Jane Smith', time: '2023-10-27T11:30:00Z', location: 'London' },
  { id: 'TX003', description: 'Software license', amount: 1500, category: 'Software', vendor: 'Tech Solutions', employee: 'John Doe', time: '2023-10-27T14:00:00Z', location: 'New York' },
  { id: 'TX004', description: 'Emergency repairs', amount: 8500, category: 'Maintenance', vendor: 'RapidFix Inc.', employee: 'Peter Jones', time: '2023-10-28T09:00:00Z', location: 'San Francisco' },
  { id: 'TX005', description: 'Personal travel expenses', amount: 3200, category: 'Travel', vendor: 'Airways', employee: 'Jane Smith', time: '2023-10-28T18:45:00Z', location: 'Paris' },
  { id: 'TX006', description: 'Gift for client', amount: 19500, category: 'Miscellaneous', vendor: 'Unknown Vendor', employee: 'Emily White', time: '2023-10-29T15:20:00Z', location: 'New York' },
];

export const vendorWatchlist = ['Unknown Vendor', 'Shady Corp'];
export const suspiciousKeywords = ['personal', 'gift', 'unknown', 'cash advance'];
export const policyLimits: { [key: string]: number } = {
  'Travel': 2000,
  'Miscellaneous': 500,
};

export const vendorData = {
  name: "Stark Industries",
  activeContracts: 3,
  totalEarnings: 12550000,
  riskScore: 5,
};

export const vendorInitialClaims = [
  { id: "0x8c...f9a1", amount: 150000, description: "Milestone 3 Payment", status: "approved" },
  { id: "0x5a...e1b9", amount: 400000, description: "Component Delivery", status: "approved" },
  { id: "0x9f...e4b2", amount: 75000, description: "Material Procurement", status: "pending" },
];