const MarkdownEditor = ({
    doc,
    setDoc,
    handleInputEnter,
    handleChangeContent
  }) => {
    return (
      <>
        {doc.content.map((l, idx) => (
          <span key={idx}>
            <input
              className="markdown-editor-line"
              id={idx}
              name='text'
              type='text'
              placeholder='type text'
              value={l}
              onChange={(e) => handleChangeContent(e, idx)}
              onKeyDown={(e) => handleInputEnter(e, idx+1, "")}
            />
          </span>
        ))}
      </>
    )
}

export default MarkdownEditor;