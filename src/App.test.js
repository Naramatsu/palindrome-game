import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

jest.spyOn(global, 'setTimeout');

describe('App component', () => {
  beforeEach(() => {
    render(<App />);
    act(() => {
      jest.useFakeTimers();
    })
  })

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers()
      jest.clearAllTimers()
    })
  })

  it('Should show a title', () => {
    const appTitle = screen.getByText(/Palindrome's Game/i);
    expect(appTitle).toBeInTheDocument();
  });

  describe('Start button', () => {
    let startButton = null;
    beforeEach(() => {
      startButton = screen.getByText(/start/i);
    })

    it('Should show a start button', () => {
      expect(startButton).toBeInTheDocument();
    });

    it('Should click start button', () => {
      fireEvent.click(startButton)
      expect(startButton).not.toBeInTheDocument();
      const timer = screen.getByText('30')
      expect(timer).toBeInTheDocument();
    });
  })

  describe('Validate button', () => {
    let validateButton = null;
    let startButton = null;
    let textBox = null;

    beforeEach(() => {
      startButton = screen.getByText(/start/i);
      fireEvent.click(startButton)
      validateButton = screen.getByText(/Validate/i);
      textBox = screen.getByPlaceholderText(/Type here palindromes/i)
    })

    it('Should show a validate button and input', () => {
      expect(validateButton).toBeInTheDocument();
      expect(textBox).toBeInTheDocument();
    });

    it('Should validate when it is not a palindrome', () => {
      fireEvent.change(textBox, { target: { value: '23' } })
      fireEvent.click(validateButton)
      const msjAlert = screen.getByText(/This is not a palindrome, Please try again...!/i)
      expect(msjAlert).toBeInTheDocument()
    });

    it('Should validate when it is a palindrome without spacing', () => {
      fireEvent.change(textBox, { target: { value: 'asdsa' } })
      fireEvent.click(validateButton)
      const palindromeInserted = screen.getByText(/asdsa/)
      expect(palindromeInserted).toBeInTheDocument()
    });

    it('Should validate when it is a palindrome with spacing', () => {
      fireEvent.change(textBox, { target: { value: 'asd dsa' } })
      fireEvent.click(validateButton)
      const msjAlert = screen.getByText(/asd dsa/)
      expect(msjAlert).toBeInTheDocument()
    });

    it('Should click validate button when the palindrome exists', () => {
      fireEvent.change(textBox, { target: { value: 'asd dsa' } })
      fireEvent.click(validateButton)
      fireEvent.change(textBox, { target: { value: 'asd dsa' } })
      fireEvent.click(validateButton)
      const msjAlert = screen.queryByText(/This palindrome is already commited/)
      expect(msjAlert).toBeInTheDocument()
    });

    it('Should validate when the input is empty', () => {
      fireEvent.change(textBox, { target: { value: '' } })
      fireEvent.click(validateButton)
      const msjAlert = screen.queryByText(/This is not a palindrome, Please try again...!/i)
      expect(msjAlert).not.toBeInTheDocument()
    });
  })
})
