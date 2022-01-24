import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { Box, Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, userLogin } from "../actions";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const dataReducer = useSelector((state) => state.data);
  const { loginError = {} } = dataReducer;

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        dispatch(userLogin(values.email, values.password, history));
      } catch (err) {
        console.error("Failed to Log in", err);
      }
      setLoading(false);
    },
  });

  const onRegisterClick = () => {
    dispatch(clearErrors());
    history.push("/sign-up");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Paper style={{ width: "40%", marginTop: "50px" }}>
        <form onSubmit={formik.handleSubmit}>
          <Box px={3} py={2}>
            <Typography variant="h6" align="center" margin="dense">
              Log in
            </Typography>
            <Grid style={{ textAlign: "center" }} spacing={2} container>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  onChange={formik.handleChange}
                  color="primary"
                  fullWidth
                  margin="dense"
                />
                <Typography variant="inherit" color="textSecondary">
                  {formik.touched.email && Boolean(formik.errors.email) && formik.errors.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  onChange={formik.handleChange}
                  color="primary"
                  fullWidth
                  margin="dense"
                />
                <Typography variant="inherit" color="textSecondary">
                  {formik.touched.password && Boolean(formik.errors.password) && formik.errors.password}
                </Typography>
                {loginError.message && <div style={{ color: "red" }}>{loginError.message}</div>}
              </Grid>

              <Grid item container xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary" fullWidth type="submit" disabled={loading}>
                    Log in
                  </Button>
                </Grid>
              </Grid>
              <Grid item container xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "40px" }}>
                <Grid item>
                  <Button onClick={onRegisterClick} variant="contained" color="primary" fullWidth>
                    Register
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
