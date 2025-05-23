import request from 'supertest';
import { app } from '../src/index';

jest.mock('../src/db', () => ({
  getDocumentById: jest.fn(async (id: number) => id === 1 ? { id: 1, status: 'completed' } : undefined),
  insertDocument: jest.fn(),
  updateDocumentStatusAndText: jest.fn(),
  initializeDatabase: jest.fn(),
  listDocuments: jest.fn().mockResolvedValue([])
}));

describe('GET /api/document/:id', () => {
  it('returns 404 for missing document', async () => {
    const res = await request(app).get('/api/document/2');
    expect(res.status).toBe(404);
  });

  it('returns document when found', async () => {
    const res = await request(app).get('/api/document/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });
});
