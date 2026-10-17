/**
 * Benchmark Datasets for Live Demonstration & SETU 2026 Evaluation
 * PS-01 ScamSpotter
 */

export const BENCHMARKS_DATA = [
  {
    id: 'sbi-kyc-official',
    title: 'Official SBI KYC Scam Test',
    tag: 'Official Benchmark',
    badge: '100/100 HIGH RISK',
    badgeClass: 'badge-high',
    sender: 'AD-SBIINB',
    message: 'SBI ALERT: Your KYC is incomplete and your account will be blocked today. Update immediately at http://sbi-kyc-update.example/verify and share the OTP you receive to confirm.',
    notes: 'Slide 6 Walkthrough: Matches SETU 2026 Problem Statement. Triggers Urgency (+20), Account Threat (+15), Suspicious Lookalike Link (+25), and OTP Credential Trap (+40).'
  },
  {
    id: 'college-notice-safe',
    title: 'College Notice (False Positive Test)',
    tag: 'Slide 9 Guardrail Test',
    badge: '0/100 SAFE (LOW RISK)',
    badgeClass: 'badge-safe',
    sender: 'COLLEGE-DEAN',
    message: 'College Notice: Tomorrow\'s lecture on Operating Systems is rescheduled to 11 AM in Room 302. Submit your assignment to Prof. Gupta.',
    notes: 'Slide 9 Tested Proof: Contains normal academic urgency keywords without threats or links. Evaluates to 0/100 SAFE.'
  },
  {
    id: 'bank-legitimate-otp',
    title: 'Legitimate Bank Alert (Negation Test)',
    tag: 'Negation Parsing Test',
    badge: '0/100 SAFE (LOW RISK)',
    badgeClass: 'badge-safe',
    sender: 'AD-SBIINB',
    message: 'SBI: OTP for netbanking transaction of Rs 1,450 is 492018. Valid for 10 mins. Do NOT share OTP with anyone. Bank never asks for OTP or PIN.',
    notes: 'Slide 9 Guardrail: Negation clause ("Do NOT share OTP") is parsed so legitimate banking SMS is never falsely flagged.'
  },
  {
    id: 'electricity-bill-scam',
    title: 'Electricity Bill Disconnection Scam',
    tag: 'Household Utility Trap',
    badge: '85/100 HIGH RISK',
    badgeClass: 'badge-high',
    sender: 'VM-ELECTR',
    message: 'Dear Consumer, Your electricity power will be disconnected tonight at 9:30 PM because previous bill was not updated. Update immediately at http://bit.ly/elec-bill-pay or contact Officer at 9876543210.',
    notes: 'Slide 2 Panic Exploitation: High fight-or-flight panic vector targeting families with power cut threats and shortened phishing links.'
  },
  {
    id: 'customs-parcel-scam',
    title: 'Customs / India Post Parcel Hold',
    tag: 'Courier Impersonation',
    badge: '90/100 HIGH RISK',
    badgeClass: 'badge-high',
    sender: 'BP-INDPOST',
    message: 'India Post Alert: Your parcel #IN849201 is detained at customs due to unpaid duty fine of Rs 48. Pay immediately within 24 hours at http://indiapost-customs-pay.top to avoid legal action.',
    notes: 'Uses nominal ₹48 fee to lower psychological guard while stealing card details via fake customs portal.'
  },
  {
    id: 'telegram-job-scam',
    title: 'Part-Time Telegram Job Scam',
    tag: 'Student Vulnerability',
    badge: '75/100 HIGH RISK',
    badgeClass: 'badge-high',
    sender: '+919876543210',
    message: 'Congratulations! You are selected for part-time online job. Earn Rs 3000 to Rs 8000 daily by liking YouTube videos. Claim your welcome bonus today at https://telegram-job-reward.xyz/join',
    notes: 'Slide 2: Targets students with fake salary bait, requesting registration fees or task deposits.'
  }
];
