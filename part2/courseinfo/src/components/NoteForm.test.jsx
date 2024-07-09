import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'
import jest from 'jest-mock' 

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const createNote = jest.fn()

    render(<NoteForm createNote={createNote} />)

  //Las pruebas tienen acceso al campo de input utilizando la función getByRole.

  const input = screen.getByRole('textbox')
  const sendButton = screen.getByText('save')
  //El método type de userEvent se utiliza para escribir texto en el campo de input.
  await user.type(input, 'testing a form...')
  await user.click(sendButton)


  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})