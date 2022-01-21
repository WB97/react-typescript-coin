import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorycal {
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
  const { isLoading, data } = useQuery<IHistorycal[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Chart Loading..."
      ) : (
        <ApexChart
          type="line"
          series={[{ data: data?.map((price) => price.close), name: "Price" }]}
          options={{
            chart: {
              width: 300,
              height: 500,
              background: "transparent",
            },
            xaxis: {
              categories: data?.map((date) => date.time_open.slice(0, 10)),
            },
            yaxis: {
              show: false,
            },
            stroke: { width: 3 },
            theme: { mode: "dark" },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
