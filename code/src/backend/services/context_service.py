from typing import Dict, Any, List
from datetime import datetime

class ContextService:
    def __init__(self):
        self.contexts: Dict[str, Dict[str, Any]] = {}

    async def get_context(self, context_id: str) -> Dict[str, Any]:
        """Get context by ID"""
        return self.contexts.get(context_id, {})

    async def update_context(
        self,
        context_id: str,
        updates: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Update context with new information"""
        if context_id not in self.contexts:
            self.contexts[context_id] = {
                "created_at": datetime.utcnow().isoformat(),
                "updated_at": datetime.utcnow().isoformat()
            }
        
        self.contexts[context_id].update(updates)
        self.contexts[context_id]["updated_at"] = datetime.utcnow().isoformat()
        
        return self.contexts[context_id]

    async def create_context(
        self,
        context_id: str,
        initial_data: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Create a new context"""
        self.contexts[context_id] = {
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat(),
            **(initial_data or {})
        }
        return self.contexts[context_id]

    async def delete_context(self, context_id: str) -> bool:
        """Delete a context"""
        if context_id in self.contexts:
            del self.contexts[context_id]
            return True
        return False

    async def list_contexts(self) -> List[Dict[str, Any]]:
        """List all contexts"""
        return [
            {"id": context_id, **context}
            for context_id, context in self.contexts.items()
        ]

    async def get_incident_context(self, incident_id: str) -> Dict[str, Any]:
        """Get context specific to an incident"""
        context_id = f"incident_{incident_id}"
        return await self.get_context(context_id)

    async def get_chat_context(self, chat_id: str) -> Dict[str, Any]:
        """Get context specific to a chat session"""
        context_id = f"chat_{chat_id}"
        return await self.get_context(context_id) 