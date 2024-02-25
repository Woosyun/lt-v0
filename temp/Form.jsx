"use client"
import Markdown from 'react-markdown'
import MarkdownEditor from './MarkdownEditor'

const Form = ({
  type,
  doc,
  setDoc,
  submitting,
  handleSubmit,
  handleInputEnter,
  handleChangeContent
}) => {
  
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          className='doc-title'
          value={doc.title}
          placeholder="Title"
          required
          onChange={(e)=>setDoc({ ...doc, title: e.target.value })}
        />

        <MarkdownEditor
          doc={doc}
          setDoc={setDoc}
          handleInputEnter={handleInputEnter}
          handleChangeContent={handleChangeContent}
        />
      </form>

      <Markdown>{doc.title}</Markdown>
      {doc.content.map((l, idx) => (
        <Markdown key={idx}>{l}</Markdown>
      ))}
    </section>
  )
}



export default Form