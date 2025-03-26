from typing import List, Dict, Any
from datetime import datetime
from services.ai_service import AIService

class ChatbotService:
    def __init__(self):
        self.ai_service = AIService()
        self.chat_history: List[Dict[str, Any]] = []

    async def get_chat_history(self) -> List[Dict[str, Any]]:
        """Get chat history"""
        return self.chat_history

    async def send_message(
        self,
        message: str,
        context: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Send a message and get AI response"""
        # Add user message to history
        user_message = {
            "role": "user",
            "content": message,
            "timestamp": datetime.utcnow().isoformat()
        }
        self.chat_history.append(user_message)

        # Get AI response
        response = await self.ai_service.get_response(message, context or {})

        # Add AI response to history
        ai_message = {
            "role": "assistant",
            "content": response,
            "timestamp": datetime.utcnow().isoformat()
        }
        self.chat_history.append(ai_message)

        return {
            "message": response,
            "timestamp": ai_message["timestamp"]
        }

    async def clear_history(self) -> bool:
        """Clear chat history"""
        self.chat_history = []
        return True

    async def get_context(self) -> Dict[str, Any]:
        """Get current chat context"""
        return {
            "history_length": len(self.chat_history),
            "last_message": self.chat_history[-1] if self.chat_history else None,
            "timestamp": datetime.utcnow().isoformat()
        } 