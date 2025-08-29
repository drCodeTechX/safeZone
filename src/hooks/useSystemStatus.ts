import { useState, useEffect } from 'react';

interface SystemStatus {
  online: number;
  offline: number;
  alerts: number;
  isSystemSafe: boolean;
}

export function useSystemStatus() {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const [status, setStatus] = useState<SystemStatus>({
    online: 0,
    offline: 0,
    alerts: 0,
    isSystemSafe: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSystemStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/system-status`);
        if (!response.ok) {
          throw new Error('Failed to fetch system status');
        }
        const data = await response.json();
        setStatus({
          online: data.onlineDevices || 0,
          offline: data.offlineDevices || 0,
          alerts: data.activeAlerts || 0,
          isSystemSafe: data.activeAlerts === 0
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch system status');
      } finally {
        setLoading(false);
      }
    };

    fetchSystemStatus();
    // Poll every 30 seconds
    const interval = setInterval(fetchSystemStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return { status, loading, error };
}
