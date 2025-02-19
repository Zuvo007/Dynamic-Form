import DeleteIcon from "../../assets/deleteIcon.svg";
import Accordion from "../common/Accordian/Accordian";
import classes from "./DynamicForm.module.css";
import useDynamicForm from "../../hooks/useDynamicForm";
import { DYNAMIC_FORM_FIELDS } from "../../constants/globalContants";
import React from "react";
import Loader from "../common/Loader/Loader";

const renderField = (field, formData, index, handleChange, errors) => {
  if (field.parent && formData[field.parent] !== field.parentValue) return null;

  const hasError = errors[index]?.[field.id];
  const key = `${field.id}_${index}`;
  const errorMessage = hasError || "";

  const renderInputField = () => (
    <fieldset
      className={classes.fieldSet}
      key={`${index}-${field.id}`}
      style={field.style || {}}
    >
      <legend className={classes.label}>
        {field.label} {`${field.required ? "*" : ""}`}
      </legend>
      <input
        className={`${classes.formInput} ${hasError ? classes.errorInput : ""}`}
        placeholder={field.placeholder || ""}
        type={field.type}
        value={formData[field.id] || ""}
        onChange={(e) => handleChange(index, field.id, e.target.value)}
      />
    </fieldset>
  );

  const renderSelectField = () => (
    <fieldset
      className={classes.fieldSet}
      key={`${index}-${field.id}`}
      style={field.style || {}}
    >
      <legend className={classes.label}>
        {field.label} {`${field.required ? "*" : ""}`}
      </legend>
      <select
        className={`${classes.formSelect} ${
          hasError ? classes.errorInput : ""
        }`}
        value={formData[field.id] || ""}
        onChange={(e) => handleChange(index, field.id, e.target.value)}
      >
        <option value="">Select</option>
        {field.options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </fieldset>
  );

  const renderCheckboxField = () => (
    <div className={`${classes.cb} ${classes.label}`}>
      <input
        type="checkbox"
        checked={formData[field.id] || false}
        onChange={(e) => handleChange(index, field.id, e.target.checked)}
      />
      <div className={classes.cbLabel}> {field.label}</div>
    </div>
  );

  return (
    <React.Fragment key={key}>
      {(() => {
        switch (field.type) {
          case DYNAMIC_FORM_FIELDS.TEXT:
          case DYNAMIC_FORM_FIELDS.NUMBER:
          case DYNAMIC_FORM_FIELDS.TEXTAREA:
            return renderInputField();
          case DYNAMIC_FORM_FIELDS.SELECT:
            return renderSelectField();
          case DYNAMIC_FORM_FIELDS.CHECKBOX:
            return renderCheckboxField();

          default:
            return null;
        }
      })()}
      {hasError && <span className={classes.errorMessage}>{errorMessage}</span>}
    </React.Fragment>
  );
};

const DynamicForm = ({ schema }) => {
  const {
    formList,
    errors,
    handleChange,
    addForm,
    removeForm,
    activeQstnId,
    fullScreenLoading,
    autoSaveLoading,
  } = useDynamicForm();

  return (
    <section className={classes.container}>
      <div className={classes.formContainer}>
        <button type="button" className={classes.addQstnBtn} onClick={addForm}>
          + Add Question
        </button>
        {formList.map((formData, index) => (
          <div key={index} className={classes.formContent}>
            <Accordion
              key={index}
              title={formData.qTitle || `Question ${index + 1}`}
              rightAction={
                <div className={classes.flexContainer}>
                  {autoSaveLoading && activeQstnId === index && <Loader />}
                  <button
                    onClick={() => removeForm(index)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "red",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    <img src={DeleteIcon} alt="delete" />
                  </button>
                </div>
              }
            >
              {schema.map((field) => {
                if (field.children && field.children.length > 0) {
                  return renderChildren(
                    field.children,
                    formData,
                    index,
                    handleChange,
                    field.childrenStyle
                  );
                }
                return renderField(
                  field,
                  formData,
                  index,
                  handleChange,
                  errors
                );
              })}
            </Accordion>
          </div>
        ))}
      </div>
      {fullScreenLoading && (
        <Loader isFullScreen style={{ height: "30px", width: "30px" }} />
      )}
    </section>
  );
};

export default DynamicForm;
