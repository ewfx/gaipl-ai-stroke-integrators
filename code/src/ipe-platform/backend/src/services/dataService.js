const { PythonShell } = require('python-shell');
const path = require('path');
const fs = require('fs');

class DataService {
  async getTelemetryData() {
    return new Promise((resolve, reject) => {
      const scriptPath = path.join(__dirname, '..');
      const scriptFullPath = path.join(scriptPath, 'dataProcessor.py');

      console.log('Debug: __dirname:', __dirname);
      console.log('Debug: scriptPath for telemetry:', scriptPath);
      console.log('Debug: scriptFullPath for telemetry:', scriptFullPath);

      if (!fs.existsSync(scriptFullPath)) {
        reject(new Error(`dataProcessor.py not found at ${scriptFullPath}`));
        return;
      }

      const options = {
        mode: 'text',
        pythonPath: process.env.PYTHON_PATH,
        scriptPath: scriptPath,
        args: ['telemetry'],
      };

      console.log('Debug: Python options:', options);

      const shell = new PythonShell('dataProcessor.py', options);

      let output = '';
      shell.on('message', (message) => {
        console.log('Debug: Python stdout:', message);
        output += message + '\n';
      });

      shell.on('stderr', (stderr) => {
        console.log('Debug: Python stderr:', stderr);
      });

      shell.on('error', (err) => {
        console.log('Debug: Python error:', err);
        reject(new Error(`Python script error: ${err.message}`));
      });

      shell.on('close', () => {
        console.log('Debug: Python script closed, raw output:', output);
        try {
          if (!output.trim()) {
            reject(new Error('No output received from dataProcessor.py for telemetry'));
          }
          const result = JSON.parse(output.trim());
          if (result.error) {
            reject(new Error(result.error));
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(new Error(`Error parsing dataProcessor.py output for telemetry: ${err.message}`));
        }
      });
    });
  }

  async getEnterpriseData() {
    return new Promise((resolve, reject) => {
      const scriptPath = path.join(__dirname, '..');
      const scriptFullPath = path.join(scriptPath, 'dataProcessor.py');

      console.log('Debug: __dirname:', __dirname);
      console.log('Debug: scriptPath for enterprise:', scriptPath);
      console.log('Debug: scriptFullPath for enterprise:', scriptFullPath);

      if (!fs.existsSync(scriptFullPath)) {
        reject(new Error(`dataProcessor.py not found at ${scriptFullPath}`));
        return;
      }

      const options = {
        mode: 'text',
        pythonPath: process.env.PYTHON_PATH,
        scriptPath: scriptPath,
        args: ['enterprise'],
      };

      console.log('Debug: Python options:', options);

      const shell = new PythonShell('dataProcessor.py', options);

      let output = '';
      shell.on('message', (message) => {
        console.log('Debug: Python stdout:', message);
        output += message + '\n';
      });

      shell.on('stderr', (stderr) => {
        console.log('Debug: Python stderr:', stderr);
      });

      shell.on('error', (err) => {
        console.log('Debug: Python error:', err);
        reject(new Error(`Python script error: ${err.message}`));
      });

      shell.on('close', () => {
        console.log('Debug: Python script closed, raw output:', output);
        try {
          if (!output.trim()) {
            reject(new Error('No output received from dataProcessor.py for enterprise'));
          }
          const result = JSON.parse(output.trim());
          if (result.error) {
            reject(new Error(result.error));
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(new Error(`Error parsing dataProcessor.py output for enterprise: ${err.message}`));
        }
      });
    });
  }
}

module.exports = new DataService();