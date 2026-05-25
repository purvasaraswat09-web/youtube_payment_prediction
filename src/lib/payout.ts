export interface BonusTier {
  minViews: number;
  bonus: number;
}

export const BONUS_TIERS: BonusTier[] = [
  { minViews: 0, bonus: 0 },
  { minViews: 25000, bonus: 50 },
  { minViews: 50000, bonus: 100 },
  { minViews: 75000, bonus: 150 },
  { minViews: 1000000, bonus: 200 },
];

/**
 * Calculates payout based on views and bonus tiers.
 * Formula: (Views * 0.004) + XLOOKUP(Views, Tiers, Bonus, -1)
 */
export function calculatePayout(views: number): number {
  const basePay = views * 0.004;
  
  // Find the highest tier where views >= minViews (Lookup behavior)
  let applicableBonus = 0;
  for (let i = BONUS_TIERS.length - 1; i >= 0; i--) {
    if (views >= BONUS_TIERS[i].minViews) {
      applicableBonus = BONUS_TIERS[i].bonus;
      break;
    }
  }
  
  return Number((basePay + applicableBonus).toFixed(2));
}

export function isFrozen(uploadDate: string | Date): boolean {
  const upload = new Date(uploadDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - upload.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 10;
}
