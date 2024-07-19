const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
        data: {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
    })
    await page.goto('http://localhost:5173')
    // await request.post('/api/users')

  })

  test('Login form is shown', async ({ page }) => {
    const username = await page.getByText('username')
    const password = await page.getByText('password')
    const button = await page.getByRole('button', { name: 'login' })
    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
    await expect(button).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('salainen')

        await page.getByRole('button', { name: 'login' }).click() 

        await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()

        
      })
    test('fails with wrong credentials', async ({ page }) => {
        await page.getByTestId('username').fill('andres')
        await page.getByTestId('password').fill('andres')

        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByText('Wrong credentials')).toBeVisible()
      })
  })                     
  
  
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })
  
    test('a new blog can be created', async ({ page }) => {
    //   await page.getByRole('button', { name: 'Add blog'}).click()
    //   await page.getByTestId('title').fill('is this')
    //   await page.getByTestId('author').fill('juan')
    //   await page.getByTestId('url').fill('zzzzzzwwww')
    //   await page.getByRole('button', { name: 'Add'}).click()

    await createBlog(page, 'is this', 'juan', 'xxssda')

      await expect(page.getByText(`A new blog 'is this' by juan added`)).toBeVisible()
    })
  })


})