import api from "./api";
import AuthenticatedApi from "./AuthenticatedApi";

export default class TicketApi extends AuthenticatedApi {
  getTicket() {
    return api.get("/ticket", { headers: this.getAuthorizationHeader() });
  }
}
