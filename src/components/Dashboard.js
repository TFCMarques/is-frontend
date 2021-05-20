import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import { makeStyles } from "@material-ui/core/styles";
import TimelineIcon from '@material-ui/icons/Timeline';
import { useHistory } from "react-router-dom";
import { AppBar, Slider, Grid, Toolbar, Typography, Button } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { firebase } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const rates = [
  { value: 1, label: "1s" },
  { value: 5, label: "5s" },
  { value: 10, label: "10s" },
  { value: 15, label: "15s" },
  { value: 30, label: "30s" },
  { value: 60, label: "60s" },
]

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  icon: {
    marginRight: theme.spacing(2)
  },
  grid: {
    marginTop: "125px"
  },
  errorGrid: {
    marginTop: "89px"
  },
  slider: {
    marginTop: "50px",
    width: "400px"
  },
  appbar: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  const database = firebase.database();
  const [currentRate, setCurrentRate] = useState(1);
  const currentRateRef = database.ref("config/current_rate");

  useEffect(() => {
    currentRateRef.on("value", (snapshot) => {
      const value = snapshot.val();
      setCurrentRate(value);
    });
  }, [currentRateRef]);

  const [error, setError] = useState("");
  const { logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to logout from your account!");
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.appbar}>
        <AppBar position="fixed">
          <Toolbar>
            <TimelineIcon className={classes.icon} />
            <Typography className={classes.title} variant="h6" color="inherit">
              IS - Realtime Data Visualization
          </Typography>
            <Button onClick={handleLogout} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.toolbar} />
      {error && <Alert severity="error">{error}</Alert>}
      <Grid className={error ? classes.errorGrid : classes.grid} container direction="column" justify="center" alignItems="center">
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item align="center">
            <Typography>
              Acceleration in the X-Axis:
          </Typography>
            <Chart type="accelX" />
          </Grid>
          <Grid item align="center">
            <Typography>
              Acceleration in the Y-Axis:
          </Typography>
            <Chart type="accelY" />
          </Grid>
          <Grid item align="center">
            <Typography>
              Acceleration in the Z-Axis:
          </Typography>
            <Chart type="accelZ" />
          </Grid>
        </Grid>
        <Grid className={classes.slider} item>
          <Typography>
            Current rate:
        </Typography>
          <Slider
            key={`slider-${currentRate}`}
            defaultValue={currentRate}
            aria-labelledby="discrete-slider-restrict"
            step={null}
            marks={rates}
            max={60}
            min={1}
            onChangeCommitted={(_, value) => {
              database.ref("config").update({ "current_rate": value })
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}