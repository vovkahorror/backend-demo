export type CourseType = {
    id: number,
    title: string,
    studentsCount: number
};

export type DBType = { courses: CourseType[] }

export const db: DBType = {
    courses: [
        {id: 1, title: 'front-end', studentsCount: 8},
        {id: 2, title: 'back-end', studentsCount: 12},
        {id: 3, title: 'full-stack', studentsCount: 6},
        {id: 4, title: 'mobile', studentsCount: 10},
    ],
};