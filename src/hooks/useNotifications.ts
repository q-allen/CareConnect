"use client";

import { useEffect, useRef } from "react";
import { getBaseUrl } from "@/services/api";
import { useNotificationStore } from "@/store";
import { useAuthStore } from "@/store";
import { Notification } from "@/types";
import { notificationService } from "@/services/notificationService";

export function useNotifications() {
  const user = useAuthStore((s) => s.user);
  const { addNotification, setNotifications } = useNotificationStore();
  const wsRef = useRef<WebSocket | null>(null);
  const retryRef = useRef(0);
  const shouldReconnectRef = useRef(true);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!user) return;

    const base = getBaseUrl();
    if (!base) return;

    const wsUrl = base.replace(/^http/, "ws").replace(/\/$/, "") + "/ws/notifications/";
    shouldReconnectRef.current = true;

    notificationService.getNotifications(String(user.id)).then((res) => {
      if (res.success && res.data) setNotifications(res.data);
    });

    const connect = () => {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => { retryRef.current = 0; };

      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type !== "notification") return;
          const notif: Notification = {
            id:        String(payload.id),
            userId:    user.id,
            type:      payload.notif_type,
            title:     payload.title,
            message:   payload.message,
            isRead:    false,
            data:      payload.data ?? {},
            createdAt: payload.created_at,
          };
          addNotification(notif);
        } catch {
          // ignore malformed frames
        }
      };

      ws.onclose = () => {
        if (shouldReconnectRef.current) {
          const delay = Math.min(10000, 1000 * 2 ** retryRef.current);
          retryRef.current += 1;
          reconnectTimerRef.current = setTimeout(connect, delay);
        }
      };

      ws.onerror = () => { try { ws.close(); } catch { /* ignore */ } };
    };

    connect();

    return () => {
      shouldReconnectRef.current = false;
      clearTimeout(reconnectTimerRef.current);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps
}
