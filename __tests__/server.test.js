'use strict'

const {app}= require('../src/server')
const {db} =require('../src/models/index')
const supertest= require('supertest');
const mockServerMethods= supertest(app)


// beforeAll function is a setup function provided by the testing framework (such as Jest), beforeAll is used to synchronize the database (db.sync()) before running the test cases. This ensures that the database schema is created and any necessary migrations or initializations are performed before the tests are executed. 
beforeAll(async()=>{
    await db.sync();
});

describe('testing my server',()=>{
    it('testing home route',async()=>{
        const response= await mockServerMethods.get('/')
        expect(response.status).toBe(200)
    })
    it('testing wrong routes', async()=>{
        const response= await mockServerMethods.get('/nod');
        expect(response.status).toBe(404)
    });
    it('testing if can add customer', async()=>{
        const response= await mockServerMethods.post('/customer').send({
            firstName:'Anas'
        })
        expect(response.status).toBe(201)
    })
    it('can read all data', async()=>{
        const response = await mockServerMethods.get('/customer');
        expect(response.status).toBe(200);
    })
    it('can update customer', async () => {
        const response = await mockServerMethods.put('/customer/1');
        expect(response.status).toBe(201);
    });
    it('can delete customer', async () => {
        const response = await mockServerMethods.delete('/customer/1');
        expect(response.status).toBe(204);
    });

    // it('testing if can add cloth', async()=>{
    //     const response= await mockServerMethods.post('/cloth').send({
    //         clothType:'suit',
    //         color: 'blue',
    //         customerId:1
    //     })
    //     expect(response.status).toBe(201)
    // })
    it('can read all data', async()=>{
        const response = await mockServerMethods.get('/cloth');
        expect(response.status).toBe(200);
    })
    // it('can update cloth', async () => {
    //     const response = await mockServerMethods.put('/cloth/1');
    //     expect(response.status).toBe(201);
    // });
    it('can delete cloth', async () => {
        const response = await mockServerMethods.delete('/cloth/1');
        expect(response.status).toBe(204);
    });
})

afterAll(async()=>{
    await db.sync();
})