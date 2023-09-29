import { AxiosResponse } from "axios";
import { instances } from "./BaseService";

const { baseApiInstance } = instances;

const getCoins = async (): Promise<AxiosResponse<Coins>> => {
    return await baseApiInstance.get('/coins')
};

export const CoinService = {
    getCoins,
};
