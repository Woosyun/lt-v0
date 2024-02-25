import Link from "next/link";

const Block = ({
  block,
  idx,
  blockHandleInput,
  blockHandleKeyDown,
  blockHandleClick,
  adjustHeight,
}) => {
  // console.log('(Block) block.content : ', block.content);
  if (block.type === 'markdown') {
    return (
      <textarea
        id={idx}
        className="block block-markdown"
        value={block.content}
        placeholder={`${block.type}`}
        // readOnly={focus===idx ? false : true}
        onInput={(e) => {
          blockHandleInput(e, idx);
          adjustHeight(idx);
        }}
        onKeyDown={(e) => blockHandleKeyDown(e, idx)}
        onClick={(e)=>blockHandleClick(e, idx)}
      >
      </textarea>
    )
  } else if (block.type === 'docId') {
    return (
      // <div>
      //  <Link href={`/edit-doc/${block.content}`}>{block.content}</Link>
      // </div>

      <textarea
        id={idx}
        className="block"
        placeholder={block.content}
        readOnly={true}
      >
      </textarea>
    )
  }

}

const TitleBlock = ({
  title,
  titleHandleInput
}) => {
  return (
    <textarea
      id="-1"
      className="block block-title"
      contentEditable
      value={title}
      placeholder="TITLE"
      onInput={(e) => titleHandleInput(e.target.value)}
    ></textarea>
  )
}

export {Block, TitleBlock}