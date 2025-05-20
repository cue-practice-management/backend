export const STUDENT_POPULATION_OPTIONS = {
    ACADEMIC_PROGRAM: {
        path: 'academicProgram',
        populate: {
            path: 'faculty',
        }
    },
    COMPANY: 'currentCompany',
}