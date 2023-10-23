"use strict";
import { fetchGetAllDataWithToken } from "../helpers/hooks/servicesHooks/useGetALLData";

export async function getAllEnProduccion() {
    const URL_GETALL = 'http://localhost:3000/api/getAllEnProduc';
    return fetchGetAllDataWithToken(URL_GETALL);
}