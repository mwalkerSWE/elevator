// import { render, screen } from '@testing-library/react';
import { calculateTravelTime } from './App';

test('Visits floors in order', () => {
  const { floorsVisited, travelTime } = calculateTravelTime(12, [2, 9, 1, 32]);
  expect(floorsVisited).toEqual([12, 2, 9, 1, 32]);
  expect(travelTime).toBe(560);
});
