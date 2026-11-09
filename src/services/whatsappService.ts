export interface WhatsAppServerStatus {
  status: 'disconnected' | 'initializing' | 'qr_ready' | 'connecting' | 'connected' | 'simulated';
  qr?: string | null;
  error?: string | null;
  phone?: string | null;
}

export interface Recipient {
  phone: string;
  name: string;
}

class WhatsAppService {
  private baseUrl = '';
  private apiKey = ''; // Handled via Vite proxy or custom header

  constructor() {
    // If running in development with Vite proxy, requests to /api/whatsapp go to http://localhost:3005
    this.baseUrl = '';
  }

  public setApiKey(key: string) {
    this.apiKey = key;
  }

  public async getStatus(): Promise<WhatsAppServerStatus> {
    try {
      const res = await fetch('/api/whatsapp/status', {
        headers: this.apiKey ? { 'x-eik-api-key': this.apiKey } : {},
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      return await res.json();
    } catch (err) {
      // If local server is not running, return simulated standby
      return {
        status: 'simulated',
        error: 'WhatsApp local gateway (port 3005) not running. Using simulated dispatch mode.',
      };
    }
  }

  public async startWhatsApp(): Promise<any> {
    try {
      const res = await fetch('/api/whatsapp/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey ? { 'x-eik-api-key': this.apiKey } : {}),
        },
      });
      return await res.json();
    } catch (err) {
      return { success: false, error: 'Could not connect to WhatsApp backend' };
    }
  }

  public async restartWhatsApp(): Promise<any> {
    try {
      const res = await fetch('/api/whatsapp/restart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey ? { 'x-eik-api-key': this.apiKey } : {}),
        },
      });
      return await res.json();
    } catch (err) {
      return { success: false, error: 'Could not restart WhatsApp backend' };
    }
  }

  public async sendSingleMessage(
    phone: string,
    name: string,
    message: string
  ): Promise<{ success: boolean; mode: 'real' | 'simulated'; error?: string }> {
    try {
      const res = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey ? { 'x-eik-api-key': this.apiKey } : {}),
        },
        body: JSON.stringify({
          phone,
          name,
          message,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return { success: data.success !== false, mode: 'real' };
      }
    } catch (err) {
      // Backend not running, fall back gracefully
    }

    // Fallback simulation (Instant success for demo)
    return { success: true, mode: 'simulated' };
  }

  public async sendBulkMessages(
    recipients: Recipient[],
    message: string
  ): Promise<{ success: boolean; mode: 'real' | 'simulated'; sentCount: number }> {
    try {
      const res = await fetch('/api/whatsapp/broadcast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey ? { 'x-eik-api-key': this.apiKey } : {}),
        },
        body: JSON.stringify({
          recipients,
          message,
          delayMs: 1200,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        return { success: true, mode: 'real', sentCount: recipients.length };
      }
    } catch (err) {
      // Fallback
    }

    return { success: true, mode: 'simulated', sentCount: recipients.length };
  }
}

export const whatsappService = new WhatsAppService();

