/**
 * ScamSpotter 4-Stage Explainable Fraud & Phishing Detection Engine
 * Client-Side Edge Implementation (ES Module)
 * SETU 2026 - PS-01 ScamSpotter
 */

import { analyzeDomain } from './bankingRegistry';

const HOMOGLYPH_MAP = {
  '\u0430': 'a', '\u0410': 'A',
  '\u043e': 'o', '\u041e': 'O',
  '\u0435': 'e', '\u0415': 'E',
  '\u0440': 'p', '\u0420': 'P',
  '\u0441': 'c', '\u0421': 'C',
  '\u0443': 'y', '\u0423': 'Y',
  '\u0445': 'x', '\u0425': 'X',
  '\u0456': 'i', '\u0406': 'I',
  '\u0455': 's', '\u0405': 'S'
};

export function sanitizeAndNormalize(rawText) {
  if (!rawText) return { cleanText: '', extractedUrls: [], extractedPhones: [], original: '' };

  let text = String(rawText);

  // 1. Remove zero-width characters
  const zeroWidthRegex = /[\u200B-\u200D\uFEFF\u00AD\u2060]/g;
  text = text.replace(zeroWidthRegex, '');

  // 2. Replace homoglyphs
  let normalizedChars = '';
  for (let char of text) {
    normalizedChars += HOMOGLYPH_MAP[char] || char;
  }
  text = normalizedChars;

  // 3. Extract URLs before altering punctuation
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/gi;
  const rawUrls = text.match(urlRegex) || [];
  const extractedUrls = rawUrls.filter(u => {
    return u.replace(/[.,;!?)]$/, '');
  }).map(u => u.replace(/[.,;!?)]$/, ''));

  // 4. Extract phone numbers / helplines
  const phoneRegex = /(?:\+91[\s-]?)?[6789]\d{9}|1800[\s-]?\d{3}[\s-]?\d{3,4}|1930/g;
  const extractedPhones = text.match(phoneRegex) || [];

  return {
    original: rawText,
    cleanText: text,
    extractedUrls,
    extractedPhones
  };
}

export function isNegated(text, matchIndex) {
  const windowStart = Math.max(0, matchIndex - 45);
  const precedingText = text.substring(windowStart, matchIndex).toLowerCase();
  const negationPatterns = [
    /\bdo\s+not\s+(?:ever\s+)?$/i,
    /\bdon't\s+$/i,
    /\bnever\s+$/i,
    /\bwill\s+never\s+$/i,
    /\bneither\s+$/i,
    /\bshould\s+not\s+$/i,
    /\bnot\s+share\s+$/i,
    /\bnever\s+share\s+$/i,
    /\bnever\s+asks?\s+(?:for\s+)?$/i,
    /\bdoes\s+not\s+ask\s+(?:for\s+)?$/i
  ];

  return negationPatterns.some(pattern => pattern.test(precedingText));
}

