import { useState, useEffect } from "react";
import {
  Stack,
  TextField,
  InputAdornment,
  Button,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  Radio,
  RadioGroup,
  FormHelperText,
  MenuItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import CheckIcon from "@mui/icons-material/Check";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import LoginIcon from "@mui/icons-material/Login";
import PeopleIcon from "@mui/icons-material/People";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import Battery0BarIcon from "@mui/icons-material/Battery0Bar";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ImageIcon from "@mui/icons-material/Image";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { BeatLoader, ClipLoader } from "react-spinners";

export const FormValidate = () => {
  //! for name email pass
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passError, setPassError] = useState("");
  const [checkPassError, setCheckPassError] = useState(true);

  //! check first click
  const [checkFirstClickOnEmailButton, setCheckFirstClickOnEmailButton] =
    useState(false);
  const [checkFirstClickOnNameButton, setCheckFirstClickOnNameButton] =
    useState(false);
  const [checkFirstClickOnLastNameButton, setCheckFirstClickOnLastNameButton] =
    useState(false);
  const [checkFirstClickOnPassButton, setCheckFirstClickOnPassButton] =
    useState(false);
  const [
    checkFirstClickOnConfirmPassButton,
    setCheckFirstClickOnConfirmPassButton,
  ] = useState(false);

  const [checkGender, setCheckGender] = useState(false);

  //* for birth day
  const [dayDate, setDayDate] = useState("");
  const [monthDate, setMonthDate] = useState("");
  const [yearDate, setYearDate] = useState("");
  const [checkDate, setCheckDate] = useState(false);

  //*for Habits
  const [showHabits, setShowHabits] = useState(false);
  const [toggleRun, setToggleRun] = useState(false);
  const [toggleRead, setToggleRead] = useState(false);
  const [toggleWrite, setToggleWrite] = useState(false);
  const [toggleGym, setToggleGym] = useState(false);
  const [toggleHelp, setToggleHelp] = useState(false);

  const [habitRun, setHabitRun] = useState("");
  const [habitRead, setHabitRead] = useState("");
  const [habitWrite, setHabitWrite] = useState("");
  const [habitGym, setHabitGym] = useState("");
  const [habitHelp, setHabitHelp] = useState("");
  const [allHabits, setAllHabits] = useState([]);

  //! for submit
  const [send, setSend] = useState(false);

  useEffect(() => {
    setAllHabits([habitGym, habitHelp, habitRead, habitRun, habitWrite]);
  }, [habitRun, habitRead, habitWrite, habitGym, habitHelp]);
  //*for submit
  const navigate = useNavigate();

  //*for image
  const [image, setImage] = useState(null);
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkShowImg, setCheckShowImg] = useState(true);

  //* for birth day
  const days = Array(31).fill(1);
  const months = Array(12).fill(1);
  const years = Array(56).fill(1);
  let day = 0;
  let month = 0;
  let year = 1960;

  useEffect(() => {
    if (!pass) {
      setPassError("Required");
      setCheckPassError(true);
    } else if (/[\s]/.test(pass)) {
      setPassError("Mustn't include any white space");
      setCheckPassError(true);
    } else if (pass.length < 6) {
      setPassError("At least 6 letters ");
      setCheckPassError(true);
    } else if (!/[0-9]/.test(pass)) {
      setPassError("At least 1 number ");
      setCheckPassError(true);
    } else if (!/[a-z]/.test(pass) || !/[A-Z]/.test(pass)) {
      setPassError("Must include both small and capital letters");
      setCheckPassError(true);
    } else {
      setPassError("Don't share your password with anyone");
      setCheckPassError(false);
    }
  }, [pass]);
  const handelSubmit = (e) => {
    e.preventDefault();
    setName("");
    setLastName("");
    setEmail("");
    setPass("");
    setConfirmPass("");
    setPassError("");
    setSend(true);
    setTimeout(() => {
      setSend(false);
      navigate("/page", { state: { name, lastName, image, allHabits } });
    }, 3000);
  };

  const handleChangeImg = (e) => {
    const img = e.target.files[0];
    if (img === "" || img === undefined) {
      alert(`not an image, the file is a ${typeof img}`);
      return;
    }
    setCheckLoading(true);
    setTimeout(() => {
      setCheckLoading(false);
      setImage(img);
    }, 3000);
  };
  return (
    <div className="FormValidate">
      <form onSubmit={handelSubmit} className="form">
        <Stack spacing={2} direction="column" className="mainStackInForm">
          {/* first &lastName */}
          <Stack spacing={2} direction="row">
            <TextField
              required
              value={name}
              type="text"
              variant="outlined"
              label="First name"
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {name.length < 3 && checkFirstClickOnNameButton ? (
                      <ErrorOutlineIcon style={{ color: "red" }} />
                    ) : (
                      <PersonIcon />
                    )}
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setName(e.target.value)}
              onClick={() => setCheckFirstClickOnNameButton(true)}
              error={name.length < 3 && checkFirstClickOnNameButton}
              color={name.length >= 3 ? "success" : "primary"}
              helperText={
                name.length < 3 ? (
                  name.length == 0 ? (
                    "Required"
                  ) : (
                    "at least 3 letters"
                  )
                ) : (
                  <div className="success">
                    <CheckIcon />
                    Is valid
                  </div>
                )
              }
            />

            <TextField
              required
              value={lastName}
              type="text"
              variant="outlined"
              label="Last name"
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {lastName.length < 3 && checkFirstClickOnLastNameButton ? (
                      <ErrorOutlineIcon style={{ color: "red" }} />
                    ) : (
                      <PeopleIcon />
                    )}
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setLastName(e.target.value)}
              onClick={() => setCheckFirstClickOnLastNameButton(true)}
              error={lastName.length < 3 && checkFirstClickOnLastNameButton}
              color={lastName.length >= 3 ? "success" : "primary"}
              helperText={
                lastName.length < 3 ? (
                  lastName.length == 0 ? (
                    "Required"
                  ) : (
                    "at least 3 letters"
                  )
                ) : (
                  <div className="success">
                    <CheckIcon />
                    Is valid
                  </div>
                )
              }
            />
          </Stack>

          {/* Email address */}
          <TextField
            onClick={() => setCheckFirstClickOnEmailButton(true)}
            error={
              (!email.endsWith("@gmail.com") || email.length < 13) &&
              checkFirstClickOnEmailButton
            }
            type="email"
            label="Email Address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            color={
              (!email.endsWith("@gmail.com") || email.length < 13) &&
              checkFirstClickOnEmailButton
                ? "primary"
                : "success"
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {(!email.endsWith("@gmail.com") || email.length < 13) &&
                  checkFirstClickOnEmailButton ? (
                    <ErrorOutlineIcon style={{ color: "red" }} />
                  ) : (
                    ""
                  )}
                </InputAdornment>
              ),
            }}
            helperText={
              email.endsWith("@gmail.com") && email.length >= 13 ? (
                <div className="success">
                  <CheckIcon /> is valid
                </div>
              ) : email == "" ? (
                "Required"
              ) : email.endsWith("@gmail.com") ? (
                <div className="flex">
                  <ErrorOutlineIcon />
                  At least 3 letters before_@gmail.com
                </div>
              ) : (
                "Must include_@gmail.com at the end"
              )
            }
          />

          {/* Password */}
          <Stack spacing={2} direction="row">
            <TextField
              required
              value={pass}
              type="password"
              variant="standard"
              label="password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {checkFirstClickOnPassButton ? <VpnLockIcon /> : ""}
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {checkPassError && checkFirstClickOnPassButton ? (
                      <ErrorOutlineIcon style={{ color: "red" }} />
                    ) : (
                      ""
                    )}
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setPass(e.target.value)}
              onClick={() => setCheckFirstClickOnPassButton(true)}
              error={checkPassError && checkFirstClickOnPassButton}
              color={!checkPassError && pass.length > 0 ? "success" : "primary"}
              helperText={
                checkPassError ? (
                  passError
                ) : (
                  <div className="success">
                    <CheckIcon /> {passError}
                  </div>
                )
              }
            />

            {/*//! confirmPass */}
            <TextField
              style={{ display: pass ? "flex" : "none" }}
              required
              value={confirmPass}
              variant="filled"
              type="password"
              label="confirm password"
              color={!checkPassError && confirmPass == pass ? "success" : ""}
              onChange={(e) => setConfirmPass(e.target.value)}
              onClick={() => setCheckFirstClickOnConfirmPassButton(true)}
              error={confirmPass != pass && checkFirstClickOnConfirmPassButton}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {" "}
                    {confirmPass != pass &&
                    checkFirstClickOnConfirmPassButton ? (
                      <ErrorOutlineIcon style={{ color: "red" }} />
                    ) : (
                      ""
                    )}{" "}
                  </InputAdornment>
                ),
              }}
              helperText={
                confirmPass != pass && checkFirstClickOnConfirmPassButton ? (
                  "not equal"
                ) : !checkPassError && confirmPass == pass ? (
                  <div className="success">
                    <CheckIcon /> is equal
                  </div>
                ) : (
                  ""
                )
              }
            />
          </Stack>

          {/* Gender */}
          <Box>
            <FormControl>
              <FormLabel>Gender❔</FormLabel>
              <RadioGroup name="Gender" row>
                <FormControlLabel
                  onClick={() => setCheckGender(true)}
                  label="male"
                  value="male"
                  control={<Radio color="primary" />}
                />
                <FormControlLabel
                  onClick={() => setCheckGender(true)}
                  label="female"
                  value="female"
                  control={<Radio color="info" />}
                />
                <FormControlLabel
                  onClick={() => setCheckGender(true)}
                  label="Custom"
                  value="Custom"
                  control={<Radio color="warning" />}
                />
              </RadioGroup>
              <FormHelperText>{checkGender ? "" : "Required"}</FormHelperText>
            </FormControl>
          </Box>

          {/* Select data */}
          <FormControl
            error={(!dayDate || !monthDate || !yearDate) && checkDate}
          >
            <FormLabel>Date of Birth</FormLabel>
            <FormGroup row onClick={() => setCheckDate(true)}>
              <Stack spacing={0.5} direction="row">
                <Box width="150px">
                  <TextField
                    error={(!dayDate || !monthDate || !yearDate) && checkDate}
                    label="DD"
                    select
                    fullWidth
                    variant="filled"
                    onChange={(e) => setDayDate(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {(!dayDate || !monthDate || !yearDate) &&
                          checkDate ? (
                            <ErrorOutlineIcon
                              style={{ color: "red", marginRight: "10px" }}
                            />
                          ) : (
                            ""
                          )}
                        </InputAdornment>
                      ),
                    }}
                  >
                    {days.map(() => (
                      <MenuItem value={++day}>{day}</MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box width="150px">
                  <TextField
                    error={(!dayDate || !monthDate || !yearDate) && checkDate}
                    label="MM"
                    variant="filled"
                    select
                    fullWidth
                    onChange={(e) => setMonthDate(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {(!dayDate || !monthDate || !yearDate) &&
                          checkDate ? (
                            <ErrorOutlineIcon
                              style={{ color: "red", marginRight: "10px" }}
                            />
                          ) : (
                            ""
                          )}
                        </InputAdornment>
                      ),
                    }}
                  >
                    {months.map(() => (
                      <MenuItem value={++month}>{month}</MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box width="150px">
                  <TextField
                    error={(!dayDate || !monthDate || !yearDate) && checkDate}
                    label="YY"
                    variant="filled"
                    select
                    fullWidth
                    onChange={(e) => setYearDate(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {(!dayDate || !monthDate || !yearDate) &&
                          checkDate ? (
                            <ErrorOutlineIcon
                              style={{ color: "red", marginRight: "10px" }}
                            />
                          ) : (
                            ""
                          )}
                        </InputAdornment>
                      ),
                    }}
                  >
                    {years.map(() => (
                      <MenuItem value={++year}>{year}</MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Stack>
            </FormGroup>
            <FormHelperText>
              {(!dayDate || !monthDate || !yearDate) && checkDate ? (
                <div className="flex">
                  <ErrorOutlineIcon />
                  Inter a full date
                </div>
              ) : dayDate && monthDate && yearDate ? (
                <div className="success">
                  <CheckIcon />
                  is valid
                </div>
              ) : (
                ""
              )}
            </FormHelperText>
          </FormControl>

          {/* Habits ,Image*/}
          <Stack direction="row" spacing={2}>
            {/* Habits */}
            <Box className="habits">
              <FormControl
              //   error={
              //     !toggleRun &&
              //     !toggleRead &&
              //     !toggleWrite &&
              //     !toggleGym &&
              //     !toggleHelp
              //   }
              >
                <FormLabel
                  onClick={() => setShowHabits(!showHabits)}
                  style={{
                    backgroundColor: showHabits ? "#1278D7" : "",
                    color: showHabits
                      ? "white"
                      : !toggleRun &&
                        !toggleRead &&
                        !toggleWrite &&
                        !toggleGym &&
                        !toggleHelp
                      ? ""
                      : "green",
                    display: "flex",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}
                >
                  Chose your habits
                  <ArrowDropDownIcon />
                </FormLabel>
                <FormGroup style={{ display: showHabits ? "flex" : "none" }}>
                  {/* //! run habit */}
                  <FormControlLabel
                    style={{ color: toggleRun ? "#9D27B0" : "" }}
                    label="Running in the morning 🏃‍♂️🌟"
                    control={
                      <Checkbox
                        className="CheckedIcon"
                        icon={<HourglassEmptyIcon />}
                        checkedIcon={<HourglassFullIcon />}
                        color="secondary"
                        value="Running in the morning 🏃‍♂️🌟"
                        onChange={(e) => {
                          setToggleRun(e.target.checked);
                          if (e.target.checked) {
                            setHabitRun(e.target.value);
                          } else {
                            setHabitRun("");
                          }
                        }}
                      />
                    }
                  />
                  {/* //! read habit */}
                  <FormControlLabel
                    style={{ color: toggleRead ? "#EE6B02" : "" }}
                    label="Read books 🔎📚"
                    control={
                      <Checkbox
                        className="CheckedIcon"
                        icon={<BookmarkBorderIcon />}
                        checkedIcon={<BookmarkIcon />}
                        color="warning"
                        value="Read books 🔎📚"
                        onChange={(e) => {
                          setToggleRead(e.target.checked);
                          if (e.target.checked) {
                            setHabitRead(e.target.value);
                          } else {
                            setHabitRead("");
                          }
                        }}
                      />
                    }
                  />
                  {/* //! write habit */}
                  <FormControlLabel
                    style={{ color: toggleWrite ? "#1278D7" : "" }}
                    label="Write Stories with coffee 📝☕"
                    control={
                      <Checkbox
                        className="CheckedIcon"
                        icon={<StarBorderIcon />}
                        checkedIcon={<StarIcon />}
                        color="primary"
                        value="Write Stories with coffee 📝☕"
                        onChange={(e) => {
                          setToggleWrite(e.target.checked);
                          if (e.target.checked) {
                            setHabitWrite(e.target.value);
                          } else {
                            setHabitWrite("");
                          }
                        }}
                      />
                    }
                  />
                  {/* //! gym habit */}
                  <FormControlLabel
                    style={{ color: toggleGym ? "#307C31" : "" }}
                    label="Go to gym ⚡💪"
                    control={
                      <Checkbox
                        className="CheckedIcon"
                        icon={<Battery0BarIcon />}
                        checkedIcon={<BatteryFullIcon />}
                        color="success"
                        value="Go to gym ⚡💪"
                        onChange={(e) => {
                          setToggleGym(e.target.checked);
                          if (e.target.checked) {
                            setHabitGym(e.target.value);
                          } else {
                            setHabitGym("");
                          }
                        }}
                      />
                    }
                  />
                  {/* //! help habit */}
                  <FormControlLabel
                    style={{ color: toggleHelp ? "#D42E2E" : "" }}
                    label="Helping the elderly ➰👴"
                    control={
                      <Checkbox
                        className="CheckedIcon"
                        checked={toggleHelp}
                        icon={<FavoriteBorderIcon />}
                        checkedIcon={<FavoriteIcon />}
                        color="error"
                        value="Helping the elderly ➰👴"
                        onChange={(e) => {
                          setToggleHelp(e.target.checked);
                          if (e.target.checked) {
                            setHabitHelp(e.target.value);
                          } else {
                            setHabitHelp("");
                          }
                        }}
                      />
                    }
                  />
                </FormGroup>
                {/* <FormHelperText>
                  {!toggleRun &&
                  !toggleRead &&
                  !toggleWrite &&
                  !toggleGym &&
                  !toggleHelp
                    ? "At least chose 1 habit"
                    : ""}
                </FormHelperText> */}
              </FormControl>
            </Box>

            {/* Image */}
            <Stack direction="column" className="card">
              <input
                type="file"
                name="image"
                accept="image/gif , image/jpeg , image/jpg , image/png"
                id="file"
                onChange={handleChangeImg}
              />

              {/* //!Select an img */}
              <Stack direction="row" className="selectImg">
                <Button color={image ? "success" : "primary"}>
                  <label htmlFor="file">
                    <AddPhotoAlternateIcon />
                    Select an image to share
                  </label>
                </Button>

                {/*//! Drop down show img */}
                {image && !checkLoading && (
                  <div className="DropDownShowImg">
                    <Button
                      onClick={() => setCheckShowImg(!checkShowImg)}
                      color={image ? "success" : "primary"}
                    >
                      <ArrowDropDownIcon />
                    </Button>
                    <Typography variant="subtitle2" class="ShowImgText">
                      <ImageIcon />
                      {checkShowImg ? "Hide image" : "Show Image"}
                    </Typography>
                  </div>
                )}
              </Stack>

              {/*//! Loader */}
              {checkLoading && (
                <div className="loader">
                  <BeatLoader
                    color="#3d8b87"
                    cssOverride={{}}
                    loading
                    size={10}
                    speedMultiplier={1}
                  />
                </div>
              )}

              {image && !checkLoading && checkShowImg && (
                <div className="imgDiv">
                  <img src={URL.createObjectURL(image)} />

                  <Button
                    className="ButtonCloseIcon"
                    onClick={() => setTimeout(() => setImage(null), 300)}
                  >
                    <CloseIcon className="closeIcon" />
                  </Button>
                </div>
              )}
            </Stack>
          </Stack>

          {/* Submit */}
          <Button
            disableRipple={checkPassError || name.length < 3}
            disabled={
              checkPassError || //! password
              name.length < 3 || //! first name
              lastName.length < 3 || //! last name
              pass != confirmPass || //! confirm Password
              !email.includes("@gmail.com") || //! Email
              // (!toggleRun &&
              //   !toggleRead &&
              //   !toggleWrite &&
              //   !toggleGym &&
              //   !toggleHelp) || //! Habits
              !checkGender || //! Gender
              !dayDate ||
              !monthDate ||
              !yearDate //! birth day
            }
            className="submit"
            variant="contained"
            color="info"
            type="submit"
          >
            {send ? (
              <div className="flex">
                Wait.. <ClipLoader color="#3d8b87" size={20} />
              </div>
            ) : (
              <div className="flex">
                Login <LoginIcon />
              </div>
            )}
          </Button>
        </Stack>
      </form>
    </div>
  );
};
