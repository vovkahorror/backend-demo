import request from 'supertest'
import {CreateCourseModel} from '../../models/CreateCourseModel';
import {UpdateCourseModel} from '../../models/UpdateCourseModel';
import {app} from '../../app';

import {HTTP_STATUSES} from '../../common/enums/http-statuses';

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
        const data: CreateCourseModel = {title: ''};

        await request(app).
            post('/courses').
            send(data).
            expect(HTTP_STATUSES.BAD_REQUEST_400);

        await request(app).
            get('/courses').
            expect(HTTP_STATUSES.OK_200, []);
    })

    let createdCourse: any = null;

    it('should create course with correct input data', async () => {
        const data: CreateCourseModel = {title: 'turbo pascal'};

        const createdResponse = await request(app).
            post('/courses').
            send(data).
            expect(HTTP_STATUSES.CREATED_201);

        createdCourse = createdResponse.body;

        expect(createdCourse).toEqual({
            id: expect.any(Number),
            title: data.title
        })

        await request(app).
        get('/courses').
        expect(HTTP_STATUSES.OK_200, [createdCourse]);
    })

    it('should\'nt update course with incorrect input data', async () => {
        const data: UpdateCourseModel = {title: ''};

        await request(app).
            put(`/courses/${createdCourse.id}`).
            send(data).
            expect(HTTP_STATUSES.BAD_REQUEST_400);

        await request(app).
            get('/courses').
            expect(HTTP_STATUSES.OK_200, [createdCourse]);
    })

    it('should\'nt update not existing course', async () => {
        const data: UpdateCourseModel = {title: 'updated course'};

        await request(app).
            put('/courses/-100').
            send(data).
            expect(HTTP_STATUSES.NOT_FOUND_404);
    })

    it('should update course with correct input data', async () => {
        const data: UpdateCourseModel = {title: 'updated course'};

        await request(app).
            put(`/courses/${createdCourse.id}`).
            send(data).
            expect(HTTP_STATUSES.OK_200);

        await request(app).
            get('/courses').
            expect(HTTP_STATUSES.OK_200, [{
                ...createdCourse,
                title: data.title
            }]);
    })
})