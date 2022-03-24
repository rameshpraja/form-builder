export const formsHtml = [
  [
    'form',
    `
    <form style="min-height:100px" id="form">
    <div class="form-group">
    Form Group
    </div>
</form>
<script >
function logSubmit(event) {
    console.log("form submit");
    event.preventDefault();
  }
 
  const form = document.getElementById('form');
  const log = document.getElementById('log');
  form.addEventListener('submit', logSubmit);</script>
    `,
  ],
  
];

export const inputHTML = [
  [
    'input',
    `
    <label for="fname">First name:</label><br>
    <input type="text" id="fname" name="fname"><br>
    `,
  ],
  [
    'submit button',
    `
        <input type="submit" value="Submit"></input>
      `,
  ],
]
