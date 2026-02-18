import { LightningElement, track } from "lwc";
import { initMixpanel } from "c/mixpanelUtils";

export default class TestForm extends LightningElement {
  @track firstName = "";
  @track lastName = "";
  @track email = "";
  @track phone = "";
  @track message = "";
  @track submitted = false;

  mixpanel = null;
  async connectedCallback() {
    this.mixpanel = initMixpanel("5468296eac4270fbe775aea2d4a7a629");
    this.mixpanel.track("Form Loaded", { a: "asdf" });
  }

  handleFirstNameChange(event) {
    this.firstName = event.target.value;
  }

  handleLastNameChange(event) {
    this.lastName = event.target.value;
  }

  handleEmailChange(event) {
    this.email = event.target.value;
  }

  handlePhoneChange(event) {
    this.phone = event.target.value;
  }

  handleMessageChange(event) {
    this.message = event.target.value;
  }

  async handleSubmit() {
    const allValid = [
      ...this.template.querySelectorAll("lightning-input")
    ].reduce((validSoFar, input) => {
      input.reportValidity();
      return validSoFar && input.checkValidity();
    }, true);

    if (allValid) {
      this.submitted = true;
      this.mixpanel.identify(this.email);
      this.mixpanel.track("Form Submitted", {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        message: this.message
      });
    }
  }

  handleReset() {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.phone = "";
    this.message = "";
    this.submitted = false;
  }
}
