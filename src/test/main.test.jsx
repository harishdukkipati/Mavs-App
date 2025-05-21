import { describe, it, beforeEach, expect } from 'vitest';

describe('main.jsx', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('mounts to the root DOM node without crashing', async () => {
    await import('../main'); 
    
    const root = document.getElementById('root');
    expect(root).not.toBeNull();
  });
});


