import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Row, Col, Card } from "react-bootstrap";

import { APP_NAME } from "../constants";

import BookingService from "../services/booking/BookingServiceLocalStorage";
import OfferService from "../services/offers/OfferServiceLocalStorage";
import TypeService from "../services/types/TypeServiceLocalStorage";
import UserService from "../services/users/UserServiceLocalStorage";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const [usersCount, setUsersCount] = useState(0);
  const [offersCount, setOffersCount] = useState(0);
  const [typesCount, setTypesCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);

  const [animatedUsers, setAnimatedUsers] = useState(0);
  const [animatedOffers, setAnimatedOffers] = useState(0);
  const [animatedTypes, setAnimatedTypes] = useState(0);
  const [animatedBookings, setAnimatedBookings] = useState(0);

  useEffect(() => {
    setLoaded(true);

    const loadData = async () => {
      try {
        const usersResponse = await UserService.get();
        const offersResponse = await OfferService.get();
        const typesResponse = await TypeService.get();
        const bookingsResponse = await BookingService.get();

        const activeOffers = offersResponse.data.filter(
          (offer) => offer.active === true
        );

        const activeTypes = typesResponse.data.filter(
          (type) => type.active === true
        );

        const activeBookings = bookingsResponse.data.filter(
          (booking) => booking.active === true
        );

        setUsersCount(usersResponse.data.length);
        setOffersCount(activeOffers.length);
        setTypesCount(activeTypes.length);
        setBookingsCount(activeBookings.length);
      } catch (error) {
        console.error("Error loading statistics:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (animatedUsers < usersCount) {
      const timer = setTimeout(() => {
        setAnimatedUsers((prev) => Math.min(prev + 1, usersCount));
      }, 60);

      return () => clearTimeout(timer);
    }
  }, [animatedUsers, usersCount]);

  useEffect(() => {
    if (animatedOffers < offersCount) {
      const timer = setTimeout(() => {
        setAnimatedOffers((prev) => Math.min(prev + 1, offersCount));
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [animatedOffers, offersCount]);

  useEffect(() => {
    if (animatedTypes < typesCount) {
      const timer = setTimeout(() => {
        setAnimatedTypes((prev) => Math.min(prev + 1, typesCount));
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [animatedTypes, typesCount]);

  useEffect(() => {
    if (animatedBookings < bookingsCount) {
      const timer = setTimeout(() => {
        setAnimatedBookings((prev) => Math.min(prev + 1, bookingsCount));
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [animatedBookings, bookingsCount]);

  return (
    <div className="home-page">
      <div className="home-background">
        <div className="home-overlay">

          <div className="home-content-wrapper">

            {/* HERO */}
            <div className={`home-card hero-center-content ${loaded ? "fade-in" : ""}`}>

              <div className="home-text">
                <h1 className="home-title">
                  Welcome to {APP_NAME}
                </h1>

                <p className="home-subtitle">
                  Manage bookings, users and offers in one place.
                </p>
              </div>

              <div className="home-animation">
                <DotLottieReact
                  src="/animations/location.lottie"
                  loop
                  autoplay
                />
              </div>

            </div>

            {/* STATISTICS (NO CARDS FRAME) */}
            <div className="statistics-clean-wrapper">

              <div className="stat-item">
                <div className="stat-number">{animatedUsers}</div>
                <div className="stat-label">Users</div>
              </div>

              <div className="stat-item">
                <div className="stat-number">{animatedOffers}</div>
                <div className="stat-label">Active Offers</div>
              </div>

              <div className="stat-item">
                <div className="stat-number">{animatedTypes}</div>
                <div className="stat-label">Active Types</div>
              </div>

              <div className="stat-item">
                <div className="stat-number">{animatedBookings}</div>
                <div className="stat-label">Active Bookings</div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}