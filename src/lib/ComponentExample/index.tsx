import React, { FC } from "react";

interface IProps { text: string };

const ComponentExample: FC<IProps> = ({ text }) => (
  <div style={{ color: "red" }}>{text}</div>
);

export default ComponentExample;