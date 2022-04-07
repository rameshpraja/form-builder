export const basicBlocks = [
  {
    name: 'Heading',
    code: `
    <h2 class="text-center">Enter title</h2>
    `,
    iconLink: 'heading.png',
  },
  {
    name: 'Text',
    code: `
      <div class="p-1 w-100" style="min-height:50px">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
      `,
    iconLink: 'text.png',
  },
  {
    name: 'Link',
    code: `
      <a href="https://www.test.com">Visit test.com!</a>
      `,
    iconLink: 'link.png',
  },
  {
    name: 'Image',
    code: `
        <img src="https://via.placeholder.com/150" alt="placeholder" class="img-fluid">
        `,
    iconLink: 'image.png',
  },
  {
    name: 'Button',
    code: `
        <button class="btn btn-primary">Click me!</button>
        `,
    iconLink: 'button.png',
  },
  {
    name: 'Divider',
    code: `
        <hr>
      `,
    iconLink: 'button.png',
  },
];
