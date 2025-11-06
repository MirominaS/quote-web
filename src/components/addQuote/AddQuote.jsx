import React, { useState } from 'react'
import './AddQuote.css'
import { Filter } from 'bad-words'
import { IoClose } from 'react-icons/io5';

const AddQuote = ({showAddQuotePopup,closeAddQuotePopup,isAdd}) => {
    const [quote, setQuote] = useState("");
    const [tags, setTags] = useState([]);
    const [author, setAuthor] = useState("");
    const [filterText, setFiltertext] = useState({})

    const filter = new Filter();
    const addValidation = () => {
        let textFilter = {quote:"",tags:"",author:""};
        let valid = true;
        if(!quote.trim()){
            textFilter.quote = "Quote is required!"
            setQuote("")
            valid= false;
        }else if(filter.isProfane(quote)){
            textFilter.quote = "Inappropreate language detected!"
            const cleanQuote = filter.clean(quote)
            setQuote(cleanQuote)
            valid = false;
        }
        if(tags && tags.length>0){
            const cleanTags = tags.map(tag=>{
                if(filter.isProfane(tag)){
                    textFilter.tags = "Inappropreate language detected!"
                    valid = false;
                }                
                return filter.clean(tag)
            })
            setTags(cleanTags)         
        }
        if(!author.trim()){
            textFilter.author = "Author is required!"
            setAuthor("")
            valid= false;
        }else if(filter.isProfane(author)){
            textFilter.author = "Inappropreate language detected!"
            const cleanAuthor = filter.clean(author)
            setAuthor(cleanAuthor)
            valid = false;
        }
        setFiltertext(textFilter)
        console.log("Valid",valid)
        return valid;
    }

    const handleAddValidation = () => {
        const validate = addValidation()
        let isSuccess = true;
        if(validate){
            isSuccess=true
            setQuote("")
            setTags([])
            setAuthor("")
        }else{
            addValidation()
            isSuccess=false
        }
        console.log("IsSuccess",isSuccess)
        return isSuccess;
    }

    const addSuccess = () => {
        const success = handleAddValidation()
        if(success){
            console.log("Success")
            isAdd();
        }else{
            console.log("fail")
        }
    }

    if(!showAddQuotePopup) return null;

  return (
    <div className='addquote-container'>
        <div className='addquote-close-btn'  onClick={()=>{closeAddQuotePopup(); setQuote("");setTags([]),setAuthor("");setFiltertext({})}}><IoClose /></div>
        <div className='addquote-title'> Add a Quote </div>
        <div className='addquote-quote'>
           <textarea 
                name="quote" 
                id="" 
                placeholder='Quote..' 
                className='quote-txt' 
                value={quote} 
                onChange = {(q) => setQuote(q.target.value)}
            ></textarea>
            {filterText.quote && <span className='warn-message'>{filterText.quote}</span>}
        </div>
        <div className='addquote-tags'>
           <textarea name="tags" 
                id="" 
                placeholder='Tags..' 
                className='tags-txt' 
                value={tags.join("\n")} 
                onChange = {(t) => {
                    const tagList = t.target.value.split("\n").map(tag => tag.trim())
                    setTags(tagList);                    
                }}>
            </textarea>
            {filterText.tags && <span className='warn-message'>{filterText.tags}</span>}
        </div>
        <div className='addquote-author'>
            <textarea name="author" 
                id="" 
                placeholder='Author..' 
                className='author-txt' 
                value={author} 
                onChange = {(a) => setAuthor(a.target.value)}>
            </textarea>
            {filterText.author && <span className='warn-message'>{filterText.author}</span>}
        </div>
        <div className='addquote-button'>
            <div className='addquote-cancel-btn'>
                <button onClick={()=>{closeAddQuotePopup(); setQuote("");setTags([]),setAuthor(""); setFiltertext({})}}>Cancel</button>
            </div>
            <div className='addquote-add-btn'>
                <button onClick={addSuccess}>Add</button>
            </div>
        </div>
        
    </div>
  )
}

export default AddQuote