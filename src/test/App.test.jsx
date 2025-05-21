import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import BigBoard from '../components/BigBoard';
import App from '../App'; 
import * as ReactDOM from 'react-dom/client';

describe('BigBoard Component', () => {
  it('renders the main title and player cards', async () => {
    render(<BigBoard />);

    // Check title is present
    expect(screen.getByText(/NBA Draft Hub/i)).toBeInTheDocument();

    const cards = await screen.findAllByRole('img');
    expect(cards.length).toBeGreaterThan(0);

    const scoutLabels = screen.getAllByText(/Scout Ranks/i);
    expect(scoutLabels.length).toBeGreaterThan(0);
  });
});

describe('App Routing', () => {
  it('renders BigBoard when route is /BigBoard', () => {
    render(
      <MemoryRouter initialEntries={['/BigBoard']}>
        <App />
      </MemoryRouter>
    );

    // Look for title inside BigBoard
    expect(screen.getByText(/NBA Draft Hub/i)).toBeInTheDocument();
  });
});





