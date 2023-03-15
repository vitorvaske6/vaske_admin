
import {object, string, boolean, TypeOf} from "zod";

const payload = {
    body: object({
        groupTitle: string({
            required_error: "Título do grupo é obrigatório."
        }),
        links: string({}).array()
    })
};

const params = {
    params: object({
        _id: string({
            required_error: "Id do grupo de relatório é obrigatório."
        })
    })
};

export const createReportGroupsSchema = object({
    ...payload
});

export const updateReportGroupsSchema = object({
    ...payload,
    ...params
});

export const findReportGroupsSchema = object({
    ...params
});

export const findAllReportGroupsSchema = object({});

export const deleteReportGroupsSchema = object({
    ...params
});

export type CreateReportGroupsInput = TypeOf<typeof createReportGroupsSchema>
export type UpdateReportGroupsInput = TypeOf<typeof updateReportGroupsSchema>
export type GetReportGroupsInput    = TypeOf<typeof findReportGroupsSchema>
export type GetAllReportGroupsInput = TypeOf<typeof findAllReportGroupsSchema>
export type DeleteReportGroupsInput = TypeOf<typeof deleteReportGroupsSchema>