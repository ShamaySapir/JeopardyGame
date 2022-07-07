import * as React from "react";
import {
  CardActions,
  CardActionArea,
  CardContent,
  Button,
  Card,
  CardHeader,
  Grid,
} from "@mui/material";
import QuestionContent from "./questionContent";

export default function BasicCard({ question, level, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const rankedColors = {
    1: "#5658c1",
    2: "#56c1b0",
    3: "#a9c156",
    4: "#c18656",
    5: "#b81f1f",
  };
  return (
    <Grid item xs>
      <Card
        style={{ backgroundColor: rankedColors[level] }}
        onClick={handleClickOpen}
      >
        <CardHeader title={question}></CardHeader>
        <CardActionArea>
          <CardContent></CardContent>
        </CardActionArea>
      </Card>
      <QuestionContent
        isOpen={open}
        handleClose={handleClose}
        {...rest}
        question={question}
        level={level}
      />
    </Grid>
  );
}
