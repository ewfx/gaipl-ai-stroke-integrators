from typing import List, Dict, Any, Optional
from datetime import datetime
import aiohttp
from services.ai_service import AIService
from services.telemetry_service import TelemetryService
from services.automation_service import AutomationService
import uuid

class Incident:
    def __init__(
        self,
        id: str,
        title: str,
        description: str,
        status: str,
        priority: str,
        created_at: datetime,
        updated_at: datetime,
        telemetry_data: Dict[str, Any]
    ):
        self.id = id
        self.title = title
        self.description = description
        self.status = status
        self.priority = priority
        self.created_at = created_at
        self.updated_at = updated_at
        self.telemetry_data = telemetry_data

class IncidentService:
    def __init__(self):
        self.ai_service = AIService()
        self.telemetry_service = TelemetryService()
        self.automation_service = AutomationService()
        self.incidents: Dict[str, Incident] = {}
        
    async def create_incident(
        self,
        title: str,
        description: str,
        priority: str = "medium",
        telemetry_data: Optional[Dict[str, Any]] = None
    ) -> Incident:
        incident_id = str(uuid.uuid4())
        now = datetime.utcnow()
        
        incident = Incident(
            id=incident_id,
            title=title,
            description=description,
            status="open",
            priority=priority,
            created_at=now,
            updated_at=now,
            telemetry_data=telemetry_data or {}
        )
        
        self.incidents[incident_id] = incident
        return incident

    async def get_incident(self, incident_id: str) -> Optional[Incident]:
        return self.incidents.get(incident_id)

    async def list_incidents(self) -> List[Incident]:
        return list(self.incidents.values())

    async def update_incident(
        self,
        incident_id: str,
        title: Optional[str] = None,
        description: Optional[str] = None,
        status: Optional[str] = None,
        priority: Optional[str] = None,
        telemetry_data: Optional[Dict[str, Any]] = None
    ) -> Optional[Incident]:
        incident = self.incidents.get(incident_id)
        if not incident:
            return None

        if title:
            incident.title = title
        if description:
            incident.description = description
        if status:
            incident.status = status
        if priority:
            incident.priority = priority
        if telemetry_data:
            incident.telemetry_data.update(telemetry_data)
        
        incident.updated_at = datetime.utcnow()
        return incident

    async def delete_incident(self, incident_id: str) -> bool:
        if incident_id in self.incidents:
            del self.incidents[incident_id]
            return True
        return False

    async def get_related_incidents(self, incident_id: str) -> List[Incident]:
        incident = self.incidents.get(incident_id)
        if not incident:
            return []

        # Simple implementation: return incidents with similar titles
        related = []
        for other_incident in self.incidents.values():
            if other_incident.id != incident_id:
                if any(word in other_incident.title.lower() for word in incident.title.lower().split()):
                    related.append(other_incident)
        
        return related

    async def get_health_check(self, incident_id: str) -> Dict[str, Any]:
        incident = self.incidents.get(incident_id)
        if not incident:
            return {"status": "error", "message": "Incident not found"}

        # Mock health check implementation
        return {
            "status": "healthy",
            "checks": {
                "system_status": "operational",
                "resource_usage": "normal",
                "last_check": datetime.utcnow().isoformat()
            }
        }
    
    async def get_recommendations(self, incident_id: str) -> List[str]:
        """Get AI-powered recommendations for incident resolution"""
        # Get incident details and context
        incident = await self.get_incident(incident_id)
        telemetry_data = await self.telemetry_service.get_telemetry_data(
            component_id=incident.telemetry_data.get("component_id")
        )
        
        # Generate recommendations using AI
        recommendations = await self.ai_service.generate_recommendations(
            incident=incident,
            telemetry_data=telemetry_data
        )
        
        return recommendations
    
    async def generate_rca_summary(self, incident_id: str) -> Dict[str, Any]:
        """Generate AI-powered RCA summary for an incident"""
        # Get incident details and related data
        incident = await self.get_incident(incident_id)
        related_incidents = await self.get_related_incidents(incident_id)
        telemetry_data = await self.telemetry_service.get_telemetry_data(
            component_id=incident.telemetry_data.get("component_id")
        )
        
        # Generate RCA summary using AI
        rca_summary = await self.ai_service.generate_rca_summary(
            incident=incident,
            related_incidents=related_incidents,
            telemetry_data=telemetry_data
        )
        
        return rca_summary
    
    async def update_incident_status(self, incident_id: str, status: str) -> Dict[str, Any]:
        """Update incident status and trigger relevant actions"""
        # Update incident status
        # TODO: Implement actual status update logic
        
        # Trigger relevant automation actions
        if status == "resolved":
            await self.automation_service.trigger_post_resolution_actions(incident_id)
        
        return {"status": "success", "message": f"Incident status updated to {status}"}
    
    async def get_incident_timeline(self, incident_id: str) -> List[Dict[str, Any]]:
        """Get detailed timeline of incident events and actions"""
        # TODO: Implement timeline retrieval logic
        return [
            {
                "timestamp": datetime.utcnow().isoformat(),
                "event": "incident_created",
                "details": "Incident was created"
            }
        ] 