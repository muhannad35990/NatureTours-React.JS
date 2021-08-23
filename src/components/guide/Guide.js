import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import * as endpoints from "../../configs/endpointConfig";
function Guide({ id, name, role, image, setNewGuides, newGuides }) {
  const backenduserImg = `${endpoints.BACKEND_URL}/img/users/`;
  const deleteTheGuide = (id) => {
    const filterdGuides = newGuides.filter((guide) => guide._id !== id);
    setNewGuides(filterdGuides);
  };
  return (
    <div className="guide">
      <Avatar
        src={backenduserImg.concat(image)}
        size={48}
        icon={<UserOutlined />}
      />
      <div className="guide__content">
        <div>
          <h1 className="guide__content__title">{name}</h1>
          <h3 className="guide__content__subtitle">{role}</h3>
        </div>

        <div className="guide__content__action">
          <DeleteOutlined
            style={{
              fontSize: "1.6rem",
              marginRight: "1rem",
              color: "red",
            }}
            onClick={() => deleteTheGuide(id)}
          />
        </div>
      </div>
    </div>
  );
}

export default Guide;
