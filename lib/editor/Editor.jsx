"use client"
import { useEffect, useState } from "react";
import ManageDoc from "../utils/ManageDoc"
import Link from "next/link";
import styles from "./editor.module.css";
import TitleBlock from "./blocks/TitleBlock";
import MarkdownBlock from "./blocks/MarkdownBlock";
import Overlay from "./Overlay";
import SplitButton from "./SplitButton";

const Editor = ({userId, docId}) => {
  let doc = new ManageDoc({ userId, docId });

  const [title, _setTitle] = useState("");
  const [blocks, _setBlocks] = useState([]);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 });
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [focus, _setFocus] = useState(-2);
  const setFocus = (newFocus) => {
    _setFocus(newFocus);
  };

  const setTitle = (newTitle) => {
    _setTitle(newTitle);
  };
  const setBlocks = (newBlocks) => {
    if (newBlocks.length === 0) {
      _setBlocks([doc.defaultBlock]);
    } else {  
      _setBlocks(newBlocks);
    }
  };
  const adjustHeight = (idx) => {
    //div element
    const de = document.getElementById(idx);
    if (!(de && de instanceof HTMLElement)) {
      return;
    }
    // console.log(`${idx} - style : `, de.style.height);
    //textarea element
    const ta = de.querySelector("textarea");
    if (ta && ta instanceof HTMLElement) {
      ta.style.height = "10px";
      ta.style.height = `${ta.scrollHeight}px`;
      de.style.height = "10px";
      de.style.height = `${ta.scrollHeight}px`;
      // console.log(`${idx}th height of div: `, de.style.height);
      return;
    }
  }
  const manageHeights = () => {
    blocks.map((_, idx) => adjustHeight(idx));
    adjustHeight(-1);
  }

  const blockHandleKeyDown = (event, idx) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      let newBlocks = [...blocks];
      newBlocks.splice(idx + 1, 0, doc.defaultBlock);
      setBlocks(newBlocks);
      setFocus(idx+1);
    } else if (event.key === 'Backspace') {
      if (blocks[idx].content === "") {
        event.preventDefault();
        const newBlocks = [...blocks];
        newBlocks.splice(idx, 1);
        setBlocks(newBlocks);
        setFocus(idx - 1);
      }
    }
  }
  const handleInput = (e, idx) => {
    e.preventDefault();
    let newBlocks = [...blocks];
    newBlocks[idx].content = e.target.value;
    setBlocks(newBlocks);

    adjustHeight(idx);
  }
  const handleSubmit = async () => {
    doc.title = title;
    doc.blocks = blocks;
    await doc.upload();
  };
  const handleMouseDown = (event) => {
    if (event.target.id === "editor") {
      // console.log('id : ', event.target.id);
      event.preventDefault();
      const startX = event.clientX;
      const startY = event.clientY;
  
      setIsSelecting(true);
      setSelectionStart({ x: startX, y: startY });
      setSelectionEnd({ x: startX, y: startY });
      setSelectedComponents([]);
    }
  };
  const handleMouseMove = (event) => {
    if (!isSelecting) return;
    setSelectionEnd({ x: event.clientX, y: event.clientY });
  };
  const handleMouseUp = () => {
    setIsSelecting(false);
    updateSelectedComponents();
  };
  const updateSelectedComponents = () => {
    const left = selectionStart.x < selectionEnd.x ? selectionStart.x : selectionEnd.x;
    const top = selectionStart.y < selectionEnd.y ? selectionStart.y : selectionEnd.y;
    const right = selectionStart.x > selectionEnd.x ? selectionStart.x : selectionEnd.x;
    const bottom = selectionStart.y > selectionEnd.y ? selectionStart.y : selectionEnd.y;
    const newSelectedComponents = [];
    
    blocks.map((_, idx) => {
      const temp = document.getElementById(idx);
      const rect = temp.getBoundingClientRect();
      if (rect.top >= top && rect.left >= left && rect.bottom <= bottom && rect.right <= right) {
        newSelectedComponents.push(idx);
        // console.log(`${idx}th component selected!!`);
      }
    })

    setSelectedComponents(newSelectedComponents);
  };

  useEffect(() => {
    const fetchDoc = async () => {
      await doc.fetch();
      setTitle(doc.title);
      setBlocks(doc.blocks);
    }
    fetchDoc();
    manageHeights();
    window.addEventListener('resize', manageHeights);
   
    return () => { window.removeEventListener('resize', manageHeights); }
  }, []);

  useEffect(() => {
    manageHeights();
  }, [title, blocks]);

  useEffect(() => {
    // selectedComponents.map((idx)=>console.log(`selected components : `, idx));
    selectedComponents.map((idx) => {
      const temp = document.getElementById(idx);
      temp.style.border = "2px solid red";
    })

    return (() => {
      selectedComponents.map((idx) => {
        const temp = document.getElementById(idx);
        if (temp && temp.style) {
          temp.style.border = "";
        }
      })
    })
  }, [selectedComponents]);
  
  useEffect(() => {
    const block = document.getElementById(focus);
    if (block instanceof HTMLElement) {
      // console.log('(edit-doc) type of block : ', block.tagName);
      const ta = block.querySelector('textarea');
      if (ta && ta instanceof HTMLElement) {
        ta.focus();
        ta.selectionStart = ta.value.length;
        ta.selectionEnd = ta.value.length;
      }
    }
  }, [focus]);
  
  return (
    <div
      className={styles.container}
      id="editor"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className={styles.contents}
      >
        <button onClick={handleSubmit}>submit</button>
        <div id="-1">
          <TitleBlock
            title={title}
            titleHandleChange={setTitle}
          />
        </div>
        {blocks.map((block, idx) => (
          <div
            className={styles.block}
            key={idx}
            id={idx}
          >
            {block.type === "markdown" && (
              <MarkdownBlock
                block={block}
                idx={idx}
                handleInput={handleInput}
                blockHandleKeyDown={blockHandleKeyDown}
              />
            )}
            
            {block.type === "docId" && (
              <Link href={`/edit/${block.content}`}>{block.content}</Link>
            )}

          </div>
        ))}

      </div>
      <SplitButton selectedComponents={selectedComponents} />
      {isSelecting && <Overlay selectionStart={selectionStart} selectionEnd={selectionEnd}/>}
    </div>
  )
}


export default Editor