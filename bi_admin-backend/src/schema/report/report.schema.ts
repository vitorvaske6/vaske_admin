
import {object, string, boolean, TypeOf} from "zod";


const payload = {
    body: object({
        name: string({
            required_error: "Nome é obrigatório."
        }),
        menuTitle: string({
            required_error: "Título de menu é obrigatório"
        }),
        description: string({}),
        active: boolean({}),
        reportId: string({
            required_error: "Id do relatório é obrigatório."
        }),
        workspace: string({
            required_error: "Id do workspace é obrigatório."
        }),
    })
};

const params = {
    params: object({
        _id: string({
            required_error: "Id do relatório é obrigatório."
        })
    })
};

export const createReportSchema = object({
    ...payload
});

export const updateReportSchema = object({
    ...payload,
    ...params
});

export const findReportSchema = object({
    ...params
});

export const findAllReportSchema = object({});

export const deleteReportSchema = object({
    ...params
});

export type CreateReportInput = TypeOf<typeof createReportSchema>
export type UpdateReportInput = TypeOf<typeof updateReportSchema>
export type GetReportInput    = TypeOf<typeof findReportSchema>
export type GetAllReportInput = TypeOf<typeof findAllReportSchema>
export type DeleteReportInput = TypeOf<typeof deleteReportSchema>