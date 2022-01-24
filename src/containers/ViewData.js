import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@material-ui/core";
import { getAllArticles } from "../actions";
import { useHistory } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";

const ViewData = () => {
  const dispatch = useDispatch();
  const dataReducer = useSelector((state) => state.data);
  const { articles = [] } = dataReducer;
  useEffect(() => {
    dispatch(getAllArticles());
  }, [dispatch]);
  const history = useHistory();
  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <div style={{ marginTop: "100px" }}>
          <div style={{ textAlign: "end" }}>
            <Button startIcon={<ArrowBack />} variant="contained" color="primary" onClick={() => history.push("/home")}>
              Upload Data
            </Button>
          </div>
          <Typography variant="h6" align="center" margin="dense">
            Uploaded Records
          </Typography>
        </div>
        <TableContainer style={{ marginTop: "100px", border: "1px solid black" }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }} align="center">
                  id
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>User Id</TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="center">
                  Title
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="center">
                  Body
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((row) => (
                <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="center" component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">{row.userId}</TableCell>
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">{row.body}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ViewData;
