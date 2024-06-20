const marked = require("marked");
const sanitizeHtml = require("sanitize-html");
const TurndownService = require("turndown");

function sanitizeMarkdown(markdownContent) {
  const turndownService = new TurndownService();
  //1 conver markdown to html
  const convertedHtml = marked.parse(markdownContent);

  // console.log("convertedHtml---" , convertedHtml, "---convertedHtml");

  //2 sanitize the html
  const sanitizedHtml = sanitizeHtml(convertedHtml, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
  });

  const sanitizeMarkdown = turndownService.turndown(sanitizedHtml);

  //3 convert the sanitized html back to markdown

  // console.log("sanitizeMarkdown---" , sanitizeMarkdown, "---sanitizeMarkdown");

  return sanitizeMarkdown;
}

const input = `

# Heading 1

This is a paragraph of text.

## Heading 2

- List item 1
- List item 2
- List item 3

### Heading 3

1. Numbered item 1
2. Numbered item 2
3. Numbered item 3

#### Heading 4

> This is a blockquote.

##### Heading 5

**Bold text**

*Italic text*

###### Heading 6

[Link to Google](https://www.google.com)

![Image](https://example.com/image.jpg)

`;
sanitizeMarkdown(input);

module.exports = sanitizeMarkdown;
