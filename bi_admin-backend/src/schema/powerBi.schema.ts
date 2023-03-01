
import {object, string, boolean, TypeOf} from "zod";


const payload = {
    body: object({
        workspace: string({
            required_error: "Nome é obrigatório."
        }),
        reportId: string({
            required_error: "Título de menu é obrigatório"
        }),
    })
};

const params = {
    params: object({
        workspace: string({
            required_error: "Id do workspace é obrigatório."
        }),
        reportId: string({
            required_error: "Id do relatório é obrigatório."
        })
    })
};

const headers = {
    headers: object({
        workspace: string({
            required_error: "Id do workspace é obrigatório."
        }),
        reportId: string({
            required_error: "Id do relatório é obrigatório."
        })
    })
};

export const PowerBiSchema = object({
    ...payload
});

export type GetPowerBiInput = TypeOf<typeof PowerBiSchema>
