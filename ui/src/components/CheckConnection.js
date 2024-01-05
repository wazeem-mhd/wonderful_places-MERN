import { Detector } from "react-detect-offline";
import { Typography } from "@mui/material";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";

const CheckConnection = (props) => {
  return (
    <>
      <Detector
        render={({ online }) =>
          online ? (
            props.children
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <NetworkCheckIcon style={{ fontSize: "100px", color: "red" }} />
              <Typography fontSize={"30px"} sx={{ paddingX: "20px" }}>
                You are offline. Please check your internet connection.
              </Typography>
            </div>
          )
        }
      />
    </>
  );
};

export default CheckConnection;
