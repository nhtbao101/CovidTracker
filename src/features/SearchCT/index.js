import React, { useRef, useState } from "react";
import { Input } from "antd";

const { Search } = Input;

SearchCT.propTypes = {};

function SearchCT(props) {
  const { onSubmit } = props;
  const [item, setItem] = useState("");
  const typingRef = useRef(null);
  const onSearch = (event) => {
    const value = event.target.value;
    // console.log("value", value);
    if (event.key === "Enter") {
      event.preventDefault();
      console.log("ssssss");
      setItem(value);
      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }

      typingRef.current = setTimeout(() => {
        const FormValue = {
          q: value,
        };
        onSubmit(FormValue);
      }, 1000);
    }
    setItem(value);
    if (typingRef.current) {
      clearTimeout(typingRef.current);
    }

    typingRef.current = setTimeout(() => {
      const FormValue = {
        q: value,
      };
      onSubmit(FormValue);
    }, 1000);
  };
  return (
    <>
      <Search
        placeholder="Input country name"
        value={item}
        onChange={onSearch}
        enterButton
      />
    </>
  );
}

export default SearchCT;
