# Integrated Platform Environment (IPE)

The Integrated Platform Environment (IPE) is a prototype application designed to assist with platform incident resolution. It integrates multiple components and technologies to provide a cohesive solution for monitoring, analyzing, and resolving platform incidents.

## Features
- **ChatbotComponent**: An AI-powered chatbot using the Gemini API to provide incident resolution guidance, with conversation history maintained using a custom `Map`-based memory implementation.
- **TelemetryComponent**: Displays telemetry data (CPU usage, memory usage, network latency) processed by Pandas, with incident probability predicted by Scikit-learn.
- **EnterpriseDataComponent**: Summarizes enterprise data (e.g., connected/disconnected sources, latest sync time) using Pandas.
- **ContextExtractionComponent**: Summarizes incident descriptions and extracts context (connectivity, dependencies) using Hugging Face.
- **Responsive UI**: A dashboard with a navbar, header, footer, and grid layout, styled with CSS and responsive across devices.

## Technologies Used
- **Frontend**: Angular 18, TypeScript, HTML, CSS
- **Backend**: Node.js, Express.js, Python (Pandas, Scikit-learn)
- **APIs**: Gemini API (chatbot), Hugging Face (context extraction)
- **Custom Memory**: A `Map`-based implementation for conversation history (replacing LangChain’s memory classes)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites
Before you begin, ensure you have the following installed:
- **Git**: To clone the repository. [Download Git](https://git-scm.com/downloads)
- **Node.js and npm**: Version 18.x or higher. [Download Node.js](https://nodejs.org/)
- **Python**: Version 3.8 or higher. [Download Python](https://www.python.org/downloads/)
  - Ensure Python is added to your system PATH.
- **Angular CLI**: Version 18.x. Install globally using:
  ```bash
  npm install -g @angular/cli
