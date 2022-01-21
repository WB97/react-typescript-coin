import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { mapQueryStatusFilter } from "react-query/types/core/utils";

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

const ChartBox = styled.div``;

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorycal[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <ChartBox>
      {isLoading ? (
        "Chart Loading..."
      ) : (
        <ApexChart
          type="line"
          series={[{ data: data?.map((price) => price.close), name: "Price" }]}
          options={{
            chart: {
              background: "transparent",
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#50a7c2"] },
            },
            colors: ["#50a7c2"],
            xaxis: {
              categories: data?.map(
                (date) => "Day " + date.time_open.slice(8, 10)
              ),
            },
            yaxis: {
              show: false,
            },
            tooltip: {
              y: { formatter: (value) => `$${value.toFixed(3)}` },
            },
            stroke: { width: 3 },
            theme: { mode: "dark" },
          }}
        />
      )}
    </ChartBox>
  );
}

export default Chart;
