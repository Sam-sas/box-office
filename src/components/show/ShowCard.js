import React from 'react';
import { Link } from 'react-router-dom';
import Starred from '../../pages/Starred';
import { Star } from '../Styled';
import { StyledShowCard } from './ShowCard.styled';
export default function ShowCard({ id, image, name, summary, onStarClick, isStarred }) {
  //creates an array of words, then only uses the first ten words in array for text, then pushes it back as text
  const summaryAsText = summary
    ? `${summary.split(' ').slice(0, 10).join(' ').replace(/<.+?>/g, "")}...`
    : 'No description';

  return (
    <StyledShowCard>
      <div className='img-wrapper'>
        <img src={image} alt="show" />
      </div>

      <h1>{name}</h1>

      <p>{summaryAsText}</p>

      <div className='btns'>
        <Link to={`/show/${id}`}>Read more</Link>
        <button type="button" onClick={onStarClick}><Star active={isStarred} /></button>
      </div>
    </StyledShowCard>
  );
}
