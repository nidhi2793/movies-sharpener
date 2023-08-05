import React, { useState } from "react";
import classes from "./NewItemForm.module.css";

const NewMovieForm = () => {
  const [title, setTitle] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [date, setDate] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleOpeningText = (e) => {
    setOpeningText(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = () => {
    console.log({ title, openingText, date });
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <label>Title</label>
      <input onChange={handleTitle} value={title}></input>

      <label>Opening Text</label>
      <input onChange={handleOpeningText} value={openingText}></input>

      <label>release date</label>
      <input onChange={handleDate} value={date}></input>

      <button type="submit" style={{ width: 200 }}>
        Add Movie
      </button>
    </form>
  );
};

export default NewMovieForm;
