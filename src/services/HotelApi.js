import api from "./api";

export default class HotelApi {
  getHotels() {
    return api.get("/hotel");
  }

  getHotelRooms(hotelId) {
    return api.get(`/room/${hotelId}`);
  }

  getAvailableRooms(hotelId) {
    return api.get(`/room/available/${hotelId}`);
  }

  getRoomDetails(hotelId) {
    return api.get(`/room/details/${hotelId}`);
  }
}
