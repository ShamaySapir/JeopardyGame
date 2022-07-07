import * as React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function NestedModal({
  isOpen,
  handleClose,
  isCorrectAnswer = true,
}) {
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal open={isOpen} onClose={() => handleClose(false)}>
        <Box sx={{ ...style, width: 400 }}>
          <Typography>{`${isCorrectAnswer}`}</Typography>
        </Box>
      </Modal>
    </div>
  );
}
