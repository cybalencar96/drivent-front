import AuthenticatedApi from "./AuthenticatedApi";
import api from "./api";

export default class PaymentApi extends AuthenticatedApi {
  pay(body) {
    return api.post("/ticket/payment", body, {
      headers: {
        ...this.getAuthorizationHeader()
      }
    });
  }
}
