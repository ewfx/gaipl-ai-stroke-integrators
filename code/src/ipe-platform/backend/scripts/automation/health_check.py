import sys
import requests
import json
from datetime import datetime

def check_service_health(service_id):
    """
    Perform health check for a given service
    """
    try:
        # Mock health check endpoints (replace with actual endpoints in production)
        endpoints = {
            'api': 'http://localhost:3000/api/health',
            'database': 'http://localhost:3000/db/health',
            'cache': 'http://localhost:3000/cache/health'
        }

        results = {
            'timestamp': datetime.now().isoformat(),
            'service_id': service_id,
            'checks': {}
        }

        for name, endpoint in endpoints.items():
            try:
                response = requests.get(endpoint, timeout=5)
                results['checks'][name] = {
                    'status': 'healthy' if response.status_code == 200 else 'unhealthy',
                    'response_time': response.elapsed.total_seconds(),
                    'status_code': response.status_code
                }
            except requests.RequestException as e:
                results['checks'][name] = {
                    'status': 'error',
                    'error': str(e)
                }

        # Calculate overall health status
        overall_status = all(
            check['status'] == 'healthy'
            for check in results['checks'].values()
        )

        results['overall_status'] = 'healthy' if overall_status else 'unhealthy'

        return results

    except Exception as e:
        return {
            'timestamp': datetime.now().isoformat(),
            'service_id': service_id,
            'error': str(e)
        }

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print(json.dumps({'error': 'Service ID is required'}))
        sys.exit(1)

    service_id = sys.argv[1]
    results = check_service_health(service_id)
    print(json.dumps(results)) 