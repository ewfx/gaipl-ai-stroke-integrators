const { PythonShell } = require('python-shell');
const path = require('path');

const processTelemetryData = async () => {
  return new Promise((resolve, reject) => {
    const options = {
      args: ['telemetry'],
      pythonPath: process.env.PYTHON_PATH || 'python',
      pythonOptions: ['-u'],
      scriptPath: path.join(__dirname, '..') // Point to the src directory
    };

    // Create a PythonShell instance
    const shell = new PythonShell('dataProcessor.py', options);

    let output = '';

    // Collect script output
    shell.on('message', (message) => {
      output += message;
    });

    // Handle script errors
    shell.on('error', (err) => {
      console.error('Error running dataProcessor.py for telemetry:', err);
      reject(err);
    });

    // Handle script completion
    shell.on('close', () => {
      try {
        console.log('Telemetry script output:', output);
        const result = JSON.parse(output);
        if (result.error) {
          reject(new Error(result.error));
        } else {
          resolve(result);
        }
      } catch (parseErr) {
        console.error('Error parsing dataProcessor.py output for telemetry:', parseErr);
        reject(parseErr);
      }
    });

    // Add a timeout of 10 seconds
    setTimeout(() => {
      shell.terminate(); // This will now work
      reject(new Error('Telemetry data processing timed out after 10 seconds'));
    }, 10000);
  });
};

const processEnterpriseData = async () => {
  return new Promise((resolve, reject) => {
    const options = {
      args: ['enterprise'],
      pythonPath: process.env.PYTHON_PATH || 'python',
      pythonOptions: ['-u'],
      scriptPath: path.join(__dirname, '..') // Point to the src directory
    };

    // Create a PythonShell instance
    const shell = new PythonShell('dataProcessor.py', options);

    let output = '';

    // Collect script output
    shell.on('message', (message) => {
      output += message;
    });

    // Handle script errors
    shell.on('error', (err) => {
      console.error('Error running dataProcessor.py for enterprise:', err);
      reject(err);
    });

    // Handle script completion
    shell.on('close', () => {
      try {
        console.log('Enterprise script output:', output);
        const result = JSON.parse(output);
        if (result.error) {
          reject(new Error(result.error));
        } else {
          resolve(result);
        }
      } catch (parseErr) {
        console.error('Error parsing dataProcessor.py output for enterprise:', parseErr);
        reject(parseErr);
      }
    });

    // Add a timeout of 10 seconds
    setTimeout(() => {
      shell.terminate(); // This will now work
      reject(new Error('Enterprise data processing timed out after 10 seconds'));
    }, 10000);
  });
};

module.exports = { processTelemetryData, processEnterpriseData };