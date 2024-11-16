import request from 'supertest'
import {app, HTTP_STATUSES} from '../../../09';

describe('/course', () => {
    beforeAll(async () => {
        await request(app).delete('/__test__/data')
    })

    it('should return 200 and empty array',  async() => {
        await request(app).
            get('/courses').
            expect(HTTP_STATUSES.OK_200, []);
    })

    it('should return 404 for not existing course', async () => {
        await request(app).
            get('/courses/1').
            expect(HTTP_STATUSES.NOT_FOUND_404);
    })

    it('should\'nt create course with incorrect input data', async () => {
        await request(app).
            post('/courses').
            send({title: ''}).
            expect(HTTP_STATUSES.BAD_REQUEST_400);

        await request(app).
            get('/courses').
            expect(HTTP_STATUSES.OK_200, []);
    })

    it('should create course with correct input data', async () => {
        const createdResponse = await request(app).
            post('/courses').
            send({title: 'turbo pascal'}).
            expect(HTTP_STATUSES.CREATED_201);

        expect(createdResponse.body).toEqual({
            id: expect.any(Number),
            title: 'turbo pascal'
        })
    })
})