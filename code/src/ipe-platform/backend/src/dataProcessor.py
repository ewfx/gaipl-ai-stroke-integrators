import pandas as pd
from sklearn.linear_model import LogisticRegression
import json
import sys
import traceback

def process_telemetry_data():
    try:
        # Sample telemetry data (replace with a real dataset in production)
        data = {
            "cpu_usage": [60, 70, 80, 50, 90, 30, 40, 85, 65, 55],
            "memory_usage": [40, 50, 60, 30, 70, 20, 25, 75, 45, 35],
            "network_latency": [80, 90, 100, 70, 110, 60, 65, 120, 85, 75],
            "incident": [0, 1, 1, 0, 1, 0, 0, 1, 0, 0]  # 1 = incident occurred, 0 = no incident
        }
        df = pd.DataFrame(data)

        # Train a simple model to predict incidents
        X = df[["cpu_usage", "memory_usage", "network_latency"]]
        y = df["incident"]
        model = LogisticRegression()
        model.fit(X, y)

        # Predict incident likelihood for the latest data point
        # Use a DataFrame to retain feature names
        latest_data = df[["cpu_usage", "memory_usage", "network_latency"]].iloc[-1:]
        incident_probability = model.predict_proba(latest_data)[0][1]  # Probability of incident

        # Summarize telemetry data
        summary = {
            "avg_cpu_usage": df["cpu_usage"].mean(),
            "avg_memory_usage": df["memory_usage"].mean(),
            "avg_network_latency": df["network_latency"].mean(),
            "incident_probability": float(incident_probability)  # Ensure JSON-serializable
        }
        return summary
    except Exception as e:
        return {"error": f"Error processing telemetry data: {str(e)}"}

def process_enterprise_data():
    try:
        # Sample enterprise data (replace with a real dataset in production)
        data = {
            "source": ["API_1", "API_2", "API_3", "API_4", "API_5"],
            "status": ["Connected", "Disconnected", "Connected", "Connected", "Disconnected"],
            "last_sync": ["2025-03-26 09:00", "2025-03-25 15:30", "2025-03-26 08:00", "2025-03-26 07:00", "2025-03-24 12:00"]
        }
        df = pd.DataFrame(data)

        # Summarize enterprise data
        summary = {
            "total_sources": int(len(df)),
            "connected_sources": int(len(df[df["status"] == "Connected"])),
            "disconnected_sources": int(len(df[df["status"] == "Disconnected"])),
            "latest_sync": str(df["last_sync"].max())
        }
        return summary
    except Exception as e:
        return {"error": f"Error processing enterprise data: {str(e)}"}

if __name__ == "__main__":
    try:
        # Read input from Node.js
        task = sys.argv[1] if len(sys.argv) > 1 else "telemetry"

        if task == "telemetry":
            result = process_telemetry_data()
        elif task == "enterprise":
            result = process_enterprise_data()
        else:
            result = {"error": "Invalid task"}

        # Output result as JSON
        print(json.dumps(result))
        sys.stdout.flush()  # Ensure output is flushed
    except Exception as e:
        error_message = {"error": f"Script execution failed: {str(e)}\n{traceback.format_exc()}"}
        print(json.dumps(error_message))
        sys.stdout.flush()