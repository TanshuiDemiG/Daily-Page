import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import i18n from '../locales/i18n'
import { useSiteStore } from '../store/useSiteStore'
import HomePage from './HomePage'

vi.mock('../components/three/TimeCanvasBackground', () => ({
  default: () => <div data-testid="time-canvas-background" />,
}))

describe('HomePage', () => {
  beforeEach(async () => {
    useSiteStore.setState({
      language: 'zh',
      progressValue: 47,
      sceneQuality: 'high',
    })
    window.localStorage.clear()
    await i18n.changeLanguage('zh')
  })

  it('renders the main brand and progress state', () => {
    render(<HomePage />)

    expect(screen.getByRole('heading', { name: '山海行' })).toBeInTheDocument()
    expect(screen.getByText('TERRAFLUX')).toBeInTheDocument()
    expect(screen.getByText(/47%/)).toBeInTheDocument()
    expect(screen.getByTestId('time-canvas-background')).toBeInTheDocument()
  })

  it('switches language without refresh', async () => {
    const user = userEvent.setup()
    render(<HomePage />)

    await user.click(screen.getByRole('button', { name: 'English' }))

    expect(await screen.findByText('Documenting AI, Growth and Exploration Between Terrain and Flow.')).toBeInTheDocument()
    expect(useSiteStore.getState().language).toBe('en')
  })
})
