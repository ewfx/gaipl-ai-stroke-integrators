from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from services.enterprise_service import EnterpriseService
from services.mcp_service import MCPService

router = APIRouter()

class DataSource(BaseModel):
    id: str
    name: str
    type: str
    connection_details: Dict[str, Any]
    last_sync: Optional[str] = None

class DataQuery(BaseModel):
    query: str
    data_sources: List[str]
    context: Optional[Dict[str, Any]] = None
    filters: Optional[Dict[str, Any]] = None

class ComponentDependency(BaseModel):
    component_id: str
    name: str
    type: str
    dependencies: List[str]
    health_status: str
    metrics: Dict[str, Any]

@router.post("/query", response_model=Dict[str, Any])
async def query_enterprise_data(query: DataQuery):
    """Query enterprise data sources using MCP"""
    try:
        enterprise_service = EnterpriseService()
        mcp_service = MCPService()
        
        # Process query through MCP
        processed_query = await mcp_service.process_query(query.query)
        
        # Execute query across data sources
        results = await enterprise_service.query_data_sources(
            processed_query,
            query.data_sources,
            query.context,
            query.filters
        )
        
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dependencies/{component_id}", response_model=ComponentDependency)
async def get_component_dependencies(component_id: str):
    """Get component dependencies and relationships"""
    try:
        enterprise_service = EnterpriseService()
        dependencies = await enterprise_service.get_component_dependencies(component_id)
        return dependencies
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/connectivity/{component_id}")
async def get_connectivity_info(component_id: str):
    """Get connectivity information for a component"""
    try:
        enterprise_service = EnterpriseService()
        connectivity = await enterprise_service.get_connectivity_info(component_id)
        return connectivity
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/data-sources", response_model=List[DataSource])
async def list_data_sources():
    """List available enterprise data sources"""
    try:
        enterprise_service = EnterpriseService()
        data_sources = await enterprise_service.list_data_sources()
        return data_sources
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/data-sources/{source_id}/sync")
async def sync_data_source(source_id: str):
    """Trigger synchronization for a specific data source"""
    try:
        enterprise_service = EnterpriseService()
        sync_result = await enterprise_service.sync_data_source(source_id)
        return sync_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 