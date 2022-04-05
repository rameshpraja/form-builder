export const basicBlocks = [
  {
    name: '<i class="fa fa-header m-1" style="font-size: 40px;" aria-hidden="true"></i><br>Heading',
    code: `
    <h2 class="text-center">Enter title</h2>
    `,
  },
  {
    name: '<i class="fa fa-text-width m-1" style="font-size: 40px;" aria-hidden="true"></i><br> Text',
    code: `
      <div class="p-1 w-100" style="min-height:50px">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
      `,
  },
  {
    name: '<i class="fa fa-link m-1" style="font-size: 40px;" aria-hidden="true"></i><br> Link',
    code: `
      <a href="https://www.test.com">Visit test.com!</a>
      `,
  },
  {
    name: '<i class="fa fa-picture-o m-1" style="font-size: 40px;" aria-hidden="true"></i><br> Image',
    code: `
        <img src="https://via.placeholder.com/150" alt="placeholder" class="img-fluid">
        `,
  },
  {
    name: '<i class="fa fa-hand-pointer-o m-1" style="font-size: 40px;" aria-hidden="true"></i><br> Button',
    code: `
        <button class="btn btn-primary">Click me!</button>
        `,
  },
  {
    name: '<i class="fa fa-minus m-1" style="font-size: 40px;" aria-hidden="true"></i><br> Divider',
    code: `
        <hr>
      `,
  },
];
