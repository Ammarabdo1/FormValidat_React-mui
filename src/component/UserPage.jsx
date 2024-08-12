import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Css/User.css";
import { Stack, Typography, Button, Box } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import backgroundImage1 from "../images/LoginBgBinkSky.jpg";
import backgroundImage2 from "../images/LoginBgCool.jpg";
import backgroundImage3 from "../images/LoginBgLeaves.jpg";
import backgroundImage4 from "../images/LoginBgOldPaper.jpg";
import backgroundImage5 from "../images/LoginBgSimpl.jpg";
import backgroundImage6 from "../images/LoginBgSky.jpg";
import backgroundImage7 from "../images/LoginBgWaterGlass.jpg";
import backgroundImage8 from "../images/LoginBgWood.jpg";
import backgroundImage9 from "../images/LoginBgWool.jpg";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export const UserPage = () => {
  const location = useLocation();
  const { name, lastName, image, allHabits } = location.state;

  //! to show habits
  const [checkShowHabits, setCheckShowHabits] = useState(false);
  const [checkHabitsIsNotEmpty, setCheckHabitsIsNotEmpty] = useState(false);

  const [checkShowLogout, setCheckShowLogout] = useState(false);

  //! radomVariables(color, img)
  const [randomImg, setRandomImg] = useState(null);
  const [randomColor, setRandomColor] = useState(null);

  const navigate = useNavigate()

  //! arrays (colors, images)
  const ImagesURL = [
    backgroundImage1,
    backgroundImage2,
    backgroundImage3,
    backgroundImage4,
    backgroundImage5,
    backgroundImage6,
    backgroundImage7,
    backgroundImage8,
    backgroundImage9,
  ];
  const colors = [
    "#A223B9", //secondary
    "#6f197e",
    "rgb(223, 186, 186)",
    "#1175D4", //primary
    "#1864ab",
    "#EC6C02",
    "#c25903",
    "#D32F2E",
    "#a62424",
    "gray",
    "#545454",
    "#307C32",
    "#255926",
    "gold",
    "black",
    "#3d8b87",
  ];
  useEffect(() => {
    console.log(allHabits);
    let counterForFalse = 0;
    allHabits.map((habit) => (habit != "" ? null : counterForFalse++));
    setCheckHabitsIsNotEmpty(counterForFalse != 5 ? true : false);

    let RandomIndex = Math.floor(Math.random() * ImagesURL.length);
    setRandomImg(ImagesURL[RandomIndex]);

    let RandomColorIndex = Math.floor(Math.random() * colors.length);
    setRandomColor(colors[RandomColorIndex]);
  }, []);
  return (
    <div className="userPage" style={{ backgroundImage: `url(${randomImg})` }}>
      <Stack
        spacing={2}
        className="userInfo"
        boxShadow={`0px 0px 8px 3px ${
          randomColor == null ? "gray" : randomColor
        }`}
      >
        <Box>
          <Button
            onMouseOver={() => setCheckShowLogout(true)}
            onMouseLeave={() => setCheckShowLogout(false)}
            onClick={()=>navigate('/')}
          >
            <LogoutIcon style={{ color: randomColor }} />
          </Button>{" "}
          <span
            style={{
              background: randomColor,
              padding: "8px",
              borderRadius: "5px",
              color: "white",
              display: checkShowLogout ? "" : "none",
            }}
          >
            Logout
          </span>
        </Box>
        <img
          src={image ? URL.createObjectURL(image) : "images/Person.jpeg"}
          alt="person Image"
          style={{
            border: `1px solid ${randomColor}`,
            boxShadow: `0 0 4px 2px ${randomColor}`,
          }}
        />
        <Typography variant="h5" sx={{ color: randomColor }}>
          {name} {lastName}
        </Typography>
        <br />
        {checkHabitsIsNotEmpty ? (
          <Stack spacing={2} className="allHabits">
            <Typography
              variant="h6"
              className="habits"
              sx={{
                borderBottom: `4px solid ${randomColor}`,
                color: randomColor,
              }}
            >
              your habits
              <Typography variant="subtitle1" className="dropDownToShowHabits">
                <Button onClick={() => setCheckShowHabits(!checkShowHabits)}>
                  <ArrowDropDownIcon />
                </Button>
                <span className="ShowHabitsText">
                  {checkShowHabits ? "hide habits" : "Show habits"}
                </span>
              </Typography>
            </Typography>
            <Typography>
              {allHabits.map((habit) =>
                habit ? (
                  <Typography
                    className="singleHabit"
                    style={{ display: checkShowHabits ? "block" : "none" }}
                    variant="subtitle2"
                  >
                    {habit}
                  </Typography>
                ) : null
              )}
            </Typography>
          </Stack>
        ) : (
          <Box sx={{ color: randomColor }}>There are no habits</Box>
        )}
      </Stack>
    </div>
  );
};
