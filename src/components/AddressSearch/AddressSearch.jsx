import React, { useState, useRef, useEffect } from "react";
import s from "./addressSearch.module.scss";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Preloader from "../common/Preloader/Preloader";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { CopyToClipboard } from "react-copy-to-clipboard";
import RoomIcon from '@material-ui/icons/Room';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SearchVariables = props => {
  const handleClick = res => {
    props.selectAddress(res);
  };

  const results = props.data.map(res => (
    <div
      className={s.searchItem}
      onClick={() => {
        handleClick(res);
      }}
      key={res.position + Math.random() * (1 - 111) + 1}
    >
      <p>{res.address}</p>
      <small>{res.description}</small>
    </div>
  ));

  return <>{results}</>;
};

const AddressSearch = props => {

  const [inputVal, setInputVal] = useState("");
  const searchInput = useRef("searchInput");

  useEffect(()=>{
    searchInput.current.focus();
  }, []);

  useEffect(() => {
    !props.selectedAddress && searchInput.current.focus();
    setInputVal(props.selectedAddress.addressString);
  }, [props.selectedAddress.position]);

  const handleInput = () => {
    const value = searchInput.current.value;
    setInputVal(value);
    value && props.findAddress(value);
    value === "" && props.clearAddress(value);
  };

  const clearInputVal = () => {
    setInputVal("");
    props.clearAddress("");
  };


  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickCopy = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <div className={s.addressSearch}>
      <div className={s.sideWrap}>
        {props.isFetchingAddress && <div className={s.preloaderDescription}><Preloader medium={true} /> <p>Address search...</p></div>}
        {props.isFetchingMeetings && <div className={s.preloaderDescription}><Preloader medium={true} /> <p>Search for appointments...</p></div>}
        {props.isFetchingSchedule && <div className={s.preloaderDescription}><Preloader medium={true} /> <p>Making timetable...</p></div>}
        {props.isFetchingRoutes && <div className={s.preloaderDescription}><Preloader medium={true} /> <p>Route calculation...</p></div>}
      </div>
      <div className={s.wrapper}>
        <div className={s.left}>
          <div className={s.inputWrap}>
            <div className={`${s.inputBox} ${props.selectedAddress.addressString ? s.success : ''}`}>
              <RoomIcon style={{ color: "#828282", fontSize: 16 }} />
              <input
                  type="text"
                  placeholder="Enter customer address"
                  value={inputVal}
                  onChange={handleInput}
                  ref={searchInput}
              />
              {inputVal && (
                  <CloseIcon
                      style={{ color: "#828282", fontSize: 16, cursor: "pointer" }}
                      onClick={clearInputVal}
                  />
              )}
            </div>
            <div className={s.searchVariables}>
              <SearchVariables
                  data={props.searchResults}
                  selectAddress={props.selectAddress}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={s.sideWrap}>
        {props.selectedAddress.addressString && (
            <CopyToClipboard
                text={props.selectedAddress.addressString}
                onCopy={handleClickCopy}
            >
              <Button color="default" size="small" className={s.btnCopy}>
                  Copy address
              </Button>
            </CopyToClipboard>
        )}

      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Address copied to clipboard
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddressSearch;
