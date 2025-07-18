# Weby - A Real-Time Markdown Editor

Weby is a lightweight, in-browser Markdown editor that provides a real-time preview of your rendered document. It's built with HTML, CSS, and vanilla JavaScript, and it supports a variety of features to make writing and styling your documents easy and efficient.

## Features

- **Live Preview**: See your rendered Markdown instantly as you type.
- **GitHub Flavored Markdown**: Standard Markdown syntax, including tables, is supported.
- **Code Syntax Highlighting**: Code blocks are automatically highlighted using `highlight.js`.
- **Custom Styling**: Use an `@style` block at the top of your document to customize the preview pane's background color and the border-radius of code blocks and images.
- **Advanced Image Formatting**: Align images to the left or right and set their width directly in the Markdown image tag.
- **GitHub-Style Admonitions**: Add `[!NOTE]`, `[!TIP]`, `[!WARNING]`, and other admonitions to create styled callout boxes.
- **Copy to Clipboard**: Easily copy the generated HTML to your clipboard.
- **Download as PDF**: Export your rendered document as a PDF.

## How to Use

1.  Open `index.html` in your web browser.
2.  Type your Markdown in the left editor pane.
3.  The right preview pane will update in real-time.

### Special Syntax

- **Custom Styles**:
  ```markdown
  @style
    @background: #f0f0f0;
    @code-radius: 4px;
    @image-radius: 8px;
  @endstyle
  ```
- **Image Attributes**:
  ```markdown
  ![My Image{align=right width=50%}](https://path.to/image.png)
  ```
- **Admonitions**:
  ```markdown
  > [!NOTE]
  > This is a note.

  > [!WARNING]
  > This is a warning.
  ```

## Markdown Syntax Guide

Here are some of the most common Markdown syntax elements you can use in Weby.

| Element | Syntax |
| --- | --- |
| Headers | `# H1` <br> `## H2` <br> `### H3` |
| Bold | `**bold text**` |
| Italic | `*italicized text*` |
| Strikethrough | `~~strikethrough text~~` |
| Blockquote | `> blockquote` |
| Ordered List | `1. First item` <br> `2. Second item` |
| Unordered List | `- First item` <br> `- Second item` |
| Code | `` `code` `` |
| Horizontal Rule | `---` |
| Link | `[title](https://www.example.com)` |
| Image | `![alt text](image.jpg)` |

### Code Blocks

You can create fenced code blocks by placing triple backticks ` ``` ` before and after the code block. You can also specify the language for syntax highlighting.

```javascript
function greet() {
  console.log("Hello, world!");
}
```

## Running Locally

Since this project is built with only client-side technologies, you don't need a complex server setup. You can run it locally using a simple HTTP server. One of the easiest ways is with Python's built-in module.

1.  Navigate to the project directory in your terminal.
2.  Run the following command:
    ```bash
    python3 -m http.server
    ```
3.  Open your web browser and go to `http://localhost:8000`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.