import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from "react-router-dom";
import { Container, AppBar, Toolbar, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import TimelineIcon from '@material-ui/icons/Timeline';
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginTop: "12px"
  }
}));

export default function Login() {
  const classes = useStyles();
  const { login } = useAuth();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      await login(email, password)
      history.push("/")
    } catch(error) {
      setError("Failed to log into your account!");
    }
    setLoading(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <AppBar position="fixed">
        <Toolbar>
          <TimelineIcon className={classes.icon} />
          <Typography variant="h6" color="inherit">
            IS - Realtime Data Visualization
        </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {error && <Alert className={classes.alert} severity="error">{error}</Alert>}
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              Need an account? <Link to="/signup" variant="body2">Sign Up</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}