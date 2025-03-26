from typing import Dict, Any, Optional
import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # API Keys
    OPENAI_API_KEY: str
    DATADOG_API_KEY: Optional[str] = None
    PROMETHEUS_URL: Optional[str] = None
    
    # Database
    DATABASE_URL: str
    ELASTICSEARCH_URL: Optional[str] = None
    
    # Service URLs
    INCIDENT_API_URL: str
    CMDB_API_URL: str
    
    # AI Settings
    AI_MODEL: str = "gpt-4"
    AI_TEMPERATURE: float = 0.7
    
    # MCP Settings
    MCP_ENDPOINT: str
    MCP_TIMEOUT: int = 30
    
    class Config:
        env_file = ".env"
        case_sensitive = True

class ConfigService:
    def __init__(self):
        load_dotenv()
        self.settings = Settings()
    
    def get_openai_api_key(self) -> str:
        """Get OpenAI API key"""
        return self.settings.OPENAI_API_KEY
    
    def get_database_url(self) -> str:
        """Get database URL"""
        return self.settings.DATABASE_URL
    
    def get_elasticsearch_url(self) -> Optional[str]:
        """Get Elasticsearch URL"""
        return self.settings.ELASTICSEARCH_URL
    
    def get_incident_api_url(self) -> str:
        """Get incident API URL"""
        return self.settings.INCIDENT_API_URL
    
    def get_cmdb_api_url(self) -> str:
        """Get CMDB API URL"""
        return self.settings.CMDB_API_URL
    
    def get_mcp_endpoint(self) -> str:
        """Get MCP endpoint"""
        return self.settings.MCP_ENDPOINT
    
    def get_ai_settings(self) -> Dict[str, Any]:
        """Get AI-related settings"""
        return {
            "model": self.settings.AI_MODEL,
            "temperature": self.settings.AI_TEMPERATURE
        }
    
    def get_monitoring_settings(self) -> Dict[str, Any]:
        """Get monitoring-related settings"""
        return {
            "datadog_api_key": self.settings.DATADOG_API_KEY,
            "prometheus_url": self.settings.PROMETHEUS_URL
        }
    
    def get_timeout_settings(self) -> Dict[str, Any]:
        """Get timeout-related settings"""
        return {
            "mcp_timeout": self.settings.MCP_TIMEOUT
        } 