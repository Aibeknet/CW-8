import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { title: 'Star Wars', id: 'star-wars' },
  { title: 'Famous people', id: 'famous-people' },
  { title: 'Saying', id: 'saying' },
  { title: 'Humor', id: 'humour' },
  { title: 'Motivational', id: 'motivational' }
];

const Sidebar: React.FC = () => {
  return (
    <div className="list-group">
      <Link to="/" className="list-group-item list-group-item-action">
        ALl Quotes
      </Link>
      {categories.map(category => (
        <Link
          key={category.id}
          to={`/quotes/${category.id}`}
          className="list-group-item list-group-item-action"
        >
          {category.title}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
