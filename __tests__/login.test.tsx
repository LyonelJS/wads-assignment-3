import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

// Simple Login component to test
const LoginForm = () => {
  return (
    <form>
      <h1>Login</h1>
      <input placeholder="Email" type="email" />
      <input placeholder="Password" type="password" />
      <button type="submit">Sign In</button>
    </form>
  )
}

describe('Login Page', () => {
  it('renders login heading', () => {
    render(<LoginForm />)
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('renders email input', () => {
    render(<LoginForm />)
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })

  it('renders password input', () => {
    render(<LoginForm />)
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<LoginForm />)
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('allows typing in email field', () => {
    render(<LoginForm />)
    const emailInput = screen.getByPlaceholderText('Email')
    fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
    expect(emailInput).toHaveValue('test@email.com')
  })
})