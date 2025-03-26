from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime
from services.recommendation_service import RecommendationService
from services.telemetry_service import TelemetryService

router = APIRouter()

class Recommendation(BaseModel):
    id: str
    title: str
    description: str
    confidence_score: float
    source: str
    related_metrics: List[str]
    action_items: List[str]

class RecommendationRequest(BaseModel):
    incident_id: Optional[str] = None
    component_id: Optional[str] = None
    time_range: Optional[str] = "24h"
    context: Optional[Dict[str, Any]] = None

@router.post("/generate", response_model=List[Recommendation])
async def generate_recommendations(request: RecommendationRequest):
    """Generate contextual recommendations based on telemetry and incident data"""
    try:
        recommendation_service = RecommendationService()
        telemetry_service = TelemetryService()
        
        # Get relevant telemetry data
        telemetry_data = await telemetry_service.get_telemetry_data(
            component_id=request.component_id,
            time_range=request.time_range
        )
        
        # Generate recommendations
        recommendations = await recommendation_service.generate_recommendations(
            incident_id=request.incident_id,
            component_id=request.component_id,
            telemetry_data=telemetry_data,
            context=request.context
        )
        
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/similar-incidents/{incident_id}")
async def get_similar_incidents(incident_id: str):
    """Get similar incidents and their resolution steps"""
    try:
        recommendation_service = RecommendationService()
        similar_incidents = await recommendation_service.get_similar_incidents(incident_id)
        return similar_incidents
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/proactive-alerts")
async def get_proactive_alerts():
    """Get proactive alerts based on telemetry patterns"""
    try:
        recommendation_service = RecommendationService()
        alerts = await recommendation_service.get_proactive_alerts()
        return alerts
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/component-health/{component_id}")
async def get_component_health(component_id: str):
    """Get health status and recommendations for a specific component"""
    try:
        recommendation_service = RecommendationService()
        health_status = await recommendation_service.get_component_health(component_id)
        return health_status
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 