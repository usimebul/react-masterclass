import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data?.map((price) => {
                return { x: new Date(price.time_open), y: [price.open, price.high, price.low, price.close] }
              }),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              type: 'candlestick',
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
              animations: {
                enabled: true,
              }
            },
            grid: { show: false },
            yaxis: {
              show: false,
              tooltip: {
                enabled: true,                
              }
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
            },
            fill: {
              type: "gradient",
            },
            colors: ["#0fbcf9"],
            tooltip: {
              enabled: true,              
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
