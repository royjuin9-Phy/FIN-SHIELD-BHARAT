import re
from typing import List, Tuple

SUSPICIOUS_DOMAINS = [
    "free-stock-tips.in", "guaranteed-crypto-profit.com",
    "sebi-approved-vip.net", "wealth-double-fast.xyz"
]

HIGH_RISK_TERMS = [
    r"guaranteed\s+(return|profit)",
    r"100%\s+daily",
    r"double\s+your\s+money",
    r"zero\s+risk",
    r"vip\s+(group|calls|signals)"
]

def compute_rule_score(text: str) -> Tuple[int, List[str]]:
    flags = []
    score = 0
    text_lower = text.lower()

    # Check for scam phrases
    for pattern in HIGH_RISK_TERMS:
        if re.search(pattern, text_lower):
            flags.append(f"Unrealistic Promise Detected")
            score += 35

    # Check for bad links
    urls = re.findall(r'https?://[^\s]+', text_lower)
    for url in urls:
        for bad_domain in SUSPICIOUS_DOMAINS:
            if bad_domain in url:
                flags.append(f"Suspicious Link Detected")
                score += 45

    return min(score, 90), flags