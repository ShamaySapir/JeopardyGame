import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Grid } from "@mui/material";
import Card from "../components/Card";
import { groupBy, map } from "lodash";
import React, { useEffect, useState } from "react";

export default function Home() {
  const NUM_OF_ROWS = 5;
  const NUM_OF_COLS = 5;

  const [cards, setCards] = useState([]);
  useEffect(() => {
    const cardsData = Array.from(Array(NUM_OF_ROWS * NUM_OF_COLS).keys()).map(
      (id) => ({
        id,
        level: Math.floor(id / NUM_OF_ROWS) + 1,
        subject: "family" + Math.floor(id / NUM_OF_ROWS) + 1,
        question: "family" + Math.floor(id / NUM_OF_ROWS) + 1,
      })
    );

    const groupedByLevel = groupBy(cardsData, "level");
    setCards(groupedByLevel);
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main></main>
      <Grid container>
        {map(cards, (cardsLevel, level) => {
          return (
            // <Grid container direction="column">
            <Grid
              container
              item
              key={level}
              direction="row"
              padding={2}
              spacing={2}
            >
              {map(cardsLevel, ({ level, id, ...rest }) => (
                <Card key={id} prize={level * 100} {...rest} />
              ))}
            </Grid>
            // </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
