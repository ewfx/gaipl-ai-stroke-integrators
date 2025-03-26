const axios = require('axios');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

class AgenticService {
  constructor() {
    this.incidentApiUrl = process.env.INCIDENT_API_URL || 'http://localhost:3001/api/incidents';
    this.automationScriptsPath = process.env.AUTOMATION_SCRIPTS_PATH || './scripts/automation';
  }

  async launchHealthCheck(serviceId) {
    try {
      // Execute health check script
      const { stdout, stderr } = await execAsync(`python ${this.automationScriptsPath}/health_check.py ${serviceId}`);
      return {
        status: 'success',
        output: stdout,
        error: stderr
      };
    } catch (error) {
      return {
        status: 'error',
        error: error.message
      };
    }
  }

  async generateRCA(incidentId) {
    try {
      // Fetch incident details
      const incidentResponse = await axios.get(`${this.incidentApiUrl}/${incidentId}`);
      const incident = incidentResponse.data;

      // Generate RCA using Gemini API
      const rcaPrompt = `Generate a detailed Root Cause Analysis for incident ${incidentId} with the following details: ${JSON.stringify(incident)}`;
      const rcaResponse = await this.getGeminiResponse(rcaPrompt);

      // Store RCA
      await axios.post(`${this.incidentApiUrl}/${incidentId}/rca`, {
        analysis: rcaResponse,
        timestamp: new Date().toISOString()
      });

      return {
        status: 'success',
        rca: rcaResponse
      };
    } catch (error) {
      return {
        status: 'error',
        error: error.message
      };
    }
  }

  async executeAutomation(scriptName, params) {
    try {
      const scriptPath = `${this.automationScriptsPath}/${scriptName}.py`;
      const paramString = Object.entries(params)
        .map(([key, value]) => `--${key} ${value}`)
        .join(' ');

      const { stdout, stderr } = await execAsync(`python ${scriptPath} ${paramString}`);
      return {
        status: 'success',
        output: stdout,
        error: stderr
      };
    } catch (error) {
      return {
        status: 'error',
        error: error.message
      };
    }
  }

  async getRelatedIncidents(incidentId) {
    try {
      const response = await axios.get(`${this.incidentApiUrl}/${incidentId}/related`);
      return {
        status: 'success',
        incidents: response.data
      };
    } catch (error) {
      return {
        status: 'error',
        error: error.message
      };
    }
  }

  async getGeminiResponse(prompt) {
    const { getGeminiResponse } = require('./geminiService');
    return await getGeminiResponse(prompt, 'rca');
  }
}

module.exports = new AgenticService(); 