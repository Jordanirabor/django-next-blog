
// components/Editor.js

import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "video"
];

class Editor extends Component {
  modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" }
        ],
        ["link", "video"],
        ["clean"]
      ],
      handlers: {
        link: function(value) {
          if (value) {
            var href = prompt("Enter the URL");
            this.quill.format("link", href);
          } else {
            this.quill.format("link", false);
          }
        }
      }
    }
  };

  render() {
    return (
      <ReactQuill
        theme="snow"
        onChange={this.props.onChange}
        modules={this.modules}
        formats={formats}
        placeholder={"Start typing your creative story"}
        value={this.props.value}
      />
    );
  }
}
export default Editor;