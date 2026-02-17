import { LightningElement, track } from "lwc";
import { loadScript } from "lightning/platformResourceLoader";
import mixpanelLib from "@salesforce/resourceUrl/mixpanel";

export default class TestForm extends LightningElement {
  @track firstName = "";
  @track lastName = "";
  @track email = "";
  @track phone = "";
  @track message = "";
  @track submitted = false;

  connectedCallback() {
    // Stub required by the globals build — init_from_snippet expects window.mixpanel
    window.mixpanel = window.mixpanel || [];
    window.mixpanel.__SV = 1.2;
    window.mixpanel._i = window.mixpanel._i || [];
    console.log("loading", window.mixpanel);

    // STEP 2: Load the Script
    // Note: We use the import directly (no string concatenation)
    // because you uploaded a single file, not a zip.
    console.log("Loading mixpanelLib", mixpanelLib);
    loadScript(this, mixpanelLib)
      .then(() => {
        console.log(
          "Initializing Mixpanel with token:",
          "5468296eac4270fbe775aea2d4a7a629"
        );
        if (!window.mixpanel.init) {
          console.error(
            "ERROR: Mixpanel library did not load correctly - possibly just a test env"
          );
          return;
        }

        window.mixpanel.init("5468296eac4270fbe775aea2d4a7a629", {
          debug: true,
          persistence: "localStorage",
          ignore_dnt: true
        });

        const distinctId = window.mixpanel.get_distinct_id();
        console.log("Verification - Distinct ID:", distinctId);

        if (distinctId) {
          console.log("SUCCESS: Mixpanel is fully operational.");
        } else {
          console.error(
            "WARNING: Mixpanel initialized, but could not retrieve a Distinct ID."
          );
        }

        window.mixpanel.track("we out here");
      })
      .catch((error) => {
        console.log("errored", error);
        throw error;
      });
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

  handleSubmit() {
    const allValid = [
      ...this.template.querySelectorAll("lightning-input")
    ].reduce((validSoFar, input) => {
      input.reportValidity();
      return validSoFar && input.checkValidity();
    }, true);

    if (allValid) {
      this.submitted = true;
      window.mixpanel.track("Form Submitted", {
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
