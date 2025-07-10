import { CreateStoreInterface } from "@/@types/interface";
import catchAsync from "@/handlers/async.handler";
import { APIError } from "@/utils/APIError";
import { Request, Response } from "express";

const createStore = catchAsync(async (req: Request, res: Response) => {
    const { name } = req.body as CreateStoreInterface
    if (!name) {
        throw new APIError(
            400,
            "Missing required fields: name is required"
        );
    }
    try {
         
    } catch (error:any) {
        if (error instanceof APIError) throw error;
        throw new APIError(500, error.message);
    }
});

const deleteStore = catchAsync(async (req: Request, res: Response) => {
    try {
        
    } catch (error:any) {
        if (error instanceof APIError) throw error;
        throw new APIError(500, error.message);
    }
});

export default {
    createStore,
    deleteStore
}
