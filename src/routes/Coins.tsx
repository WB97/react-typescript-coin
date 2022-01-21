import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.section`
  max-width: 480px;
  margin: 0 auto;
`;

const CoinList = styled.ul`
  color: lightskyblue;
`;

const Coin = styled.li`
  width: 100%;
  background-color: #363636;
  padding: 5px 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 700;
  a {
    display: flex;
    align-items: center;
    padding: 15px 0;
    &:hover {
      color: ${(props) => props.theme.linkHoverColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  font-weight: 400;
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

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await res.json();
  //     setCoins(json.slice(0, 100));
  //     // setTimeout(() => setLoding(false), 1000);
  //     setLoading(false);
  //   })();
  // }, []);
  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coin</Title>
      </Header>
      <Contents>
        {isLoading ? (
          <Loder>Loading...</Loder>
        ) : (
          <CoinList>
            {data?.slice(0, 50).map((coin) => (
              <Coin key={coin.id}>
                <Link
                  to={{
                    pathname: `/${coin.id}`,
                    state: { name: coin.name },
                  }}
                >
                  <Img
                    src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name}
                </Link>
              </Coin>
            ))}
          </CoinList>
        )}
      </Contents>
    </Container>
  );
}

export default Coins;
