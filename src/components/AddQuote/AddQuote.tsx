import React, { useState } from 'react';
import { addQuote } from '../../axiosAPI';
import { useNavigate } from 'react-router-dom';

const AddQuote: React.FC = () => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('motivational');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newQuote = { author, text, category };
    await addQuote(newQuote);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <h3 className="mb-4">Submit new quote</h3>
      <div className='mb-3'>
        <label className='form-label'>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='form-select'
        >
          <option value='star-wars'>Star Wars</option>
          <option value='famous-people'>Famous people</option>
          <option value='saying'>Saying</option>
          <option value='humour'>Humor</option>
          <option value='motivational'>Motivational</option>
        </select>
      </div>
      <div className='mb-3'>
        <label className='form-label'>Author</label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className='form-control'
          required
        />
      </div>
      <div className='mb-3'>
        <label className='form-label'>Text of the quote</label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='form-control'
          required
        />
      </div>
      <button type='submit' className='btn btn-primary'>Add the quote</button>
    </form>
  );
};

export default AddQuote;