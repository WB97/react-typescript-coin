import {
  Switch,
  Route,
  Link,
  useParams,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0px 20px;
`;

const Header = styled.header`
  position: relative;
  width: 480px;
  margin: 0 auto;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackBtn = styled.div`
  position: absolute;
  left: 0;
  font-size: 50px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  font-weight: 400;
`;

const Contents = styled.section`
  max-width: 480px;
  margin: 0 auto;
`;

const Rank = styled.div`
  width: 100%;
  height: 10vh;
  margin-top: 20px;
  text-align: center;
  font-size: 28px;
  color: #89d0fd;
`;

const Description = styled.div`
  width: 100%;
  padding: 10px 20px;
  text-align: center;
  font-size: 18px;
  background-color: #363636;
  border-radius: 15px;
`;

const ArticleList = styled.ul`
  width: 100%;
  margin-top: 50px;
`;

const Article = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 18px;
  padding: 30px 0 10px 0;
  border-bottom: 1px solid #363636;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin-top: 30px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 35px;
  border-radius: 10px;
  font-size: 18px;
  text-transform: uppercase;
  background-color: ${(props) => (props.isActive ? "#d6d6d6" : "null")};
  transition: 0.2s;
  a {
    color: ${(props) => (props.isActive ? "#424242" : "#fff")};
  }
`;

const Loder = styled.div`
  text-align: center;
  margin-top: 20%;
  font-size: 36px;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

interface RouteState {
  state: {
    name: string;
  };
}

interface IInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<{ coinId: string }>();
  const { state } = useLocation() as RouteState;
  const chartMatch = useRouteMatch(`/${coinId}/chart`);
  const priceMatch = useRouteMatch(`/${coinId}/price`);

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfo>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
    // { refetchInterval: 5000 }
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPrice>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );

  const loading = infoLoading || tickersLoading;

  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<InfoData>();
  // const [coinPrice, setPrice] = useState<PriceData>();

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPrice(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>

      <Header>
        <BackBtn>
          <Link to={`/`}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </Link>
        </BackBtn>
        <Title>
          {state?.name
            ? state.name
            : loading
            ? "Please visit through home"
            : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loder>Loading...</Loder>
      ) : (
        <Contents>
          <Rank>Rank {infoData?.rank}</Rank>
          <Description>{infoData?.description}</Description>
          <ArticleList>
            <Article>
              <span>Price </span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </Article>
            <Article>
              <span>Total_supply </span>
              <span>{tickersData?.total_supply}</span>
            </Article>
            <Article>
              <span>Open source </span>
              <span>{infoData?.open_source ? "YES" : "NO"}</span>
            </Article>
          </ArticleList>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
            <Route path={`/${coinId}/price`}>
              <Price />
            </Route>
          </Switch>
        </Contents>
      )}
    </Container>
  );
}

export default Coin;
