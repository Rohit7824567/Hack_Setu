/**
 * Official Indian Bank & Government Whitelist and Levenshtein Distance Domain Analyzer
 * Client Edge Module - SETU 2026 PS-01 ScamSpotter
 */

export const OFFICIAL_BANKS = [
  {
    name: 'State Bank of India (SBI)',
    shortName: 'SBI',
    officialDomains: ['onlinesbi.sbi', 'sbi.co.in', 'bank.sbi'],
    officialApp: 'YONO SBI',
    helpline: '1800 1234 / 1800 2100',
    emergencyNumber: '1930'
  },
  {
    name: 'HDFC Bank',
    shortName: 'HDFC',
    officialDomains: ['hdfcbank.com', 'hdfc.com'],
    officialApp: 'HDFC MobileBanking',
    helpline: '1800 202 6161',
    emergencyNumber: '1930'
  },
  {
    name: 'ICICI Bank',
    shortName: 'ICICI',
    officialDomains: ['icicibank.com'],
    officialApp: 'iMobile Pay',
    helpline: '1800 1080',
    emergencyNumber: '1930'
  },
  {
    name: 'Punjab National Bank (PNB)',
    shortName: 'PNB',
    officialDomains: ['pnbindia.in', 'netpnb.com'],
    officialApp: 'PNB ONE',
    helpline: '1800 180 2222',
    emergencyNumber: '1930'
  },
  {
    name: 'Axis Bank',
    shortName: 'Axis',
    officialDomains: ['axisbank.com'],
    officialApp: 'Axis Mobile',
    helpline: '1860 419 5555',
    emergencyNumber: '1930'
  },
  {
    name: 'Bank of Baroda',
    shortName: 'BOB',
    officialDomains: ['bankofbaroda.in', 'bobibanking.com'],
    officialApp: 'bob World',
    helpline: '1800 5700',
    emergencyNumber: '1930'
  },
  {
    name: 'Kotak Mahindra Bank',
    shortName: 'Kotak',
    officialDomains: ['kotak.com'],
    officialApp: 'Kotak - 811 & Mobile Banking',
    helpline: '1860 266 2666',
    emergencyNumber: '1930'
  },
  {
    name: 'Canara Bank',
    shortName: 'Canara',
    officialDomains: ['canarabank.com'],
    officialApp: 'Canara ai1',
    helpline: '1800 425 0018',
    emergencyNumber: '1930'
  },
  {
    name: 'Paytm Payments Bank',
    shortName: 'Paytm',
    officialDomains: ['paytmbank.com', 'paytm.com'],
    officialApp: 'Paytm',
    helpline: '0120 4456 456',
    emergencyNumber: '1930'
  }
];

export const WHITELISTED_DOMAINS = [
  'onlinesbi.sbi',
  'sbi.co.in',
  'bank.sbi',
  'hdfcbank.com',
  'hdfc.com',
  'icicibank.com',
  'pnbindia.in',
  'netpnb.com',
  'axisbank.com',
  'bankofbaroda.in',
  'bobibanking.com',
  'kotak.com',
  'canarabank.com',
  'paytmbank.com',
  'paytm.com',
  'irctc.co.in',
  'incometax.gov.in',
  'epfindia.gov.in',
  'uidai.gov.in',
  'digilocker.gov.in',
  'cybercrime.gov.in',
  'rbi.org.in',
  'npci.org.in',
  'iitb.ac.in',
  'iitd.ac.in',
  'delhi.gov.in'
];

export const WHITELISTED_TLDS_AND_SUFFIXES = [
  '.gov.in',
  '.nic.in',
  '.ac.in',
  '.edu.in',
  '.res.in',
  '.mil.in'
];

export function levenshteinDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export function analyzeDomain(domain) {
  if (!domain) return null;
  const cleanDomain = domain.toLowerCase().trim().replace(/^https?:\/\//, '').split('/')[0].split(':')[0];

  // 1. Direct whitelist match
  if (WHITELISTED_DOMAINS.includes(cleanDomain)) {
    return {
      domain: cleanDomain,
      isWhitelisted: true,
      isLookalike: false,
      reason: 'Official registered institutional / bank domain'
    };
  }

  // 2. Safe suffix match (.gov.in, .nic.in, .ac.in, .edu.in)
  for (const suffix of WHITELISTED_TLDS_AND_SUFFIXES) {
    if (cleanDomain.endsWith(suffix)) {
      return {
        domain: cleanDomain,
        isWhitelisted: true,
        isLookalike: false,
        reason: `Official governmental or accredited educational domain (*${suffix})`
      };
    }
  }

  // 3. Known bank brand keyword check & Levenshtein distance
  const bankKeywords = ['sbi', 'hdfc', 'icici', 'pnb', 'axis', 'kotak', 'bob', 'canara', 'paytm', 'yono', 'netbanking'];
  let matchedBankKeyword = bankKeywords.find(kw => cleanDomain.includes(kw));

  const domainParts = cleanDomain.split('.');
  const baseName = domainParts.length > 2 ? domainParts[domainParts.length - 2] : domainParts[0];

  for (const bank of OFFICIAL_BANKS) {
    for (const officialDomain of bank.officialDomains) {
      const officialBase = officialDomain.split('.')[0];
      const dist = levenshteinDistance(baseName, officialBase);

      if (dist > 0 && dist <= 2 && baseName.length >= 3) {
        return {
          domain: cleanDomain,
          isWhitelisted: false,
          isLookalike: true,
          targetBank: bank.name,
          distance: dist,
          officialDomain,
          reason: `High-risk lookalike spoofing ${bank.name} (Edit distance: ${dist} from '${officialBase}')`
        };
      }
    }

    if (matchedBankKeyword && (cleanDomain.includes('-') || cleanDomain.includes('update') || cleanDomain.includes('verify') || cleanDomain.includes('kyc') || cleanDomain.includes('login') || cleanDomain.includes('reward'))) {
      return {
        domain: cleanDomain,
        isWhitelisted: false,
        isLookalike: true,
        targetBank: bank.name,
        reason: `Deceptive domain mimicking financial brand '${matchedBankKeyword}' with unauthorized subdomains/hyphens`
      };
    }
  }

  // 4. Shorteners
  const shorteners = ['bit.ly', 'tinyurl.com', 'is.gd', 't.co', 'cutt.ly', 'rb.gy', 'ngrok.io', 'pages.dev', 'vercel.app', 'firebaseapp.com'];
  if (shorteners.some(s => cleanDomain.includes(s))) {
    return {
      domain: cleanDomain,
      isWhitelisted: false,
      isShortener: true,
      reason: 'URL shortener / cloaked redirect frequently abused in phishing attacks'
    };
  }

  return {
    domain: cleanDomain,
    isWhitelisted: false,
    isLookalike: false,
    reason: 'Unverified external domain'
  };
}
