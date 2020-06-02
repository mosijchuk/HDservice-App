import React from "react";
import MaterialIcon from "material-icons-react";
import s from "./formItems.module.scss";

export const Input = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <>
      <div className={s.form_group + " " + (hasError ? s.error : "")}>
        <input {...input} {...props}></input>
        {hasError && (
          <div>
            <span className={s.errorMessage}>{meta.error} </span>
          </div>
        )}
      </div>
    </>
  );
};

export const Textarea = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return (
    <>
      <div className={s.form_group + " " + (hasError ? s.error : "")}>
        <textarea {...input} {...props}></textarea>
      </div>

      {hasError ? (
        <div className={s.form_group + " " + (hasError ? s.error : "")}>
          <span className={s.errorMessage}>{meta.error} </span>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default class profileAvatarFileInput extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const {
      input: { onChange }
    } = this.props;
    onChange(e.target.files[0]);
  }

  changeAvatarClick = e => {
    e.preventDefault();
    this.inputElement.click();
  };

  render() {
    const {
      input: { value }
    } = this.props;

    return (
      <>
        <a href="#" onClick={this.changeAvatarClick}>
          <MaterialIcon icon="add_a_photo" size={18} />
        </a>
        <input
          type="file"
          ref={input => (this.inputElement = input)}
          onChange={this.onChange}
        />
      </>
    );
  }
}
