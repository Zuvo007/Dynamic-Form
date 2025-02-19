import { useState } from "react";
import classes from "./Accordian.module.css";

const Accordion = ({ title, children, rightAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.accordion}>
      <div
        className={`${classes.header} ${isOpen ? classes.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <div className={classes.actions}>
          {rightAction && (
            <div onClick={(e) => e.stopPropagation()}>{rightAction}</div>
          )}
          <span className={classes.icon}>{isOpen ? "▲" : "▼"}</span>
        </div>
      </div>
      {isOpen && <div className={classes.content}>{children}</div>}
    </div>
  );
};

export default Accordion;
