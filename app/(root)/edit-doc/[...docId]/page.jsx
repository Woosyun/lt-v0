"use client"
import DocForm from "@/lib/components/DocForm";
import withAuth from "@/lib/components/withAuth";
import ManageDoc from "@/lib/utils/ManageDoc";
import { useEffect, useState } from "react";

const page = ({params, session}) => {
  const docId = params.docId[0];

  /* 변수 선언 단계 */
  const [title, _setTitle] = useState("");
  const [blocks, _setBlocks] = useState([]);
  const [selectionStart, setSelectionStart] = useState({ x: 0, y: 0 });
  const [selectionEnd, setSelectionEnd] = useState({ x: 0, y: 0 });
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState([]);
  // console.log('(edit-doc) docId : ', docId);

  let doc = new ManageDoc({ docId: docId, userId: session.user.id });

  const setTitle = (newTitle) => {
    //add validation
    _setTitle(newTitle);
  }
  const setBlocks = (blocks) => {
    if (blocks.length === 0) {
      _setBlocks([defaultBlock]);
    } else {
      _setBlocks(blocks);
    }
  };
  const splitDoc = async (event) => {
    // event.preventDefault();
    // event.stopPropagation();
    console.log("splitDoc activated!!");

    const currentBlocks = [...blocks];
    
    const extractedBlocks = currentBlocks.filter((_, idx) => selectedComponents.includes(idx));
    const res = await fetch('/api/create/doc', {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify({
        userId: session.user.id,
        title: 'child of ' + title,
        blocks: extractedBlocks
      })
    });
    const { docId:newDocId } = await res.json();
    const newBlock = { type: "docId", content: newDocId };
    
    let newBlocks = currentBlocks.filter((_, idx) => !selectedComponents.includes(idx));
    newBlocks.splice(selectedComponents[0], 0, newBlock);
    setSelectedComponents([]);
    setBlocks(newBlocks);
  }
  const handleMouseDown = (event) => {
    // event.stopPropagation();
    // event.preventDefault();
    if (event.target.className === "split-doc-button") {
      console.log("Clicked on split-doc-button, handleMouseDown not activated.");
      return;
    }

    const restrictedComponent = document.getElementById("doc-form");
    if (restrictedComponent.contains(event.target)) {
      console.log("Clicked on editor, handleMouseDown not activated");
      return;
    }

    console.log("handleMouseDown activated!!");

    // const splitButton = document.getElementById("split-doc-button");
    // if (splitButton && splitButton.contains(event.target)) {
    //   return;
    // }
    
    const startX = event.clientX;
    const startY = event.clientY;

    setIsSelecting(true);
    setSelectionStart({ x: startX, y: startY });
    setSelectionEnd({ x: startX, y: startY });
    setSelectedComponents([]);
  }
  const handleMouseMove = (event) => {
    if (!isSelecting) return;
  
    const newX = event.clientX;
    const newY = event.clientY;
  
    setSelectionEnd({ x: newX, y: newY });
  };
  const handleMouseUp = () => {
    setIsSelecting(false);
    updateSelectedComponents();
    // console.log(`startX=${selectionStart.x} startY=${selectionStart.y}`);
    // console.log(`endX=${selectionEnd.x} endY=${selectionEnd.y}`);
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
  
  const fetchDoc = async () => {
    await doc.fetch();
    // check doc.ownerId === userId
    // console.log('(edit-doc) doc : ', doc.blocks);
    // const newBlocks = [...doc.blocks];
    // newBlocks.map((block) => block.selected = false);
    setBlocks(doc.blocks);
    setTitle(doc.title);
  }
  const handleSubmit = async () => {
    doc.title = title;
    doc.blocks = [...blocks];
    await doc.upload();
  }


  useEffect(() => {
    fetchDoc();
  }, []);

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
          temp.style.border = "2px solid gray";
        }
      })
    })
  }, [selectedComponents]);


  return (
    <div
      className="editor-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <DocForm
        title={title}
        setTitle={setTitle}
        blocks={blocks}
        setBlocks={setBlocks}
        handleSubmit={handleSubmit}
      />
      <button>
        add block
      </button>
      {isSelecting && (
        <div
          className="selection-overlay"
          style={{
            left: Math.min(selectionStart.x, selectionEnd.x),
            top: Math.min(selectionStart.y, selectionEnd.y),
            width: Math.abs(selectionEnd.x - selectionStart.x),
            height: Math.abs(selectionEnd.y - selectionStart.y),
          }}
        />
      )}
      {(selectedComponents.length !== 0) && (
        <button
          className="split-doc-button"
          onClick={splitDoc}
        >
          split doc
        </button>
      )}
    </div>

  )
}

export default withAuth(page)