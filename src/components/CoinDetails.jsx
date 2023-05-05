import {
  Box,
  Container,
  HStack,
  Radio,
  RadioGroup,
  VStack,
  Text,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import { server } from "../index";
import ErrorComponent from "./ErrorComponent";

const CoinDetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        console.log(data);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id]);

  if (error) return <ErrorComponent message={"Error while Fetching Coins"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={"full"} borderWidth={1}>
            coindetail
          </Box>

          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} padding={"16"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>
              Last updated on {Date().split("G")}
            </Text>

            <Image src={coin.image.large} />
          </VStack>
        </>
      )}
    </Container>
  );
};

export default CoinDetails;
