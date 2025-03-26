from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from services.chatbot_service import ChatbotService
from services.context_service import ContextService

router = APIRouter()

class ChatMessage(BaseModel):
    role: str
    content: str
    timestamp: Optional[str] = None

class ChatRequest(BaseModel):
    message: str
    incident_id: Optional[str] = None
    context: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    message: str
    suggestions: List[str]
    related_incidents: List[Dict[str, Any]]
    knowledge_base_articles: List[Dict[str, Any]]

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Handle chat interactions with context-aware responses"""
    try:
        chatbot_service = ChatbotService()
        context_service = ContextService()
        
        # Get relevant context
        context = await context_service.get_context(
            incident_id=request.incident_id,
            additional_context=request.context
        )
        
        # Get AI response with context
        response = await chatbot_service.get_response(
            message=request.message,
            context=context
        )
        
        # Get related information
        suggestions = await chatbot_service.get_suggestions(request.message)
        related_incidents = await context_service.get_related_incidents(request.incident_id)
        knowledge_base_articles = await context_service.get_relevant_kb_articles(request.message)
        
        return ChatResponse(
            message=response,
            suggestions=suggestions,
            related_incidents=related_incidents,
            knowledge_base_articles=knowledge_base_articles
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/suggestions")
async def get_suggestions(query: str):
    """Get AI-powered suggestions based on the current context"""
    try:
        chatbot_service = ChatbotService()
        suggestions = await chatbot_service.get_suggestions(query)
        return {"suggestions": suggestions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/context/{incident_id}")
async def get_chat_context(incident_id: str):
    """Get the current context for chat interactions"""
    try:
        context_service = ContextService()
        context = await context_service.get_context(incident_id=incident_id)
        return context
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 