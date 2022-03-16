import React from 'react';
import { render } from 'react-testing-library';

import Header from '.';

describe('<Header />', () => {
  it('should render an <header> tag', () => {
    const { container } = render(<Header />);
    expect(container.firstChild.tagName).toEqual('HEADER');
  });

  it('should have a class attribute', () => {
    const { container } = render(<Header />);
    expect(container.firstChild.hasAttribute('class')).toBe(true);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const { container } = render(<Header id={id} />);
    expect(container.firstChild.id).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const { container } = render(<Header attribute="test" />);
    expect(container.firstChild.hasAttribute('attribute')).toBe(false);
  });
});
