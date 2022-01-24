import { useState } from "react";
import Navbar from "../components/Navbar";
import { isJSONFile, validateJSONData } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { uploadArticles } from "../actions";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { clearSuccess } from "../actions";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");
  const [showFileExtensionText, setFileExtensionText] = useState(false);
  const [showFileContentText, setFileContentText] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const dataReducer = useSelector((state) => state.data);
  const { showSuccess = false } = dataReducer;

  const onUploadChange = (e) => {
    dispatch(clearSuccess());
    setFileExtensionText(false);
    setFileContentText(false);
    setName("");
    const name = Object.values(e.target.files).map((x) => x.name)[0] || "";
    if (name) {
      const isJson = isJSONFile(name);
      setName(name);
      if (isJson) {
        const files = Object.values(e.target.files);
        if (files.length > 0) {
          const file = files[0];
          const fileReader = new FileReader();
          fileReader.readAsText(file, "UTF-8");
          fileReader.onload = (e) => {
            const resultInString = e.target.result;
            const { finalData = [], isValid = false } = validateJSONData(resultInString, setFileContentText);
            if (isValid) {
              dispatch(uploadArticles(finalData));
            }
          };
        }
      } else {
        setFileExtensionText(true);
      }
    }
  };
  return (
    <>
      <Navbar />
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "100px" }}>
        <Paper style={{ width: "40%", padding: "50px", border: "1px solid black" }}>
          <Typography variant="h6" align="center" margin="dense">
            Upload JSON file
          </Typography>
          <Grid item xs={12} style={{ marginTop: "10px" }}>
            <div
              style={{
                display: "flex",
                margin: "auto",
                width: 400,
                flexWrap: "wrap",
                justifyContent: "center",
              }}>
              <input onChange={onUploadChange} type="file" style={{ display: "none" }} id="contained-button-file" />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </label>
            </div>
            {name && <div style={{ marginTop: "20px", color: "black", textAlign: "center" }}>{name}</div>}
          </Grid>
          {showFileExtensionText && (
            <Grid style={{ textAlign: "center" }} item xs={12}>
              <p style={{ color: "red" }}>Please upload a JSON file</p>
            </Grid>
          )}
          {showFileContentText && (
            <Grid style={{ textAlign: "center" }} item xs={12}>
              <p style={{ color: "red" }}>Please check the content of the file (wrong format)</p>
            </Grid>
          )}
          {showSuccess && (
            <Grid style={{ textAlign: "center" }} item xs={12}>
              <p style={{ color: "green" }}>File has been uploaded successfully</p>
            </Grid>
          )}
        </Paper>
      </Grid>
      <Grid item container xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
        <Grid item>
          <Button onClick={() => history.push("/records")} variant="contained" color="primary" fullWidth>
            View Uploaded Data
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
