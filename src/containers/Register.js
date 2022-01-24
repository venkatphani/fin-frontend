import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { Box, Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearErrors, userRegistration } from "../actions";
import { AlignedGrid } from "../components/StyledComponents";
const Register = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const dataReducer = useSelector((state) => state.data);
  const { loginError = {} } = dataReducer;

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        dispatch(userRegistration(values.email, values.password, history));
      } catch (err) {
        console.error("Failed to register", err);
      }
      setLoading(false);
    },
  });

  const onLoginClick = () => {
    dispatch(clearErrors());
    history.push("/");
  };
  return (
    <AlignedGrid>
      <Paper style={{ width: "40%", marginTop: "50px", border: "1px solid black" }}>
        <form onSubmit={formik.handleSubmit}>
          <Box px={3} py={2}>
            <Typography variant="h6" align="center" margin="dense">
              Sign up
            </Typography>
            <Grid style={{ textAlign: "center" }} spacing={2} container>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  autoComplete="new-email"
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
                  autoComplete="new-passord"
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
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="confirm-password"
                  value={formik.values.confirmPassword}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  onChange={formik.handleChange}
                  color="primary"
                  fullWidth
                  margin="dense"
                />
                <Typography variant="inherit" color="textSecondary">
                  {formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword) && formik.errors.confirmPassword}
                </Typography>
                {loginError.message && <div style={{ color: "red" }}>{loginError.message}</div>}
              </Grid>
              <AlignedGrid item container xs={12}>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary" fullWidth type="submit" disabled={loading}>
                    Register
                  </Button>
                </Grid>
              </AlignedGrid>
              <AlignedGrid item container xs={12} style={{ marginTop: "40px" }}>
                <Grid item>
                  <Button onClick={onLoginClick} variant="contained" color="primary" fullWidth>
                    Log in
                  </Button>
                </Grid>
              </AlignedGrid>
            </Grid>
          </Box>
        </form>
      </Paper>
    </AlignedGrid>
  );
};

export default Register;
