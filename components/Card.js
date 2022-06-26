// import * as React from "react";
// import styles from "../styles/Home.module.css";
// import CloseIcon from "@mui/icons-material/Close";
// import {
//   Button,
//   Dialog,
//   ListItemText,
//   ListItem,
//   List,
//   Divider,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Grid,
//   Slide,
// } from "@mui/material";

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// const Card = (props) => {
//   const { prize, id } = props;
//   const [open, setOpen] = React.useState(false);
//   const question = "";
//   const answer = "";
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   return (
//     <Grid item xs>
//       <div className={styles.card} onClick={handleClickOpen}>
//         <h2>{prize}</h2>
//       </div>
//       <Dialog
//         fullScreen
//         open={open}
//         onClose={handleClose}
//         TransitionComponent={Transition}
//       >
//         <AppBar sx={{ position: "relative" }}>
//           <Toolbar>
//             <IconButton
//               edge="start"
//               color="inherit"
//               onClick={handleClose}
//               aria-label="close"
//             >
//               <CloseIcon />
//             </IconButton>
//             <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
//               {question}
//             </Typography>
//             <Button autoFocus color="inherit" onClick={handleClose}>
//               {answer}
//             </Button>
//           </Toolbar>
//         </AppBar>
//         <List>
//           <ListItem button>
//             <ListItemText primary="Phone ringtone" secondary="Titania" />
//           </ListItem>
//           <Divider />
//           <ListItem button>
//             <ListItemText
//               primary="Default notification ringtone"
//               secondary="Tethys"
//             />
//           </ListItem>
//         </List>
//       </Dialog>
//     </Grid>
//   );
// };

// export default Card;
import * as React from "react";
import {
  CardActions,
  CardActionArea,
  CardContent,
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
  IconButton,
  Slide,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import { makeStyles } from "@mui/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BasicCard({ prize, id, question, answer = "" }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     // maxWidth: 345,
  //     margin: theme.spacing(0.5),
  //     padding: theme.spacing(0.8),
  //     borderRadius: theme.spacing(0),
  //     "& :hover": {
  //       backgroundColor: "green",
  //     },
  //   },
  //   media: {
  //     height: 140,
  //   },
  // }));
  // const classes = useStyles();

  return (
    <Grid item xs>
      <Card
        onClick={handleClickOpen}
        // className={classes.root}
        sx={{ root: { backgroundColor: "red" } }}
      >
        <CardHeader title={question}></CardHeader>
        <CardActionArea>
          <CardContent></CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </CardActionArea>
      </Card>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
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
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      </Dialog>
    </Grid>
  );
}