export function runDeterministicRules(cleanText, extractedUrls) {
  const findings = [];
  const lowerText = cleanText.toLowerCase();

  const urgencyRules = [
    { pattern: /\b(?:today|tonight|immediately|at\s+once|right\s+now|urgent|urgently)\b/gi, label: 'Immediate Action Demand', points: 20 },
    { pattern: /\b(?:within\s+(?:\d{1,2}|24|48|12)\s*(?:hours|hrs|mins|minutes)|in\s+24\s*hours)\b/gi, label: 'Tight Time Limit (24h/12h)', points: 20 },
    { pattern: /\b(?:last\s+chance|expires\s+soon|final\s+notice|deadline)\b/gi, label: 'Artificial Expiry Pressure', points: 20 },
    { pattern: /\b(?:update\s+immediately|hurry|instant\s+verification)\b/gi, label: 'Rush Coercion', points: 20 }
  ];

  const threatRules = [
    { pattern: /\b(?:account\s+will\s+be\s+blocked|account\s+blocked|will\s+be\s+suspended|deactivated|frozen)\b/gi, label: 'Account Suspension Threat', points: 15 },
    { pattern: /\b(?:kyc\s+is\s+incomplete|kyc\s+expired|pan\s+card\s+blocked|aadhaar\s+suspended)\b/gi, label: 'KYC / Identity Invalidation Fear', points: 15 },
    { pattern: /\b(?:electricity\s+will\s+be\s+disconnected|power\s+cut\s+tonight)\b/gi, label: 'Utility Disconnection Threat', points: 15 },
    { pattern: /\b(?:legal\s+action|police\s+case|fir\s+registered|court\s+notice|arrest\s+warrant|penalty\s+fine)\b/gi, label: 'Legal Coercion & Intimidation', points: 20 },
    { pattern: /\b(?:sim\s+card\s+will\s+be\s+blocked|esim\s+deactivation)\b/gi, label: 'Telecom Line Disconnection', points: 15 }
  ];

  const credentialRules = [
    { pattern: /\b(?:share\s+(?:the\s+)?otp|send\s+(?:the\s+)?otp|provide\s+(?:the\s+)?otp|submit\s+otp)\b/gi, label: 'OTP Harvesting Trap', points: 40 },
    { pattern: /\b(?:enter\s+(?:your\s+)?pin|share\s+password|netbanking\s+password|cvv)\b/gi, label: 'PIN / Password Harvest Request', points: 40 },
    { pattern: /\b(?:install\s+(?:this\s+)?apk|download\s+apk|update\s+apk)\b/gi, label: 'Malicious Android APK Delivery', points: 40 },
    { pattern: /\b(?:download\s+(?:anydesk|teamviewer|rustdesk|quicksupport))\b/gi, label: 'Remote Access RAT Software Trap', points: 45 },
    { pattern: /\b(?:claim\s+(?:your\s+)?(?:lottery|reward|cashback|bonus|rupees|rs\.?\s*\d+))\b/gi, label: 'Greed / Phishing Bait Reward', points: 25 }
  ];

  // 1. Evaluate Urgency
  let urgencyPoints = 0;
  for (const rule of urgencyRules) {
    let match;
    while ((match = rule.pattern.exec(cleanText)) !== null) {
      if (urgencyPoints < 20) {
        urgencyPoints = rule.points;
      }
      findings.push({
        type: 'urgency',
        title: 'Fake Urgency',
        matchedText: match[0],
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        points: rule.points,
        whyItMatters: 'Pressure stops victims from thinking critically or verifying with the branch.'
      });
    }
  }

  // 2. Evaluate Threat
  let threatPoints = 0;
  for (const rule of threatRules) {
    let match;
    while ((match = rule.pattern.exec(cleanText)) !== null) {
      if (threatPoints < 20) {
        threatPoints = Math.max(threatPoints, rule.points);
      }
      findings.push({
        type: 'threat',
        title: 'Account Threat',
        matchedText: match[0],
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        points: rule.points,
        whyItMatters: 'Scammers exploit fear of losing money, netbanking access, or vital utilities.'
      });
    }
  }

  // 3. Evaluate Credential Traps with Negation Checking
  let credentialPoints = 0;
  for (const rule of credentialRules) {
    let match;
    while ((match = rule.pattern.exec(cleanText)) !== null) {
      const matchPos = match.index;
      if (isNegated(cleanText, matchPos)) {
        findings.push({
          type: 'negation_pass',
          title: 'Legitimate Security Caution',
          matchedText: match[0],
          startIndex: match.index,
          endIndex: match.index + match[0].length,
          points: 0,
          whyItMatters: 'Genuine security alert contains negation ("Do NOT share"). Not a phishing attempt.'
        });
        continue;
      }

      if (credentialPoints < 40) {
        credentialPoints = Math.max(credentialPoints, rule.points);
      }
      findings.push({
        type: 'credential_trap',
        title: 'OTP / Credential Request',
        matchedText: match[0],
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        points: rule.points,
        whyItMatters: 'CRITICAL: No legitimate bank or payment gateway EVER asks for your OTP, PIN, or remote app install!'
      });
    }
  }

  return { findings, urgencyPoints, threatPoints, credentialPoints };
}

