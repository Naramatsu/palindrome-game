import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Timer from './Timer';

jest.mock('../App')

describe('Timer Component', () => {
  const props = {
    isPlaying: true, endGame: jest.fn()
  }

  beforeEach(() => {
    jest.useFakeTimers();
    render(<Timer {...props} />);
  })

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers()
      jest.clearAllTimers()
    })
  })

  it('Should show 30 seconds in screen', () => {
    const timer = screen.getByText(30)
    expect(timer).toBeInTheDocument()
  })
})

describe('Should not play the game', () => {
  it('Should receive isPlaying prop as false', () => {
    render(<Timer isPlaying={false} />)
    const timer = screen.getByText(30)
    expect(timer).toBeInTheDocument()
  })
})
