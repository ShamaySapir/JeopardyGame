import * as React from "react";
import { Modal, Box, Typography, Grid } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { sample } from "lodash";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const failedTexts = [
  "פאדיחות, לא נורא פעם הבאה ילך יותר טוב",
  "פספסת אהו אהו פספסת",
  "שווה לשקול שבת אצל חיים להשלים פערים",
];
const successTexts = ["מצוין!", "ניכר שיש היכרות טובה! סחתיין", "בינגו!"];
const generateModalContent = (isSuccess) => {
  const Comp = isSuccess ? ThumbUpIcon : ThumbDownIcon;
  const text = isSuccess ? sample(successTexts) : sample(failedTexts);
  return (
    <Grid container direction="column">
      <Grid container item justifyContent="center">
        <Comp fontSize="large" />
      </Grid>

      <Grid item>
        <Typography variant="h4">{text}</Typography>
      </Grid>
    </Grid>
  );
};
export default function NestedModal({
  isOpen,
  handleClose,
  isCorrectAnswer = true,
}) {
  return (
    <div>
      <Modal open={isOpen} onClose={() => handleClose(false)}>
        <Box sx={{ ...style }}>{generateModalContent(isCorrectAnswer)}</Box>
      </Modal>
    </div>
  );
}