export function runDomainVerification(extractedUrls, cleanText) {
  const domainFindings = [];
  let linkPoints = 0;

  for (const rawUrl of extractedUrls) {
    const analysis = analyzeDomain(rawUrl);
    if (!analysis) continue;

    if (analysis.isWhitelisted) {
      domainFindings.push({
        type: 'verified_domain',
        title: 'Verified Official Domain',
        matchedText: rawUrl,
        points: 0,
        domain: analysis.domain,
        whyItMatters: `Verified institutional domain (${analysis.reason}). Safe link.`
      });
    } else if (analysis.isLookalike) {
      linkPoints = Math.max(linkPoints, 25);
      domainFindings.push({
        type: 'suspicious_link',
        title: 'Suspicious Link',
        matchedText: rawUrl,
        points: 25,
        domain: analysis.domain,
        targetBank: analysis.targetBank,
        whyItMatters: 'Not an official bank domain (official is onlinesbi.sbi); classic phishing clone.'
      });
    } else if (analysis.isShortener) {
      linkPoints = Math.max(linkPoints, 25);
      domainFindings.push({
        type: 'suspicious_link',
        title: 'Suspicious Link (Shortened)',
        matchedText: rawUrl,
        points: 25,
        domain: analysis.domain,
        whyItMatters: 'Shortened redirect links disguise malicious scam destinations from visual inspection.'
      });
    } else {
      linkPoints = Math.max(linkPoints, 20);
      domainFindings.push({
        type: 'suspicious_link',
        title: 'Suspicious Link',
        matchedText: rawUrl,
        points: 20,
        domain: analysis.domain,
        whyItMatters: 'Links in unsolicited SMS messages are the #1 attack vector for banking fraud.'
      });
    }
  }

  return { domainFindings, linkPoints };
}

