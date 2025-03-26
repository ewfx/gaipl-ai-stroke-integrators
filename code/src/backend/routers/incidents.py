from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime
from services.incident_service import IncidentService
from services.automation_service import AutomationService

router = APIRouter()

class Incident(BaseModel):
    id: str
    title: str
    description: str
    status: str
    priority: str
    created_at: datetime
    updated_at: datetime
    telemetry_data: Optional[Dict[str, Any]] = None

class IncidentResponse(BaseModel):
    incident: Incident
    related_incidents: List[Incident]
    recommendations: List[str]
    automation_actions: List[str]

@router.get("/{incident_id}", response_model=IncidentResponse)
async def get_incident(incident_id: str):
    """Get incident details with related information and recommendations"""
    try:
        incident_service = IncidentService()
        automation_service = AutomationService()
        
        # Get incident details
        incident = await incident_service.get_incident(incident_id)
        
        # Get related incidents
        related_incidents = await incident_service.get_related_incidents(incident_id)
        
        # Get recommendations based on incident context
        recommendations = await incident_service.get_recommendations(incident_id)
        
        # Get available automation actions
        automation_actions = await automation_service.get_available_actions(incident)
        
        return IncidentResponse(
            incident=incident,
            related_incidents=related_incidents,
            recommendations=recommendations,
            automation_actions=automation_actions
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/{incident_id}/automation/{action_id}")
async def trigger_automation(incident_id: str, action_id: str):
    """Trigger an automation action for an incident"""
    try:
        automation_service = AutomationService()
        result = await automation_service.execute_action(incident_id, action_id)
        return {"status": "success", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{incident_id}/health-check")
async def run_health_check(incident_id: str):
    """Run health check for the incident's affected components"""
    try:
        automation_service = AutomationService()
        health_status = await automation_service.run_health_check(incident_id)
        return health_status
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{incident_id}/rca")
async def get_rca_summary(incident_id: str):
    """Get AI-generated RCA summary for the incident"""
    try:
        incident_service = IncidentService()
        rca_summary = await incident_service.generate_rca_summary(incident_id)
        return rca_summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 