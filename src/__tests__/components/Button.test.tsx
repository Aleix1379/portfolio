import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/Button';

describe('Button Component', () => {
  it('renders the button with the correct text', () => {
    render(<Button onClick={() => {}}>Click Me</Button>);
    
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
  });
  
  it('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    const buttonElement = screen.getByText('Click Me');
    fireEvent.click(buttonElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('applies the provided className', () => {
    const customClass = 'custom-class';
    render(
      <Button onClick={() => {}} className={customClass}>
        Click Me
      </Button>
    );
    
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toHaveClass(customClass);
  });
});