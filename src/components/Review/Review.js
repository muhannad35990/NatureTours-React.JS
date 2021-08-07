import { UserOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import * as endpoints from "../../configs/endpointConfig";
function Review({ review }) {
  const backenduserImg = `${endpoints.BACKEND_URL}/img/users/`;
  return (
    <div data-aos="fade-up" className="review__card">
      <div className="review__card__firstline">
        <Avatar
          src={backenduserImg.concat(review.user.photo)}
          size={48}
          icon={<UserOutlined />}
          className="review__card__avatar"
        />
        <h2 className="review__card__name">{review.user.name}</h2>
      </div>

      <p className="review__card__content">{review.review}</p>
      <Rate
        allowHalf
        defaultValue={review.rating}
        className="review__card__rating"
      />
    </div>
  );
}

export default Review;
