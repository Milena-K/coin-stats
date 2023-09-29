import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import "./style.scss"
import { useAppContext } from "context/AppContext"
import { useCallback, useEffect, useState } from "react"
import { formatPrice } from "helpers"

const Sidemenu = () =>  {
    const { coins, currentCoin, setCurrentCoin } = useAppContext()
    const [currentCoins, setCurrentCoins] = useState<Coin[]>()
    const [showMoreCoins, setShowMoreCoins] = useState(false)

    const handleCoin = (coin: Coin) => {
        setCurrentCoin(coin)
    }

    const handleMoreCoins = () => {
        if(!showMoreCoins) {
            setCurrentCoins(coins)
        }else {
            setCurrentCoins(coins?.slice(0,8))
        }
        setShowMoreCoins(!showMoreCoins)
    }

    useEffect(() => {
        if(coins) {
            setCurrentCoins(coins.slice(0,8))
        }

    }, [coins])

    const coinCards = useCallback(() => {
        return currentCoins?.map((coin) => (
            <div className={`coin ${ coin.uuid === currentCoin?.uuid && 'active'}`} key={coin.uuid} onClick={() => handleCoin(coin)}>
                <div className="coin__image">
                    <img src={coin.iconUrl} alt="ethereum" />
                </div>
                <div className="coin__text">
                    <p className="text-xs bold-400">{coin.name}</p>
                    <p className="text-xs text-gray">{formatPrice(coin.price)}</p>
                </div>
            </div>
        ))
    }, [showMoreCoins, currentCoins, currentCoin])

    const printDate = () =>  {
        const date = new Date()
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        return `${days[date.getDay() - 1]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    }


    return (
        <div className="sidemenu">
            <div className="sidemenu__left">
                <div className="logo">
                    <FontAwesomeIcon className="icon" icon={icon({name: "blogger", style: "brands"})} size="2x" />
                </div>

                <div className="icons">
                    <FontAwesomeIcon className="icon" icon={icon({name: "box-archive"})} size="lg"/>
                    <FontAwesomeIcon className="icon icon-active" icon={icon({name: "chart-pie"})} size="lg"/>
                    <FontAwesomeIcon className="icon" icon={icon({name: "layer-group"})} size="lg"/>
                    <FontAwesomeIcon className="icon" icon={icon({name: "chart-column"})} size="lg"/>
                    <FontAwesomeIcon className="icon" icon={icon({name: "layer-group"})} size="lg"/>
                </div>

                <div className="settings">
                    <FontAwesomeIcon className="icon" icon={icon({name: "gear"})} size="lg"/>
                </div>
            </div>

            <div className="sidemenu__right">
                <div className="sidemenu__right--assets">
                    <p className="bold-500">
                        Assets
                    </p>
                    <p className="date text-xs text-gray bold-400">
                        { printDate() }
                    </p>
                </div>

                <div className="sidemenu__right--coins">
                    <p className="text-gray text-xs mb-1">
                        Currency: <span className="text-black">USD</span>
                    </p>
                    { coinCards() }
                </div>
                <button className="show-more text-gray text-xs"
                    onClick={handleMoreCoins}
                >{showMoreCoins ? "Show less" : "Show full list"}</button>
            </div>
        </div>
    )
}

export default Sidemenu
