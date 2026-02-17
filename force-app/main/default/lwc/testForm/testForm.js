import { LightningElement, track } from "lwc";

export default class TestForm extends LightningElement {
  @track firstName = "";
  @track lastName = "";
  @track email = "";
  @track phone = "";
  @track message = "";
  @track submitted = false;

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

  handleSubmit() {
    const allValid = [
      ...this.template.querySelectorAll("lightning-input")
    ].reduce((validSoFar, input) => {
      input.reportValidity();
      return validSoFar && input.checkValidity();
    }, true);

    if (allValid) {
      this.submitted = true;
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
