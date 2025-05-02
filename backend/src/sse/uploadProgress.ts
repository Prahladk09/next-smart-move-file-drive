import { Request, Response } from 'express';

// Map to hold progress state for connected clients
const clients: Record<string, Response> = {};

// Subscribe to upload progress
export const subscribeUploadProgress = (req: Request, res: Response) => {
  const clientId = req.query.id as string;
  if (!clientId){
    res.status(400).send('Client ID required');
    return;
  }

  // Set SSE headers
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  // Add to clients
  clients[clientId] = res;

  console.log(`[SSE] Client connected: ${clientId}`);

  // Keep the connection open
  res.write('\n');

  // Remove client when connection closes
  req.on('close', () => {
    console.log(`[SSE] Client disconnected: ${clientId}`);
    delete clients[clientId];
  });
};

// Trigger progress update
export const emitProgress = (clientId: string, percent: number) => {
  const client = clients[clientId];
  if (!client) return;

  client.write(`data: ${JSON.stringify({ progress: percent })}\n\n`);
};
