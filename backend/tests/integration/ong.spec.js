const req = require('supertest');
const app = require('../../src/app');
const conn = require('../../src/database/connection');

describe('ONG', () => {

  beforeEach(async () => {
    await conn.migrate.rollback();
    await conn.migrate.latest();
  });

  afterAll(async () => {
    await conn.destroy()
  });

  it('should be able to create a new ONG', async () => {
    const res = await req(app)
      .post('/ongs')
      .send({
        name: "JW",
        email: "contato@teste.com",
        whatsapp: "19000000000",
        city: "Campinas",
        uf: "SP"
      });

      expect(res.body).toHaveProperty('id');
      expect(res.body.id).toHaveLength(8);
  });

})