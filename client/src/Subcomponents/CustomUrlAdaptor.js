import { UrlAdaptor } from "@syncfusion/ej2-data";

class CustomUrlAdaptor extends UrlAdaptor {
  constructor(token) {
    super();
    this.token = token;
  }

  beforeSend(dm, request, settings) {
    request.setRequestHeader("Authorization", `Bearer ${this.token}`);
  }
}

export default CustomUrlAdaptor;
