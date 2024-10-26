import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchQuotes, deleteQuote } from '../../axiosAPI';
import { Quote } from '../../type.ts';

const QuotesList: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getQuotes = async () => {
      setLoading(true);
      const quotesData = await fetchQuotes(category);
      const quotesArray: Quote[] = quotesData
        ? Object.keys(quotesData).map(key => ({ id: key, ...quotesData[key] }))
        : [];
      setQuotes(quotesArray);
      setLoading(false);
    };

    getQuotes();
  }, [category]);

  const handleDelete = async (id: string) => {
    await deleteQuote(id);
    setQuotes(quotes.filter(quote => quote.id !== id));
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Quotes {category ? `in the category "${category}"` : ''}</h2>
      <ul className="list-group">
        {quotes.map(quote => (
          <li key={quote.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{quote.author}</strong>: {quote.text}
            </div>
            <div className="btn-group" role="group">
              <Link to={`/edit-quote/${quote.id}`} className="btn btn-secondary btn-sm me-2">Edit</Link>
              <button
                onClick={() => handleDelete(quote.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuotesList;
