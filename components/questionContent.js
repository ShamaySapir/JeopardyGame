import * as React from "react";
import {
  Button,
  Typography,
  Dialog,
  ListItemText,
  List,
  AppBar,
  Toolbar,
  ListItemButton,
  IconButton,
  Slide,
  Grid,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "./modal";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BasicCard({
  prize,
  id,
  isOpen,
  handleClose,
  question,
  answer = "",
  level,
  type,
  subject,
  possibleAnswers,
  correctAnswer,
  scoresController,
  markAnswered,
}) {
  const [selected, setSelected] = React.useState(new Set());
  const [selectedIndex, setSelectedIndex] = React.useState(new Set());
  const [questionAnswered, setQuestionAnswered] = React.useState(false);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = React.useState(false);
  const onSelect = (ans, idx, correctAnswer, id) => {
    // if (selectedIndex.has(idx)) {
    //   // remove answer
    //   setSelectedIndex(
    //     (selectedIdx) =>
    //       new Set([...Array.from(selectedIdx)].filter((elem) => elem !== idx))
    //   );
    //   setSelected(
    //     (selected) =>
    //       new Set([...Array.from(selected)].filter((elem) => elem !== ans))
    //   );
    // } else {
    setSelectedIndex(
      (selectedIdx) => new Set([...Array.from(selectedIdx), idx])
    );
    setSelected((selected) => new Set([...Array.from(selected), ans]));
    setQuestionAnswered(true);
    // }
    const isAnsweredCorrectly = correctAnswer === idx;
    setIsAnsweredCorrectly(isAnsweredCorrectly);
    scoresController(isAnsweredCorrectly, level);
    markAnswered((answered) => [...answered, id]);
  };
  return (
    <>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
        dir="rtl"
      >
        <AppBar sx={{ position: "relative" }} dir="rtl">
          <Toolbar variant="dense">
            <Grid container textAlign="center">
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {subject}-{level * 100}
              </Typography>
            </Grid>
            <Button autoFocus color="inherit" onClick={handleClose}>
              <IconButton edge="start" color="inherit" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Button>
          </Toolbar>
        </AppBar>

        <Grid container xs item justifyContent="center" direction="column">
          <Grid item textAlign="center">
            <Typography variant="h2">{question}</Typography>
          </Grid>
          <Grid item xs style={{ alignSelf: "center" }}>
            <List>
              {possibleAnswers.map((ans, idx) => (
                <Grid item xs key={idx}>
                  <ListItemButton
                    key={idx}
                    selected={selectedIndex.has(idx)}
                    onClick={() => onSelect(ans, idx, correctAnswer, id)}
                  >
                    <ListItemText primary={ans} />
                  </ListItemButton>
                </Grid>
              ))}
            </List>
          </Grid>
        </Grid>
      </Dialog>
      <Modal
        isOpen={questionAnswered}
        handleClose={setQuestionAnswered}
        isCorrectAnswer={isAnsweredCorrectly}
      />
    </>
  );
}
