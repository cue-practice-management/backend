import { PipelineStage } from "mongoose";
import { PracticeProcessStatus } from "practice-process/enums/practice-process.enums";

export function groupStudentsByAcademicProgramAggregation(): PipelineStage[] {
    return [
        {
            $group: {
                _id: '$academicProgram',
                count: { $sum: 1 },
            },
        },
        {
            $lookup: {
                from: 'academicprograms',
                localField: '_id',
                foreignField: '_id',
                as: 'program',
            },
        },
        { $unwind: '$program' },
        {
            $project: {
                name: '$program.name',
                value: '$count',
            },
        },
        { $sort: { value: -1 } },
    ];
}

export function groupActivePracticesByCompanyAggregation(): PipelineStage[] {
    return [
        {
            $match: { status: PracticeProcessStatus.IN_PROGRESS },
        },
        {
            $group: {
                _id: '$company',
                count: { $sum: 1 },
            },
        },
        {
            $lookup: {
                from: 'companies',
                localField: '_id',
                foreignField: '_id',
                as: 'company',
            },
        },
        { $unwind: '$company' },
        {
            $project: {
                name: '$company.name',
                value: '$count',
                _id: 0,
            },
        },
        { $sort: { value: -1 } },
    ];
}


export function groupCompaniesByProgramAggregation(): PipelineStage[] {
    return [
        { $unwind: '$associatedAcademicPrograms' },
        {
            $group: {
                _id: '$associatedAcademicPrograms',
                count: { $sum: 1 },
            }
        },
        {
            $lookup: {
                from: 'academicprograms',
                localField: '_id',
                foreignField: '_id',
                as: 'program'
            }
        },
        { $unwind: '$program' },
        {
            $project: {
                name: '$program.name',
                value: '$count',
                _id: 0
            }
        },
        { $sort: { value: -1 } }
    ];
}

export function groupCompaniesByCityAggregation(): PipelineStage[] {
    return [
        {
            $group: {
                _id: '$city',
                count: { $sum: 1 },
            },
        },
        {
            $lookup: {
                from: 'cities',
                localField: '_id',
                foreignField: '_id',
                as: 'city'
            },
        },
        { $unwind: '$city' },
        {
            $project: {
                name: '$city.name',
                value: '$count',
            },
        },
        { $sort: { value: -1 } }
    ];
}