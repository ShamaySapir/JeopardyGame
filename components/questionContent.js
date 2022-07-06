import * as React from "react";
import {
  Button,
  Typography,
  Card,
  Dialog,
  ListItemText,
  ListItem,
  List,
  Divider,
  CardHeader,
  AppBar,
  Toolbar,
  ListItemButton,
  IconButton,
  Slide,
  Grid,
  Radio,
  RadioGroup,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
  possibleAnswers,
}) {
  const [selected, setSelected] = React.useState(new Set());
  const [selectedIndex, setSelectedIndex] = React.useState(new Set());

  const onSelect = (ans, idx) => {
    if (selectedIndex.has(idx)) {
      // remove answer
      setSelectedIndex(
        (selectedIdx) =>
          new Set([...Array.from(selectedIdx)].filter((elem) => elem !== idx))
      );
      setSelected(
        (selected) =>
          new Set([...Array.from(selected)].filter((elem) => elem !== ans))
      );
    } else {
      setSelectedIndex(
        (selectedIdx) => new Set([...Array.from(selectedIdx), idx])
      );
      setSelected((selected) => new Set([...Array.from(selected), ans]));
    }
  };
  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      dir="rtl"
    >
      <AppBar sx={{ position: "relative" }} dir="rtl">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {question}
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            {answer}
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        {possibleAnswers.map((ans, idx) => (
          <ListItemButton
            key={idx}
            selected={selectedIndex.has(idx)}
            // selected={selectedIndex.has(idx)}
            onClick={() => onSelect(ans, idx)}
          >
            <ListItemText primary={ans} />
          </ListItemButton>
        ))}
      </List>
    </Dialog>
  );
}
