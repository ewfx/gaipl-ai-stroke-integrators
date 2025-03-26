from typing import List, Dict, Any
from datetime import datetime
from services.ai_service import AIService
from services.telemetry_service import TelemetryService

class RecommendationService:
    def __init__(self):
        self.ai_service = AIService()
        self.telemetry_service = TelemetryService()

    async def generate_recommendations(
        self,
        component_id: str = None,
        context: Dict[str, Any] = None
    ) -> List[Dict[str, Any]]:
        """Generate proactive recommendations"""
        # Get telemetry data if component_id is provided
        telemetry_data = {}
        if component_id:
            telemetry_data = await self.telemetry_service.get_telemetry_data(component_id)

        # Mock recommendations for now
        return [
            {
                "id": "rec-1",
                "title": "Optimize Resource Usage",
                "description": "System shows high memory usage. Consider optimizing resource allocation.",
                "priority": "medium",
                "confidence_score": 0.85,
                "action_items": [
                    "Review memory allocation settings",
                    "Check for memory leaks",
                    "Consider implementing caching"
                ],
                "created_at": datetime.utcnow().isoformat()
            },
            {
                "id": "rec-2",
                "title": "Update Dependencies",
                "description": "Several dependencies are outdated. Update to latest versions for security and performance.",
                "priority": "low",
                "confidence_score": 0.95,
                "action_items": [
                    "Run dependency update",
                    "Test compatibility",
                    "Deploy updates in staging"
                ],
                "created_at": datetime.utcnow().isoformat()
            }
        ]

    async def get_component_health_status(
        self,
        component_id: str
    ) -> Dict[str, Any]:
        """Get health status and recommendations for a component"""
        health_status = await self.telemetry_service.get_component_health(component_id)
        recommendations = await self.generate_recommendations(component_id)

        return {
            "component_id": component_id,
            "health_status": health_status,
            "recommendations": recommendations,
            "last_updated": datetime.utcnow().isoformat()
        }

    async def get_system_health_overview(self) -> Dict[str, Any]:
        """Get system-wide health overview and recommendations"""
        # Mock system overview for now
        return {
            "overall_status": "healthy",
            "components": [
                {
                    "id": "comp-1",
                    "name": "Frontend Service",
                    "status": "healthy",
                    "last_check": datetime.utcnow().isoformat()
                },
                {
                    "id": "comp-2",
                    "name": "Backend Service",
                    "status": "healthy",
                    "last_check": datetime.utcnow().isoformat()
                }
            ],
            "recommendations": await self.generate_recommendations(),
            "last_updated": datetime.utcnow().isoformat()
        } 