import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuote, updateQuote } from '../../axiosAPI';

const EditQuote: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState({ author: '', text: '', category: 'motivational' });

  useEffect(() => {
    const fetchQuote = async () => {
      const fetchedQuote = await getQuote(id!);
      setQuote(fetchedQuote);
    };

    fetchQuote();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateQuote(id!, quote);
    navigate(`/quotes/${quote.category}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label">Author</label>
        <input
          value={quote.author}
          onChange={(e) => setQuote({ ...quote, author: e.target.value })}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Text of the quote</label>
        <input
          value={quote.text}
          onChange={(e) => setQuote({ ...quote, text: e.target.value })}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          value={quote.category}
          onChange={(e) => setQuote({ ...quote, category: e.target.value })}
          className="form-select"
        >
          <option value="star-wars">Star Wars</option>
          <option value="famous-people">Famous people</option>
          <option value="saying">Saying</option>
          <option value="humour">Humour</option>
          <option value="motivational">Motivational</option>
        </select>
      </div>
      <button type="submit" className="btn btn-success">Save changes</button>
    </form>
  );
};

export default EditQuote;
