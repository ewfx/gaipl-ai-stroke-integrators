from typing import List, Dict, Any, Optional
from datetime import datetime

class AutomationService:
    def __init__(self):
        self.available_actions = {
            "restart_service": {
                "name": "Restart Service",
                "description": "Restart the affected service",
                "parameters": ["service_name"]
            },
            "clear_cache": {
                "name": "Clear Cache",
                "description": "Clear system cache",
                "parameters": ["cache_type"]
            },
            "update_config": {
                "name": "Update Configuration",
                "description": "Update service configuration",
                "parameters": ["config_key", "config_value"]
            }
        }

    async def get_available_actions(self) -> List[str]:
        """Get list of available automation actions"""
        return list(self.available_actions.keys())

    async def execute_action(
        self,
        action_id: str,
        parameters: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Execute an automation action"""
        if action_id not in self.available_actions:
            return {
                "status": "error",
                "message": f"Action {action_id} not found"
            }

        action = self.available_actions[action_id]
        params = parameters or {}

        # Validate required parameters
        missing_params = [
            param for param in action["parameters"]
            if param not in params
        ]
        if missing_params:
            return {
                "status": "error",
                "message": f"Missing required parameters: {', '.join(missing_params)}"
            }

        # Mock action execution
        return {
            "status": "success",
            "action": action_id,
            "parameters": params,
            "executed_at": datetime.utcnow().isoformat(),
            "result": f"Successfully executed {action['name']}"
        }

    async def get_action_status(self, action_id: str) -> Dict[str, Any]:
        """Get status of an automation action"""
        if action_id not in self.available_actions:
            return {
                "status": "error",
                "message": f"Action {action_id} not found"
            }

        return {
            "status": "completed",
            "action": action_id,
            "last_execution": datetime.utcnow().isoformat(),
            "success_rate": "100%"
        } 