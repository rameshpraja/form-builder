export const formsHtml = [
  [
    'Company Information form',
    `
    <form
    type="text"
    required
    id="form"
    novalidate=""
    class="row py-4 px-2 needs-validation"
  >
    <div class="row">
      <div class="col-md-6 mt-1">
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            aria-describedby="emailHelp"
            placeholder="Enter First Name"
            name="firstName"
            required
          />
          <div class="invalid-feedback">Please provide a valid input.</div>
        </div>
      </div>
      <div class="col-md-6 mt-1">
        <div class="form-group">
          <label for="lastName">Last address:</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            placeholder="Enter last Name"
            name="lastName"
          />
          <div class="invalid-feedback">Please provide a valid input.</div>
        </div>
      </div>
      <div class="col-md-6 mt-1">
        <div class="form-group">
          <label for="firstName">Company Name:</label>
          <input
            type="text"
            class="form-control"
            id="companyName"
            placeholder="Enter Company Name"
            name="companyName"
          />
          <div class="invalid-feedback">Please provide a valid input.</div>
        </div>
      </div>
      <div class="col-md-6 mt-1">
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="text"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            name="email"
            required
          />
          <div class="invalid-feedback">Please provide a valid input.</div>
        </div>
      </div>
      <div class="col-md-12 mt-1">
        <div class="form-group">
          <label for="phone">Phone number:</label>
          <input
            type="number"
            class="form-control"
            id="phone"
            aria-describedby="emailHelp"
            placeholder="Enter First Name"
            name="phone"
            required
          />
          <div class="invalid-feedback">Please provide a valid input.</div>
        </div>
      </div>
      <div class="col-md-12 mt-1">
        <div class="form-group">
          <label for="address">Address</label>
          <textarea
            class="form-control"
            id="address"
            name="address"
            rows="3"
          ></textarea>
        </div>
      </div>
      <div class="col-md-12 mt-1">
        <button class="btn btn-success" type="submit">SUBMIT</button>
        <button class="btn btn-primary" type="reset">RESET</button>
      </div>
    </div>
  </form>
  <script>
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function () {
      "use strict";
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll(".needs-validation");
      // Loop over them and prevent submission
      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    })();
  </script>
    `,
  ],
  ['form with validation',`
  <form class="row py-4 px-2 needs-validation" style="min-height:100px" id="form" novalidate>
  
</form>
<script>
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.confirmPassword.addEventListener("keyup", function () {
        if (form.password.value !== form.confirmPassword.value) {
          form.confirmPassword.setCustomValidity("Invalid field.");
        } 
        else {
          form.confirmPassword.setCustomValidity("");
        }
      });
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
})()
</script>
  `]
  
];

export const inputHTML = [
  [
    'input',
    `
    <div class="col-md-12 p-2">
    <label for="validationCustom01" class="form-label">First name</label>
    <input type="text" class="form-control" id="validationCustom01" required>
    <div class="valid-feedback">
      Looks good!
    </div>
    <div class="invalid-feedback">
      Please provide a valid input.
  </div>
  </div>
    `,
  ],
  [
    'Password input',
    `
    <div class="col-md-12 p-2">
    <label for="validationCustom01" class="form-label">Password</label
    ><input
      type="password"
      pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}"
      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
      required
      id="password"
      class="form-control"
    />
    <small>Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters</small>
    <div class="valid-feedback">Looks good!</div>
    <div class="invalid-feedback">Please provide a valid input.</div>
  </div>
  <div class="col-md-12 p-2">
    <label for="validationCustom01" class="form-label">Confirm Password</label
    ><input
      type="password"
      title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
      required
      id="confirmPassword"
      class="form-control"
    />
    <small>Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters</small>
    <div class="valid-feedback">Password match</div>
    <div class="invalid-feedback">Please provide a valid input.</div>
  </div>
    `
  ],  
  [
    'submit button',
    `
    <button type="submit" class="btn btn-primary">Submit</button>
      `,
  ],
]