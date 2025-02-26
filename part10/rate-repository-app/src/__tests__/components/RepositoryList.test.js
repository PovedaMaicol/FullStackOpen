import React from 'react';
import { render, screen } from '@testing-library/react-native'
import { RepositoryListContainer } from "../../../components/RepositoryList";


describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {
        const repositories = {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        };
  
        // Add your test code here
        const { getByText, getAllByText } = render(<RepositoryListContainer repositories={repositories} />)
        // -- IMPORTANTE --
        // screen.debug({ message: 'no es necesario el mensaje, deberias ver el arbol del render'});

          // Verifica que el nombre del repositorio esté presente
      expect(getByText('jaredpalmer/formik')).toBeTruthy();
      expect(getByText('async-library/react-async')).toBeTruthy();

      // Verifica que la descripción esté presente
      expect(getByText('Build forms in React, without the tears')).toBeTruthy();
      expect(getByText('Flexible promise-based React data loader')).toBeTruthy();

      // Verifica que el lenguaje esté presente
      expect(getByText('TypeScript')).toBeTruthy();
      expect(getByText('JavaScript')).toBeTruthy();

      // Verifica que el recuento de bifurcaciones esté presente
      expect(getByText('1619')).toBeTruthy(); // 1619 bifurcaciones
      //Verifica Forks
      expect(getByText('69')).toBeTruthy();

      // Verifica que el recuento de observadores de estrellas esté presente
      expect(getByText('21856')).toBeTruthy(); // 21856 estrellas se muestran como 21.9k
      expect(getByText('1760')).toBeTruthy(); // 1760 estrellas se muestran como 1.8k

      // Verifica que el promedio de calificación esté presente
      expect(getByText('88')).toBeTruthy();
      expect(getByText('72')).toBeTruthy();

      // Verifica que el recuento de reseñas esté presente
      expect(getAllByText('3')).toHaveLength(2);

      // *** IMPORTANTE ***
      // | getByText --> solo busca un elemento, si ahi    mas de un elemento igual, dara error
      // | getAllByText --> se usa cuando el texto puede estar mas d euna vez

      });
    });
  });