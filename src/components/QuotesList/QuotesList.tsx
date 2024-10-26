import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchQuotes, deleteQuote } from '../../axiosAPI';
import { Quote } from '../../type.ts';

const QuotesList: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const getQuotes = async () => {
      const quotesData = await fetchQuotes(category);
      const quotesArray: Quote[] = quotesData
        ? Object.keys(quotesData).map(key => ({ id: key, ...quotesData[key] }))
        : [];
      setQuotes(quotesArray);
    };

    getQuotes();
  }, [category]);

  const handleDelete = async (id: string) => {
    await deleteQuote(id);
    setQuotes(quotes.filter(quote => quote.id !== id));
  };

  return (
    <div>
      <h2>Quotes {category ? `in the category "${category}"` : ''}</h2>
      <ul className="list-group">
        {quotes.map(quote => (
          <li key={quote.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{quote.author}</strong>: {quote.text}
            </div>
            <div>
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