export function analyzeMessageClient(rawInput) {
  const startTime = performance.now();

  const { cleanText, extractedUrls, extractedPhones, original } = sanitizeAndNormalize(rawInput);

  if (!cleanText || cleanText.trim().length === 0) {
    return {
      rawInput: '',
      cleanText: '',
      score: 0,
      riskTier: 'LOW',
      riskColor: 'green',
      riskTitle: 'No Content Provided',
      latencyMs: 0,
      breakdown: [],
      highlightedTokens: [],
      actions: [],
      summary: 'Please enter a message or select a benchmark sample to analyze.'
    };
  }

  const { findings, urgencyPoints, threatPoints, credentialPoints } = runDeterministicRules(cleanText, extractedUrls);
  const { domainFindings, linkPoints } = runDomainVerification(extractedUrls, cleanText);

  const allFindings = [...findings, ...domainFindings];

  let totalScore = urgencyPoints + threatPoints + credentialPoints + linkPoints;

  // Co-occurrence Gating (Slide 9):
  // Urgency words alone (e.g., "Submit lab record today by 5 PM") only add 10-15 points.
  // Without an unverified link or credential trap, the message remains firmly in LOW RISK (Green).
  if (urgencyPoints > 0 && threatPoints === 0 && credentialPoints === 0 && linkPoints === 0) {
    totalScore = Math.min(totalScore, 20);
  }

  totalScore = Math.min(Math.max(totalScore, 0), 100);

  let riskTier = 'LOW';
  let riskColor = 'green';
  let riskTitle = 'SAFE / LOW RISK';

  if (totalScore >= 60) {
    riskTier = 'HIGH';
    riskColor = 'red';
    riskTitle = 'HIGH RISK SCAM DETECTED';
  } else if (totalScore >= 30) {
    riskTier = 'MEDIUM';
    riskColor = 'amber';
    riskTitle = 'SUSPICIOUS / MEDIUM RISK';
  }

  const rescueActions = [];
  if (riskTier === 'HIGH') {
    rescueActions.push({
      priority: 1,
      instruction: 'Do NOT click any link, download attachments, or share OTP / passwords.',
      tag: 'Immediate Defense'
    });
    rescueActions.push({
      priority: 2,
      instruction: 'Verify directly via the bank’s official mobile app (e.g., SBI YONO) or in-person branch.',
      tag: 'Official Channel'
    });
    rescueActions.push({
      priority: 3,
      instruction: 'If money was debited or OTP was shared: Call 1930 immediately to freeze fraudulent transfers within the golden hour.',
      tag: 'Helpline 1930',
      actionable: true,
      actionType: 'call',
      phone: '1930'
    });
    rescueActions.push({
      priority: 4,
      instruction: 'File an official cyber fraud complaint with pre-filled evidence draft at cybercrime.gov.in.',
      tag: 'Cybercrime Portal',
      actionable: true,
      actionType: 'link',
      url: 'https://cybercrime.gov.in'
    });
  } else if (riskTier === 'MEDIUM') {
    rescueActions.push({
      priority: 1,
      instruction: 'Exercise caution. The message exhibits abnormal urgency or unfamiliar links.',
      tag: 'Caution'
    });
    rescueActions.push({
      priority: 2,
      instruction: 'Check official bank / sender contact numbers from official website, NOT numbers in SMS.',
      tag: 'Verification'
    });
  } else {
    rescueActions.push({
      priority: 1,
      instruction: 'No common fraud patterns, credential harvesting, or lookalike links detected.',
      tag: 'Safe Notice'
    });
    rescueActions.push({
      priority: 2,
      instruction: 'Always practice basic digital hygiene: never share passwords or confidential PINs.',
      tag: 'Best Practice'
    });
  }

  const timestamp = new Date().toISOString();
  const reportDraft = `INCIDENTIAL FRAUD REPORT - EVIDENCE DOSSIER
Generated via ScamSpotter Rule-Driven Fraud Detection Engine (PS-01)
Date/Time: ${timestamp}
Risk Evaluation: ${riskTitle} (${totalScore}/100)

DETECTED EVIDENCE & SCAM VECTORS:
- Fake Urgency Score: +${urgencyPoints} pts
- Account Threat Score: +${threatPoints} pts
- Credential Harvesting: +${credentialPoints} pts
- Suspicious Domain / Link: +${linkPoints} pts

SUSPICIOUS PHRASES DETECTED:
${allFindings.filter(f => f.points > 0).map(f => `• [${f.title}]: "${f.matchedText}" - ${f.whyItMatters}`).join('\n') || 'None'}

ORIGINAL MESSAGE EVIDENCE:
"""
${original}
"""

EXTRACTED URLS:
${extractedUrls.length > 0 ? extractedUrls.join(', ') : 'None'}

EXTRACTED SENDER/PHONE NUMBERS:
${extractedPhones.length > 0 ? extractedPhones.join(', ') : 'None'}

RECOMMENDED IMMEDIATE ACTION:
Freeze associated accounts, blacklist destination domain, and report to National Cybercrime Reporting Portal (1930 / cybercrime.gov.in).`;

  const latencyMs = Math.round((performance.now() - startTime) * 100) / 100;

  return {
    rawInput: original,
    cleanText,
    score: totalScore,
    riskTier,
    riskColor,
    riskTitle,
    latencyMs: Math.max(0.5, latencyMs),
    pointsBreakdown: {
      urgency: urgencyPoints,
      threat: threatPoints,
      credential: credentialPoints,
      link: linkPoints
    },
    findings: allFindings,
    extractedUrls,
    extractedPhones,
    actions: rescueActions,
    reportDraft
  };
}
