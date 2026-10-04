from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import ScanRequest, ScanResponse
from scanner import compute_rule_score

app = FastAPI(title="FinShield Bharat API")

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/v1/scan", response_model=ScanResponse)
async def scan_message(payload: ScanRequest):
    if not payload.content.strip():
        raise HTTPException(status_code=400, detail="Content cannot be empty.")

    score, flags = compute_rule_score(payload.content)
    
    if score >= 60:
        level = "HIGH RISK (SCAM)"
        summary = "This message contains strong indicators of financial fraud."
    elif score >= 30:
        level = "CAUTION"
        summary = "This message exhibits speculative tactics. Be careful."
    else:
        level = "SAFE / LOW RISK"
        summary = "No immediate scam signatures detected. Always verify sources."

    return ScanResponse(
        risk_score=score,
        risk_level=level,
        detected_flags=flags,
        advice_summary=summary
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)