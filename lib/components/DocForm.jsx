"use client"
import { useEffect, useState } from 'react';
import { Block, TitleBlock } from './Blocks';

const DocForm = ({
  title,
  setTitle,
  blocks,
  setBlocks,
  handleSubmit,
}) => {
  const [focus, _setFocus] = useState(-2);
  const setFocus = (newFocus) => {
    _setFocus(newFocus);
  }
  const defaultBlock = {
    type: "markdown",
    content: ""
  };
  const adjustHeight = (idx) => {
    let element = document.getElementById(idx);
    if (element instanceof HTMLElement) {
      if (element.tagName === 'TEXTAREA') {
        element.style.height = "10px";
        element.style.height = (element.scrollHeight) + "px";
      }
    }
  };
  const handleBlocksHeight = () => {
    blocks.map((_, idx) => {
      adjustHeight(idx);
    })
    adjustHeight(-1);//adjust title's height
  }
  
  const blockHandleInput = (event, idx) => {
    event.preventDefault();
    let newBlocks = [...blocks];
    newBlocks[idx].content = event.target.value;
    setBlocks(newBlocks);
  }
  const blockHandleKeyDown = (event, idx) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      let newBlocks = [...blocks];
      newBlocks.splice(idx + 1, 0, defaultBlock);
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
  const blockHandleClick = (event, idx) => {
    //for debug
    // const temp = document.getElementById(idx);
    // const rect = temp.getBoundingClientRect();
    // console.log("(DocForm) top: ", rect.top);
    // console.log("(DocForm) bottom: ", rect.bottom);
    
    // console.log(`(DocForm) ${idx}th element clicked!!`);
  }

  useEffect(() => {
    const block = document.getElementById(focus);
    if (block instanceof HTMLElement) {
      // console.log('(edit-doc) type of block : ', block.tagName);
      if (block.tagName === 'TEXTAREA') {
        block.focus();
        block.selectionStart = block.value.length;
        block.selectionEnd = block.value.length;
      }
    }
  }, [focus]);

  useEffect(() => {
    handleBlocksHeight();
    window.addEventListener('resize', handleBlocksHeight);

    return () => { window.removeEventListener('resize', handleBlocksHeight); };
  }, [blocks]);

  return (
    <div className="doc-form" id="doc-form">
      <button onClick={handleSubmit}>store</button>

      <TitleBlock
        title={title}
        titleHandleInput={setTitle}
      />

      {blocks.map((block, idx) => (
        <Block
          focus={focus}
          key={idx}
          block={block}
          idx={idx}
          blockHandleInput={blockHandleInput}
          blockHandleKeyDown={blockHandleKeyDown}
          blockHandleClick={blockHandleClick}
          adjustHeight={adjustHeight}
        />
      ))}
    </div>
  )
}

export default DocForm