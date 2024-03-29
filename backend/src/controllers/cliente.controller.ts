
import { Cliente } from "../models/cliente.model";
import { ClienteCreationResponse, ClienteListingResponse, ClienteService } from "../services/cliente.service";
import { ResultObject, error, success } from "../types";
import { z } from "zod";

/* CONTROLLER
*  Responsável por validar o payload entre outras possíveis
*  alterações no dado do request antes de enviar para que o
*  'service' realize alterações.
*/


export class ClienteController {
    public static async list(query: object): Promise<ResultObject<ClienteListingResponse>> {
        const service = new ClienteService();

        try {
            const q = "q" in query ? query.q as string : "";
            const result = await service.list(q);
            return success(result);
        } catch (_) {
            return error(
                500,
                "Erro interno.");
        }
    }

    public static async create(body: unknown): Promise<ResultObject<ClienteCreationResponse>> {
        const service = new ClienteService();

        const validator = z.object({
            nome: z.string().max(60),
            email: z.string().email().max(60),
            telefone: z.string().max(14),
            coord_x: z.number(),
            coord_y: z.number()
        });

        try {
            validator.parse(body);
        } catch (e) {
            return error(400, "payload inválido");
        }

        try {
            const payload = body as ClienteCreationPayload;
            const result = await service.create(payload);

            return success(result);
        } catch (_) {
            return error(500, "Erro Interno");
        }
    }
}

export type ClienteCreationPayload = Omit<Cliente, "id">;