import React, { useState, useRef, useEffect } from "react";
import s from "./addressSearch.module.scss";
import SelectBox from "../SelectBox/SelectBox";
import PersonPinCircleIcon from "@material-ui/icons/PinDrop";
import LocationOffIcon from "@material-ui/icons/LocationOff";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Preloader from "../common/Preloader/Preloader";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  const handleSelect = val => {
    props.selectUser(val);
  };

  const selectBoxData = props.users.map(user => {
    return {
      name: user.name,
      value: user.id
    };
  });

  const [inputVal, setInputVal] = useState("");
  const searchInput = useRef("searchInput");

  useEffect(() => {
    setInputVal(props.selectedAddress.address);
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

  const actionGoodAddress = (
    <CopyToClipboard
      text={props.selectedAddress.addressString}
      onCopy={handleClickCopy}
    >
      <Button color="default" size="small" className={s.btnCopy}>
        Скопировать
      </Button>
    </CopyToClipboard>
  );

  return (
    <div className={s.addressSearch}>
      <div className={s.wrapper}>
        <div className={s.left}>
          <div className={s.selectEmployee}>
            <h2>Выберите сотрудника:</h2>
            <SelectBox
              name={"meetingsUser"}
              size={"medium"}
              handleSelect={handleSelect}
              data={selectBoxData}
              disabled={
                props.isFetchingMeetings ||
                (props.selectedAddress.distanceValue > 0 && true)
              }
            />
          </div>
        </div>
        <div className={s.right}>
          <div className={s.inputWrap}>
            <div className={s.inputBox}>
              <PersonPinCircleIcon style={{ color: "#828282", fontSize: 16 }} />
              <input
                type="text"
                placeholder="Укажите адрес клиента"
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
        <div className={s.left}></div>
        <div className={s.right}>
          <div className={s.snackbarWrap}>
            {props.selectedAddress.errorMessage && !props.isFetchingAddress && (
              <div className={s.errorBar}>
                <LocationOffIcon style={{ color: "#ffffff", fontSize: 16 }} />
                <p>{props.selectedAddress.errorMessage}</p>
              </div>
            )}
            {props.isFetchingAddress && <Preloader medium={true} />}
            {props.selectedAddress.address &&
              !props.isFetchingAddress &&
              props.selectedAddress.distanceValue <
                props.selectedAddress.allowedRadiusVal * 3 && (
                <SnackbarContent
                  message={props.selectedAddress.addressString}
                  action={actionGoodAddress}
                  className={`${s.snackBar} 
                ${props.selectedAddress.distanceValue >
                  props.selectedAddress.allowedRadiusVal && s.redBar}`}
                />
              )}
          </div>

          {/* <div className={s.errorBar}>
            <LocationOffIcon style={{ color: "#ffffff", fontSize: 16 }} />
            <p>Расстояние превышает 40 километров (42км)</p>
          </div> */}
        </div>
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
          Адрес скопирован в буфер обмена
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddressSearch;
