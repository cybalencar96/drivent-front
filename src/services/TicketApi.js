import api from "./api";
import AuthenticatedApi from "./AuthenticatedApi";

export default class TicketApi extends AuthenticatedApi {
  payTicket(body) {
    return api.post("/ticket/payment", body, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }

  getTicket() {
    return api.get("/ticket", {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
