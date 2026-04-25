import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CAT_GRADIENTS = [
  'linear-gradient(160deg, #0f1923 0%, #1a3a2a 100%)',
  'linear-gradient(160deg, #1a0f0f 0%, #3a1a0a 100%)',
  'linear-gradient(160deg, #0a0f1a 0%, #1a2a3a 100%)',
  'linear-gradient(160deg, #1a1a0a 0%, #3a3a1a 100%)',
  'linear-gradient(160deg, #0f0a1a 0%, #2a1a3a 100%)',
  'linear-gradient(160deg, #0a1a1a 0%, #1a3a3a 100%)',
  'linear-gradient(160deg, #1a0f1a 0%, #3a1a3a 100%)',
  'linear-gradient(160deg, #0a0a0a 0%, #2a2a2a 100%)',
];

const CategoryCard = ({ category, index = 0 }) => {
  const gradient = CAT_GRADIENTS[index % CAT_GRADIENTS.length];

  return (
    <Link
      to={`/${category.gender === 'all' ? 'men' : category.gender}?category=${category.slug}`}
      className="category-card"
    >
      <div className="cat-img" style={category.imageUrl ? {} : { background: gradient }}>
        {category.imageUrl && (
          <img src={category.imageUrl} alt={category.name} className="cat-bg-img" />
        )}
        <div className="cat-label">
          <span>{category.name}</span>
        </div>
        <div className="cat-hover-overlay" />
      </div>
    </Link>
  );
};

export default CategoryCard;
