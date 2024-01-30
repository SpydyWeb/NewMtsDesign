import { Switch } from "./UtilStyledComponents";
import "./utils.css";

interface TextFieldProps {
  id: string;
  label: string;
  type: string;
  value: any;
  maxLength?: number;
  pattern?: string;
  required?: boolean;
  onChange?:any;
  name:string

}

interface SelectBoxProps {
  id: string;
  label: string;
  defaultValue: any;
  options: string[];
}

interface ToggleButtonProps {
  id: string;
  label: string;
  defaultChecked: any;
}

interface TextAreaProps {
  id: string;
  label: string;
  defaultValue: any;
  maxLength?: number;
}

interface FileInputProps {
  id: string;
  label: string;
  disabled: boolean;
}

interface ControlledTextFieldProps {
  id: string;
  label: string;
  type: string;
  defaultValue: any;
  maxLength?: number;
  pattern?: string;
  changeHandler: any;
}

interface ControlledSelectBoxProps {
  id: string;
  label: string;
  defaultValue: any;
  options: string[];
  changeHandler: any;
}

interface ControlledToggleButtonProps {
  id: string;
  label: string;
  defaultChecked: any;
  changeHandler: any;
}

interface ControlledTextAreaProps {
  id: string;
  label: string;
  defaultValue: any;
  maxLength?: number;
  changeHandler: any;
}

interface ControlledFileInputProps {
  id: string;
  label: string;
  changeHandler: any;
}

export const TextField = (props: TextFieldProps): JSX.Element => {
  return (
    <div className="form-floating mt-1">
      <input
        type={props.type}
        className="form-control"
        id={props.id}
        name={props.name}
        placeholder={props.label}
        value={props.value}
        title={props.label}
        pattern={props.pattern}
        maxLength={props.maxLength}
        onChange={props.onChange}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export const DisabledTextField = (props: TextFieldProps): JSX.Element => {
  return (
    <div className="form-floating mt-1">
      <input
        disabled
        type={props.type}
        className="form-control"
        id={props.id}
        placeholder={props.label}
        value={props.value}
        title={props.label}
        maxLength={props.maxLength}
        onChange={(e) => {
          const errorDiv = document.getElementById(props.id + "Error") as HTMLDivElement;
          errorDiv.innerText = "";
          if (props.maxLength && e.target.value.length >= props.maxLength) errorDiv.innerText = "Max character limit reached (" + props.maxLength +")";
          else if (props.required && e.target.value.length == 0) errorDiv.innerText = "This field is required!";
        }}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export const SelectBox = (props: SelectBoxProps): JSX.Element => {
  return (
    <div className="form-floating mt-1">
      <select className="form-select" id={props.id} defaultValue={props.defaultValue} title={props.label}>
        <option defaultChecked>-select-</option>
        {props.options.map((item, idx) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export const ToggleButton = (props: ToggleButtonProps): JSX.Element => {
  return (
    <>
      <div className="form-check form-switch mt-1">
        <label>&nbsp;{props.label}</label>
        <Switch className="form-check-input pointer" type="checkbox" id={props.id} defaultChecked={props.defaultChecked} />
      </div>
    </>
  );
};

export const TextArea = (props: TextAreaProps): JSX.Element => {
  return (
    <div className="form-floating mt-1">
      <textarea
        className="form-control"
        placeholder={props.label}
        id={props.id}
        defaultValue={props.defaultValue}
        title={props.label}
        maxLength={props.maxLength}
        onChange={(e) => {
          const errorDiv = document.getElementById(props.id + "Error") as HTMLDivElement;
          errorDiv.innerText = "";
          if (props.maxLength && e.target.value.length >= props.maxLength) errorDiv.innerText = "Max character limit reached (" + props.maxLength +")";
        }}></textarea>
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export const FileInput = (props: FileInputProps) => {
  return (
    <div className="mt-3">
      <input className="form-control" type="file" id={props.id} disabled={props.disabled}/>
    </div>
  );
};

export const ControlledTextField = (props: ControlledTextFieldProps): JSX.Element => {
  return (
    <div className="form-floating mt-1">
      <input type={props.type} className="form-control" id={props.id} placeholder={props.label} pattern={props.pattern} defaultValue={props.defaultValue} maxLength={props.maxLength} onChange={props.changeHandler} title={props.label} />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export const ControlledSelectBox = (props: ControlledSelectBoxProps): JSX.Element => {
  return (
    <div className="form-floating mt-1">
      <select className="form-select" id={props.id} defaultValue={props.defaultValue} onChange={props.changeHandler} title={props.label}>
        <option key="0" defaultChecked>-select-</option>
        {props.options.map((item, idx) => (
          <option key={item}>{item}</option>
        ))}
      </select>
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export const ControlledToggleButton = (props: ControlledToggleButtonProps): JSX.Element => {
  return (
    <>
      <div className="form-check form-switch mt-1">
        <label>&nbsp;{props.label}</label>
        <Switch className="form-check-input pointer" type="checkbox" id={props.id} defaultChecked={props.defaultChecked} onChange={props.changeHandler} />
      </div>
    </>
  );
};

export const ControlledTextArea = (props: ControlledTextAreaProps): JSX.Element => {
  return (
    <div className="form-floating mt-1">
      <textarea className="form-control" placeholder={props.label} id={props.id} defaultValue={props.defaultValue} maxLength={props.maxLength} onChange={props.changeHandler}></textarea>
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

export const ControlledFileInput = (props: ControlledFileInputProps) => {
  return (
    <div className="mt-3">
      <input className="form-control" type="file" id={props.id} onChange={props.changeHandler} />
    </div>
  );
};
