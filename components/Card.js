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

export default function BasicCard({ subject, level, disabled, ...rest }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const noop = () => {};

  const rankedColors = {
    1: "#5658c1",
    2: "#56c1b0",
    3: "#a9c156",
    4: "#c18656",
    5: "#b81f1f",
  };
  return (
    <Grid item textAlign="center">
      <Card
        style={{
          backgroundColor: !disabled ? rankedColors[level] : "grey",
          minHeight: "12vh",
        }}
        onClick={(!disabled && handleClickOpen) || noop}
        disabled
      >
        <CardHeader title={level * 100}></CardHeader>
      </Card>
      <QuestionContent
        isOpen={open}
        handleClose={handleClose}
        {...rest}
        subject={subject}
        disabled={disabled}
        level={level}
      />
    </Grid>
  );
}
