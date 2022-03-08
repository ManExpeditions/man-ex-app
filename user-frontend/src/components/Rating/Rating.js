import styles from './Rating.module.css';

export default function Rating({ rating }) {
  console.log(rating);
  return (
    <div className={styles.rating}>
      <span>
        <i className={rating >= 1 ? 'fa fa-star' : 'far fa-star outline'}></i>
      </span>
      <span>
        <i className={rating >= 2 ? 'fa fa-star' : 'far fa-star outline'}></i>
      </span>
      <span>
        <i className={rating >= 3 ? 'fa fa-star' : 'far fa-star outline'}></i>
      </span>
      <span>
        <i className={rating >= 4 ? 'fa fa-star' : 'far fa-star outline'}></i>
      </span>
      <span>
        <i className={rating >= 5 ? 'fa fa-star' : 'far fa-star outline'}></i>
      </span>
    </div>
  );
}
