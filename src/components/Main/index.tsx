import StyledInfo from "components/StyledInfo"
import { useAppContext } from "context/AppContext"
import { formatPrice } from "helpers"
import "./style.scss"
import Plot from 'react-plotly.js'
import Table from "components/Table"

const Main = () => {
    const { currentCoin } = useAppContext()
    const createPlot = () => {
        if(!currentCoin) return;
        const x = currentCoin.sparkline.map((_, i) => i)
        return (
            <Plot
                data={[
                {
                    x,
                    y: currentCoin.sparkline,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                },
                {type: 'scatter', x, y: currentCoin.sparkline},
                ]}
                useResizeHandler={true}
                style={{width: "100%", height: "50vh"}}
                layout={{
                    showlegend: false,
                    paper_bgcolor: "#f9f9f9",
                    plot_bgcolor: "#f9f9f9",
                }}
            />
        )
    }

    return (
        <div className="main">
            <div className="main__top">
                <StyledInfo>
                    <p className="title">Market Cap:</p>
                    <p className="price">{formatPrice(currentCoin?.marketCap)}</p>
                </StyledInfo>
                <StyledInfo>
                    <p className="title">24h Vol:</p>
                    <p className="price">{currentCoin && formatPrice(currentCoin["24hVolume"])}</p>
                </StyledInfo>
            </div>
            <div className="main__mid">
                <div className="main__mid--left">
                    <p className="bold-500 text-xs">
                        {currentCoin?.name} Price
                    </p>
                    <p className="text-lg bold-700">
                        {formatPrice(currentCoin?.price).slice(1)}
                        <span className="fw-300"> USD</span>
                    </p>
                    <p className="text-active">
                        {currentCoin?.change}%
                    </p>
                </div>
                <div className="main__mid--right">
                    <StyledInfo className="border-left">
                        <p className="title">
                            Price:
                        </p>
                        <p className="price">
                            {formatPrice(currentCoin?.price)}
                        </p>
                    </StyledInfo>
                    <StyledInfo className="border-left">
                        <p className="title">
                            Change:
                        </p>
                        <p className="price">
                            {currentCoin?.change}
                        </p>
                    </StyledInfo>
                </div>
            </div>
            { createPlot() }
            <Table/>
        </div>
    )
}

export default Main
