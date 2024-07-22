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
    await request.post('http://localhost:3003/api/users', {
      data: {
          name: 'user',
          username: 'user',
          password: 'user123'
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
      await createBlog(page, 'is this', 'juan', 'xxssda')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByText(`A new blog 'is this' by juan added`)).toBeVisible()
    })

    test('a blog can be edited', async ({ page }) => {

    await page.getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'like '}).click()

    await expect(page.getByText('1')).toBeVisible()

    })

    test('a blog can be deleted', async ({ page }) => {
      page.on('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`); // Para depuración
        await dialog.accept(); // Aceptar el diálogo
      });

      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like '}).click()
      await page.getByRole('button', { name: 'Delete'}).click()

      await page.waitForTimeout(1000)

      await expect(page.getByText('is this - juan')).not.toBeVisible({ timeout: 10000 });
    })

    test('dont can delete a blog other user', async ({ page }) => {
      await page.getByRole('button', { name: 'Logout'}).click()
      await loginWith(page, 'user', 'user123')
      await page.getByRole('button', { name: 'view' }).click()

      await expect(page.getByRole('Delete')).not.toBeVisible()
    })

  
  })


})