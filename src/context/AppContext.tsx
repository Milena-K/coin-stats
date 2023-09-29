import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { CoinService } from "services/CoinService"

export type AppContextType = {
    coins: Coin[] | undefined,
    currentCoin: Coin | undefined,
    setCurrentCoin: (coin: Coin) => void,
}

export const AppContext = createContext<AppContextType | null>(null)

const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [coins, setCoins] = useState<Coin[]>()
    const [currentCoin, setCurrentCoin] = useState<Coin>()

    const value = {
        coins,
        currentCoin,
        setCurrentCoin,
    }

    const getCoins = async () => {
        const res = await CoinService.getCoins()
        const coins = res.data.data.coins
        setCoins(coins)
        return coins
    }

    useEffect(() => {
        getCoins().then(coins => setCurrentCoin(coins[0]))
    }, [])

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}

export default AppContextProvider

export const useAppContext = () => {
    const appContext = useContext(AppContext);

    if (!appContext) {
        throw new Error(
            "useAppContext has to be used within <AppContext.Provider>"
        );
    }

    return appContext;
};

export const useCoins = () => {
    const { coins } = useAppContext();

    if (!coins) {
        throw new Error(
            "still no coins."
        );
    }


    return coins;
};
