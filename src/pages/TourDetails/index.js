import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, withRouter } from "react-router-dom";
import { getTour, getTourReviews } from "../../store/actions/TourActions";
import * as endpoints from "../../configs/endpointConfig";
import Loading from "../../components/Loading";
import moment from "moment";
import history from "../../history";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  FieldTimeOutlined,
  LineChartOutlined,
  LoadingOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, PageHeader } from "antd";
import MapBox from "../../components/mapBox/MapBox";
import Review from "../../components/Review/Review";
import Footer from "../../components/Footer/Footer";
import {
  getCheckoutSession,
  getMyBookings,
} from "../../store/actions/BookingActions";
import { setSpiner } from "../../store/actions/AlertActions";
import checkIfTourIsBooked from "../../util/checkIfTourIsBooked";
import AddReview from "../../components/AddReview/AddReview";
import { useTranslation } from "react-i18next";

function TourDetails() {
  const dispatch = useDispatch();
  const tour = useSelector((state) => state.tours.tour);
  const auth = useSelector((state) => state.auth);
  const tourReviews = useSelector((state) => state.tours.reviews);
  const spinner = useSelector((state) => state.alert.spinner);
  const mybookings = useSelector((state) => state.bookings.mybookings);
  const { t } = useTranslation("words");
  const backendImg = `${endpoints.BACKEND_URL}/img/tours/`;
  const backenduserImg = `${endpoints.BACKEND_URL}/img/users/`;
  const routeParams = useParams();

  useEffect(() => {
    dispatch(getTour(routeParams.id));
    dispatch(getTourReviews(routeParams.id));
  }, [routeParams]);

  useEffect(() => {
    if (auth.loggedIn && auth.user) dispatch(getMyBookings(auth.user._id));
  }, [auth]);

  const handleBookingTheTour = () => {
    dispatch(setSpiner(true));

    dispatch(getCheckoutSession(tour.id));
  };

  return !tour ? (
    <Loading />
  ) : (
    <div>
      <div
        className="header"
        style={{
          backgroundImage: `linear-gradient(to right bottom,
            hsla(111, 55%, 64%, 0.8),
            hsla(160, 64%, 43%, 0.8)), url('${backendImg}${tour.imageCover}')`,
        }}
      >
        <PageHeader onBack={() => history.goBack()} title="Back" />
        <div className="header__content">
          <h4 className="header__heading ">
            <span className="rotatecard__heading-span rotatecard__heading-span--1">
              {tour.name}
            </span>
          </h4>
          <div style={{ display: "flex" }}>
            <div>
              <FieldTimeOutlined className="header__heading__icon" />
              <span>
                {tour.duration} {t("DAYS")}
              </span>
            </div>
            <div style={{ marginLeft: "2rem" }}>
              <EnvironmentOutlined className="header__heading__icon" />
              <span>{tour.startLocation.description}</span>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="details">
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                padding: "15rem 10%",
                backgroundColor: "#ddd",
              }}
            >
              <div>
                <h1 className="details__mainTitle">{t("QUICK_FACTS")}</h1>
                <div className="details__factItem">
                  <CalendarOutlined className="details__icon" />
                  <h5 className="details__item"> {t("NEXT_DATE")} </h5>
                  <h5 className="details__subItem">
                    {moment(tour.createdAt).format("MMMM, YYYY")}
                  </h5>
                </div>
                <div className="details__factItem">
                  <LineChartOutlined className="details__icon" />
                  <h5 className="details__item"> {t("Difficulty")} </h5>
                  <h5 className="details__subItem"> {tour.difficulty} </h5>
                </div>
                <div className="details__factItem">
                  <UserOutlined className="details__icon" />
                  <h5 className="details__item">{t("PARTICIPANTS")} </h5>
                  <h5 className="details__subItem">{tour.maxGroupSize}</h5>
                </div>
                <div className="details__factItem">
                  <StarOutlined className="details__icon" />
                  <h5 className="details__item"> {t("Rating")} </h5>
                  <h5 className="details__subItem"> {tour.ratingAverage}/5 </h5>
                </div>
              </div>

              <div style={{ marginTop: "3rem" }}>
                <h1 className="details__mainTitle">{t("YOUR_TOUR_GUIDES")}</h1>
                <div>
                  {tour.guides.map((t, index) => (
                    <div className="details__guide" key={index}>
                      <Avatar
                        src={`${backenduserImg}${t.photo}`}
                        icon={<UserOutlined />}
                      />
                      <h5 className="details__item details__guide__role">
                        {t.role}
                      </h5>
                      <h5 className="details__subItem"> {t.name}</h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="details__about">
              <div>
                <h1 className="details__mainTitle">
                  {t("ABOUT")} {tour.name} {t("TOUR")}
                </h1>
                <p className="details__about__text">{tour.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="gallery">
        {tour.images.map((img, index) => (
          <img
            className="gallery__image"
            key={index}
            src={backendImg.concat(img)}
            alt=""
          />
        ))}
      </section>
      <section className="mapContainer">
        <MapBox
          isRightClickEnabled={false}
          popLocation={null}
          locations={tour.locations}
        />
      </section>
      <section className="reviewContainer">
        <div className="reviewContainer__box">
          {auth.loggedIn ? (
            tourReviews.length > 0 ? (
              tourReviews.map((review, index) => (
                <Review key={index} review={review} />
              ))
            ) : (
              <h4
                className="header__heading "
                style={{ width: "100%", fontSize: "3rem" }}
              >
                <span className="rotatecard__heading-span rotatecard__heading-span--1">
                  {t("There_is_no_reviews_yet_for_this_tour")}
                </span>
              </h4>
            )
          ) : (
            <h4
              className="header__heading "
              style={{ width: "100%", fontSize: "3rem" }}
            >
              <span className="rotatecard__heading-span rotatecard__heading-span--1">
                {t("You_need_to_be_logged_in_to_see_the_reviews")}
              </span>
            </h4>
          )}
        </div>
      </section>
      {checkIfTourIsBooked(tour.id, mybookings) && <AddReview tour={tour} />}
      {!checkIfTourIsBooked(tour.id, mybookings) && (
        <section className="waitSection">
          <div className="Whatwaiting">
            <Avatar.Group
              maxCount={3}
              size={125}
              maxStyle={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
              }}
            >
              <Avatar
                src={backendImg.concat(tour.images[0])}
                style={{
                  marginLeft: "35%",
                }}
              />
              <Avatar
                src={backendImg.concat(tour.images[1])}
                style={{
                  marginLeft: "-50%",
                }}
              />
              <Avatar
                src={backendImg.concat(tour.images[2])}
                style={{
                  marginLeft: "-50%",
                }}
              />
            </Avatar.Group>
            <div style={{ marginLeft: "-5rem", marginRight: "5rem" }}>
              <h1 className="title">{t("what_are_you_waiting_for")}</h1>
              <p>
                {tour.duration} {t("DAYS")}, 1 {t("advanture")},{" "}
                {t("infinite_memories")}
              </p>
            </div>
            {!auth.loggedIn ? (
              <Link to="/login" className="button button--green">
                {t("LOGIN_TO_BOOK_TOUR")}
              </Link>
            ) : spinner ? (
              <a className="button button--green">
                {t("processing")}{" "}
                <LoadingOutlined style={{ fontSize: "2.5rem" }} spin />
              </a>
            ) : (
              <a
                className="button button--green"
                onClick={handleBookingTheTour}
              >
                {t("BOOK_THE_TOU_NOW")}
              </a>
            )}
          </div>
        </section>
      )}
      <Footer expanded={true} />
    </div>
  );
}

export default withRouter(TourDetails);
