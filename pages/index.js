import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Grid, Typography, Snackbar, Alert, Button } from "@mui/material";
import Card from "../components/Card";
import { groupBy, map, reduce, sortBy, maxBy, minBy } from "lodash";
import React, { useEffect, useState } from "react";
import fetchClient from "../tools/requestor";
import WinningModal from "../components/winningModal";

const gameStates = {
  started: "started",
  ended: "ended",
};

export default function Home() {
  const [cards, setCards] = useState([]);
  const [scores, setScores] = useState({
    team1: { score: 0, displayname: "קבוצה 1" },
    team2: { score: 0, displayname: "קבוצה 2" },
  });
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(0);
  const [gameWinner, setGameWinner] = useState(null);
  const [gameState, setGameState] = useState(gameStates.started);

  const setScore = (correct, score) => {
    setScores((scores) => ({
      ...scores,
      [`team${currentTeam + 1}`]: {
        ...scores[`team${currentTeam + 1}`],
        score:
          scores[`team${currentTeam + 1}`].score + (correct ? +score * 100 : 0),
      },
    }));
    setCurrentTeam((currentTeam) => (currentTeam + 1) % 2);
  };
  const endGame = () => {
    let winner = maxBy(Object.values(scores), "score").displayname;
    const loser = minBy(Object.values(scores), "score").displayname;
    if (winner === loser) {
      winner = null;
    }
    setGameWinner(winner);
    setGameState(gameStates.ended);
  };
  const getAllQuestions = async () => {
    const rawQuestionsData = await fetchClient("listQuestions");
    const questions = reduce(
      rawQuestionsData.data,
      (acc, questionData) => {
        const question = {
          id: questionData.id,
          question: questionData.attributes.text,
          subject: questionData.attributes.category.substr(1),
          level: questionData.attributes.rank,
          type: questionData.attributes.type,
          possibleAnswers: questionData.attributes.possibleAnswers,
          correctAnswer: questionData.attributes.correctAnswer,
        };
        acc.push(question);
        return acc;
      },
      []
    );
    return questions;
  };
  useEffect(() => {
    async function fetchQuestions() {
      const cardsData = await getAllQuestions();
      const groupedByCategory = groupBy(cardsData, "subject");
      setCards(groupedByCategory);
    }
    fetchQuestions();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
      <Grid container direction="column">
        <Grid container item justifyContent="center">
          <Typography variant="h2">חידון היומולדת הגדול!</Typography>
        </Grid>
        <Grid item>
          <Grid container paddingLeft={15} paddingRight={15}>
            {map(cards, (cardsCategory, subject) => {
              return (
                <Grid
                  container
                  item
                  xs={3}
                  key={subject}
                  direction="column"
                  padding={2}
                  spacing={2}
                >
                  <Grid xs item textAlign="center">
                    <Typography variant="h4">{subject}</Typography>
                  </Grid>
                  {map(sortBy(cardsCategory, "level"), ({ id, ...rest }) => (
                    <Card
                      disabled={answeredQuestions.includes(id)}
                      key={id}
                      {...rest}
                      id={id}
                      scoresController={setScore}
                      markAnswered={setAnsweredQuestions}
                    />
                  ))}
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success">
          <Grid container>
            {Object.keys(scores).map((team) => (
              <Grid xs item padding={2} spacing={2} key={team}>
                <Typography>{`${scores[team].displayname} : ${scores[team].score}`}</Typography>
              </Grid>
            ))}
            <Grid container item justifyContent="center">
              <Typography>
                התור הנוכחי:{`${scores[`team${currentTeam + 1}`].displayname}`}
              </Typography>
            </Grid>
            <Grid container item justifyContent="center">
              <Button onClick={endGame}>סיים משחק</Button>
            </Grid>
          </Grid>
        </Alert>
      </Snackbar>
      <WinningModal
        isOpen={gameState === gameStates.ended}
        winner={gameWinner}
      />
    </div>
  );
}
