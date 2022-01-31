import api from "./api";

export default class UserApi {
  signUp(email, password) {
    return api.post("/users", { email, password });
  }

  static signInEvents(userId, eventId) {
    return api.post("/users/event", { userId, eventId });
  }

  static listMyEvents(userId) {
    return api.get(`/users/event/${userId}`);
  }

  static getAllEvents() {
    return api.get("/users/event/0");
  }
}
