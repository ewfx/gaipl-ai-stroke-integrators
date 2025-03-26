import pandas as pd
import json
import sys
from sklearn.linear_model import LogisticRegression
import numpy as np

def process_telemetry_data():
    try:
        print("Debug: Starting process_telemetry_data", file=sys.stderr)
        df = pd.DataFrame({
            "cpu_usage": [62.8, 55.1, 70.3, 45.9, 80.2],
            "memory_usage": [45.2, 50.7, 38.9, 60.1, 42.3],
            "network_latency": [88.5, 92.1, 78.3, 95.4, 85.7],
            "incident": [1, 0, 1, 0, 1]
        })

        print("Debug: DataFrame created", file=sys.stderr)
        X = df[["cpu_usage", "memory_usage", "network_latency"]]
        y = df["incident"]
        model = LogisticRegression()
        model.fit(X, y)

        print("Debug: Model trained", file=sys.stderr)
        latest_data = df[["cpu_usage", "memory_usage", "network_latency"]].iloc[-1:]
        incident_probability = model.predict_proba(latest_data)[0][1]

        print("Debug: Incident probability calculated", file=sys.stderr)
        summary = {
            "cpu_usage": df["cpu_usage"].mean(),
            "memory_usage": df["memory_usage"].mean(),
            "network_latency": df["network_latency"].mean(),
            "incident_probability": incident_probability
        }
        print("Debug: Summary created:", summary, file=sys.stderr)
        return summary
    except Exception as e:
        print("Debug: Error in process_telemetry_data:", str(e), file=sys.stderr)
        return {"error": f"Error processing telemetry data: {str(e)}"}

def process_enterprise_data():
    try:
        print("Debug: Starting process_enterprise_data", file=sys.stderr)
        sources = ["Service A", "Service B", "Service C", "Service D", "Service E"]
        status = ["Connected", "Disconnected", "Connected", "Disconnected", "Connected"]
        last_sync = ["2025-03-26 09:00", "2025-03-26 08:30", "2025-03-26 09:00", "2025-03-26 08:00", "2025-03-26 09:00"]

        summary = {
            "sources": sources,
            "status": status,
            "lastSync": last_sync,
            "total_sources": len(sources),
            "connected_sources": status.count("Connected"),
            "disconnected_sources": status.count("Disconnected"),
            "latest_sync": max(last_sync)
        }
        print("Debug: Enterprise summary created:", summary, file=sys.stderr)
        return summary
    except Exception as e:
        print("Debug: Error in process_enterprise_data:", str(e), file=sys.stderr)
        return {"error": f"Error processing enterprise data: {str(e)}"}

if __name__ == "__main__":
    print("Debug: Script started", file=sys.stderr)
    data_type = sys.argv[1] if len(sys.argv) > 1 else "telemetry"
    print("Debug: Data type:", data_type, file=sys.stderr)
    if data_type == "telemetry":
        result = process_telemetry_data()
    else:
        result = process_enterprise_data()
    print("Debug: Final result:", result, file=sys.stderr)
    print(json.dumps(result))