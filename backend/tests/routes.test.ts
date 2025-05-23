import request from 'supertest';
import { app } from '../src/index';

jest.mock('../src/db', () => ({
  getDocumentById: jest.fn(async (id: number) => id === 1 ? { id: 1, status: 'completed' } : undefined),
  insertDocument: jest.fn(),
  updateDocumentStatusAndText: jest.fn(),
  initializeDatabase: jest.fn(),
  listDocuments: jest.fn().mockResolvedValue([{ id: 1, originalname: 'file.txt' }])
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

describe('GET /api/documents', () => {
  it('returns list of documents', async () => {
    const res = await request(app).get('/api/documents');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });
});
