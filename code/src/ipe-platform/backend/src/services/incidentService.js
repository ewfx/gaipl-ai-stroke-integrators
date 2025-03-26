const dataService = require('./dataService');
const feedbackService = require('./feedbackService');

class IncidentService {
  async analyzeIncident() {
    try {
      // Get telemetry data to analyze the incident using process_telemetry_data in dataProcessor.py
      const telemetryData = await dataService.getTelemetryData();

      // Check for high incident probability
      if (telemetryData.incident_probability > 0.5) {
        return {
          analysis: `High incident probability detected: ${telemetryData.incident_probability}. CPU Usage: ${telemetryData.cpu_usage}%, Network Latency: ${telemetryData.network_latency}ms.`,
          telemetry: telemetryData
        };
      }
      return {
        analysis: 'No significant incident probability detected.',
        telemetry: telemetryData
      };
    } catch (err) {
      throw new Error(`Failed to analyze incident: ${err.message}`);
    }
  }

  async proposeSolution(analysis) {
    try {
      // Check past feedback for similar incidents
      const pastFeedback = await feedbackService.getFeedback();
      const similarIncident = pastFeedback.find(f => f.incident === analysis);

      if (similarIncident) {
        return `Based on past successful resolutions, try: ${similarIncident.action}`;
      }
      return 'Restart the affected services to mitigate the issue.';
    } catch (err) {
      throw new Error(`Failed to propose solution: ${err.message}`);
    }
  }

  async executeAction(action) {
    try {
      // Simulate executing the action
      return `Action executed: ${action}`;
    } catch (err) {
      throw new Error(`Failed to execute action: ${err.message}`);
    }
  }

  async resolveIncident() {
    try {
      // Step 1: Analyze the incident
      const { analysis, telemetry } = await this.analyzeIncident();

      // Step 2: Propose a solution
      const solution = await this.proposeSolution(analysis);

      // Step 3: Execute the action
      const result = await this.executeAction(solution);

      // Step 4: Log the feedback
      await feedbackService.logFeedback({
        incident: analysis,
        action: solution,
        success: true // Assume success for now
      });

      return { analysis, solution, result, telemetry };
    } catch (err) {
      throw new Error(`Failed to resolve incident: ${err.message}`);
    }
  }
}

module.exports = new IncidentService();