import { useRef, useState } from "react";
import { AiOutlineHighlight } from "react-icons/ai";
import { BsLink } from "react-icons/bs";

import { ImFontSize, ImTextColor } from "react-icons/im";
import {
  icons,
  fontSizeList,
  fontFamilyList,
  emojiList,
  scaleList,
} from "../../Fixture/Icon";
import style from "./Navbar.module.css";
import { RxImage } from "react-icons/rx";
import { BiPrinter } from "react-icons/bi";
export default function Navbar({ printDiv }) {
  const [emoji, setEmoji] = useState("&#128514;");
  const [fontSize, setFontSize] = useState("Font Size");
  const [scaleSize, setScaleSize] = useState("100%");
  const [fontName, setFontName] = useState("Font Style");
  const [color, setColor] = useState("#000000");
  const [higlightColor, setHiglightColor] = useState("#000000");

  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false);
  const inputRef = useRef();

  function handleAction(element) {
    document.execCommand(`${element.action}`);
  }
  function handleFontColor(e) {
    setColor(e.target.value);
    console.log(e.target.value);
    document.execCommand("foreColor", false, e.target.value);
  }
  function handleFontSize(e) {
    setFontSize(e.target.value);
    document.execCommand("fontSize", false, e.target.value);
  }
  function handleHighlightColor(e) {
    setHiglightColor(e.target.value);
    document.execCommand("backColor", false, e.target.value);
  }
  function handleFontStyle(e) {
    setFontName(e.target.value);
    document.execCommand("fontName", false, e.target.value);
    console.log(e.target.value);
  }
  function handleEmoji(e) {
    setEmoji(e.target.value);

    if (e.target.value === "Smile") {
      document.execCommand("insertHTML", false, "&#128514");
    } else if (e.target.value === "Thumb-Up") {
      document.execCommand("insertHTML", false, "&#128077");
    } else if (e.target.value === "Thumb-Down") {
      document.execCommand("insertHTML", false, "&#128078");
    }else if(e.target.value === "Kiss"){
      document.execCommand("insertHTML", false, "&#128536");
    }
    console.log(e.target.value);
  }

  function handleOpen(value) {
    setShow(!show ? true : false);
    if (value === "link") {
      document.execCommand("createLink", false, link);
    } else {
      document.execCommand("insertImage", false, link || image);
      setImage("");
    }
    setLink("");
  }
  function handleScale(e) {
    setScaleSize(e.target.value);
    if (e.target.value === "100%") {
      printDiv.current.style.transform = "scale(1,1)";
    } else if (e.target.value === "150%") {
      printDiv.current.style.transform = "scale(1.5,1)";
    } else if (e.target.value === "200%") {
      printDiv.current.style.transform = "scale(2,1)";
    } else if (e.target.value === "50%") {
      printDiv.current.style.transform = "scale(0.65,0.65)";
    } else if (e.target.value === "25%") {
      printDiv.current.style.transform = "scale(0.5,0.5)";
    } else if (e.target.value === "75%") {
      printDiv.current.style.transform = "scale(0.8,1)";
    }
  }
  // console.log(scaleSize, "scale");

  const handlePrint = () => {
    console.log(printDiv);
    let printContents = printDiv.current.innerHTML;
    console.log(printContents);
    let originalContents = document.body.innerHTML;
    // console.log(originalContents)
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    // console.log(originalContents)
  };

  function handleImageOpen() {
    inputRef.current.click();
  }
  function captureImage(event) {
    if (event.target.files[0]) {
      console.log(event.target.files[0]);
      document.execCommand(
        "insertImage",
        "",
        URL.createObjectURL(event.target.files[0])
      );
    }
  }

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.fontStyleBox}>
          <select
          style={{width:"100%"}}
            className={style.fontStyle}
            id="fontStyle"
            onChange={handleScale}
          >
            <option>{scaleSize}</option>
            {scaleList.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
        <button onClick={handlePrint}>
          <BiPrinter />
        </button>
        {icons.slice(0, 6).map((element, index) => (
          <button key={index} onClick={() => handleAction(element)}>
            {element.icon}
          </button>
        ))}

        <div  className={style.fontStyleBox}>
          <select  className={style.fontStyle}  onChange={handleEmoji}>
            <option>Emoji</option>
            {emojiList.map((x, i) => (
              <option key={i}>{x.icon}</option>
            ))}
          </select>
        </div>

        <div className={style.fontStyleBox}>
          <select
            className={style.fontStyle}
            id="fontStyle"
            onChange={handleFontStyle}
          >
            <option>{fontName}</option>
            {fontFamilyList.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>

        <button>
          <label htmlFor="color">
            <ImTextColor style={{ color: color }} />
          </label>
          <input
            className={style.input}
            id="color"
            type="color"
            value={color}
            onChange={handleFontColor}
          />
        </button>

        <div className={style.fontSize}>
          <label htmlFor="fontSize">
            <span>
              <ImFontSize className={style.icon} />
            </span>
          </label>
          <select id="fontSize" onChange={handleFontSize}>
            <option>3</option>
            {fontSizeList.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>

        <button>
          <label htmlFor="highlighColor">
            <AiOutlineHighlight style={{ zIndex: "1", color: higlightColor }} />
          </label>
          <input
            className={style.input}
            id="highlighColor"
            type="color"
            value={higlightColor}
            onChange={handleHighlightColor}
          />
        </button>

        <button onClick={() => handleOpen("link")}>
          <label htmlFor="link">
            <BsLink />
          </label>
        </button>
        <button>
          <label htmlFor="link">
            <RxImage onClick={handleImageOpen} />
          </label>
        </button>

        {icons.slice(6).map((element, index) => (
          <button key={index} onClick={() => handleAction(element)}>
            {element.icon}
          </button>
        ))}
      </div>
      {show ? (
        <div className={style.linkBox}>
          <h4>Paste your Link Here....</h4>

          <input
            id="link"
            value={link}
            type="url"
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
      ) : (
        ""
      )}
      <input ref={inputRef} hidden onChange={captureImage} type="file" />
    </>
  );
}
