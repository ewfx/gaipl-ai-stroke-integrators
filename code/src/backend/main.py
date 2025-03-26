from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn
from datetime import datetime

# Import routers
from routers import incidents, chatbot, recommendations, telemetry, enterprise_data

app = FastAPI(
    title="IPE - Integrated Platform Environment",
    description="AI-powered platform support environment with integrated capabilities",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(incidents.router, prefix="/api/v1/incidents", tags=["incidents"])
app.include_router(chatbot.router, prefix="/api/v1/chatbot", tags=["chatbot"])
app.include_router(recommendations.router, prefix="/api/v1/recommendations", tags=["recommendations"])
app.include_router(telemetry.router, prefix="/api/v1/telemetry", tags=["telemetry"])
app.include_router(enterprise_data.router, prefix="/api/v1/enterprise", tags=["enterprise"])

@app.get("/")
async def root():
    return {
        "status": "healthy",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat()
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 