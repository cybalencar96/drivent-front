import api from "./api";
import AuthenticatedApi from "./AuthenticatedApi";

export default class HotelApi extends AuthenticatedApi {
  getHotels() {
    return api.get("/hotel", {
      headers: this.getAuthorizationHeader(),
    });
  }

  getHotelRooms(hotelId) {
    return api.get(`/room/${hotelId}`, {
      headers: this.getAuthorizationHeader(),
    });
  }

  getAvailableRooms(hotelId) {
    return api.get(`/room/available/${hotelId}`, {
      headers: this.getAuthorizationHeader(),
    });
  }

  getRoomDetails(hotelId) {
    return api.get(`/room/details/${hotelId}`, {
      headers: this.getAuthorizationHeader(),
    });
  }

  makeReservation(roomId, token) {
    return api.post(
      `/room/reservation/${roomId}`,
      {},
      {
        headers: this.getAuthorizationHeader() || token,
      }
    );
  }

  getUserReservations(userId) {
    return api.get(`/reservation/${userId}`, {
      headers: this.getAuthorizationHeader(),
    });
  }
}
