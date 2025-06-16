import React from "react";
import "antd/dist/reset.css";
import { Menu, Dropdown } from "antd";
function LangDrop() {
  return (
    <div>
      <Dropdown 
        overlay={
            <Menu >
            <Menu.Item key="0">
              <a href="#">Ar</a>
            </Menu.Item>
          </Menu>
        }
        trigger={["click"]}
      >
          <a className="#"  onClick={(e) => e.preventDefault()}>
      En 
    </a>
      </Dropdown>
    </div>
  );
}

export default LangDrop;
