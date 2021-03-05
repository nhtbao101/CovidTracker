import React from "react";
import { Descriptions } from "antd";
import "./index.scss";
Description.propTypes = {};

function Description(props) {
  const { infected, tested, recovered, deceased } = props;
  // console.log("infected", infected);
  return (
    <div className="des__container">
      <Descriptions className="des__main" title="Global" column={2} bordered>
        <Descriptions.Item className="infected" label="Infected">
          {infected}
        </Descriptions.Item>
        <Descriptions.Item className="tested" label="Tested">
          {tested}
        </Descriptions.Item>
        <Descriptions.Item className="recovered" label="Recovered">
          {recovered}
        </Descriptions.Item>
        <Descriptions.Item className="deceased" label="Deceased">
          {deceased}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}

export default Description;
