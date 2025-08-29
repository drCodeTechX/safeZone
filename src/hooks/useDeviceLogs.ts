import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

export interface LogField {
  id: string;
  name: string;
  unit: string;
  color: string;
}

export interface DeviceLog {
  id: string;
  deviceId: string;
  deviceName: string;
  temperature?: number;
  humidity?: number;
  motion?: number;
  smoke?: number;
  batteryLevel: number;
  timestamp: string;
}

export function useDeviceLogs() {
  const [logs, setLogs] = useState<DeviceLog[]>([]);
  const [fields, setFields] = useState<LogField[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const baseUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch log fields
        const fieldsResponse = await fetch(`${baseUrl}/log-fields`);
        if (!fieldsResponse.ok) throw new Error('Failed to fetch log fields');
        const fieldsData = await fieldsResponse.json();
        setFields(fieldsData);
        
        // Set default selected field
        if (fieldsData.length > 0 && selectedFields.length === 0) {
          setSelectedFields([fieldsData[0].id]);
        }

        // Fetch logs
        const logsResponse = await fetch(`${baseUrl}/device-logs`);
        if (!logsResponse.ok) throw new Error('Failed to fetch device logs');
        const logsData = await logsResponse.json();
        setLogs(logsData);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Refresh data every minute
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleField = (fieldId: string) => {
    setSelectedFields(prev => 
      prev.includes(fieldId)
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  return {
    logs,
    fields,
    selectedFields,
    toggleField,
    loading,
    error
  };
}
