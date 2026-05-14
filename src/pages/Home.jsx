import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { APP_NAME } from "../constants";

import BookingService from "../services/booking/BookingService";
import OfferService from "../services/offers/OffersService";
import TypeService from "../services/types/TypeService";
import UserService from "../services/users/UserService";

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
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [animatedUsers, usersCount]);

  useEffect(() => {
    if (animatedOffers < offersCount) {
      const timer = setTimeout(() => {
        setAnimatedOffers((prev) => Math.min(prev + 1, offersCount));
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [animatedOffers, offersCount]);

  useEffect(() => {
    if (animatedTypes < typesCount) {
      const timer = setTimeout(() => {
        setAnimatedTypes((prev) => Math.min(prev + 1, typesCount));
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [animatedTypes, typesCount]);

  useEffect(() => {
    if (animatedBookings < bookingsCount) {
      const timer = setTimeout(() => {
        setAnimatedBookings((prev) => Math.min(prev + 1, bookingsCount));
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [animatedBookings, bookingsCount]);

  return (
    <div className="home-page" role="main">
      <div className="home-page_inner">

        <div className={`home-card${loaded ? " fade-in" : ""}`}>
          <div className="home-card_text">
            <h1 className="home-card_text-title">
              Welcome to {APP_NAME}
            </h1>

            <p className="home-card_text-subtitle">
              Manage bookings, users and offers in one place.
            </p>
          </div>

          <div className="home-card_animation">
            <DotLottieReact
              src="/animations/location.lottie"
              loop
              autoplay
            />
          </div>
        </div>

        {/* STATISTICS (NO CARDS FRAME) */}
        <div className="home-statistics">
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
  );
}