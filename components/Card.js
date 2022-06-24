// import * as React from "react";
import styles from "../styles/Home.module.css";
import FullScreenDialog from "./Dialog";

const Card = (props) => {
  const { prize, question, answer, ...other } = props;

  return (
    <div className={styles.card}>
      <h2>{prize} &rarr;</h2>
      <p>Find in-depth information about Next.js features and API.</p>
      <FullScreenDialog question={question} answer={answer} />
    </div>
  );
};

export default Card;
