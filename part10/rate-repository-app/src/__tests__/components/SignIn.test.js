import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
// MockedProvider nos permite simular Apollo Client en pruebas
import { MockedProvider } from "@apollo/client/testing";
// NativeRouter se usa para manejar rutas en React Native durante pruebas
import { NativeRouter } from "react-router-native";
import SignIn from "../../../components/SignIn";

// Mock de useSignIn
// `jest.fn()` crea una función simulada
// `mockResolvedValue({ username: "kalle" })` hace que la función devuelva un objeto con un usuario
const mockSignIn = jest.fn().mockResolvedValue({ username: "kalle" });

// Sobrescribimos la implementación del hook useSignIn
jest.mock('../../hooks/useSignIn', () => {
  return () => [mockSignIn, { loading: false, error: null }];
});

describe("SignIn", () => {
  it("logs in successfully with username and password", async () => {
    // Renderizamos el componente envuelto en MockedProvider y NativeRouter
    const { getByTestId } = render(
      <MockedProvider>
        <NativeRouter>
          <SignIn />
        </NativeRouter>
      </MockedProvider>
    );

    // Simulamos que el usuario escribe en los campos de texto
    fireEvent.changeText(getByTestId("usernameField"), "kalle");
    fireEvent.changeText(getByTestId("passwordField"), "password");

    // Simulamos que el usuario presiona el botón de enviar
    await act(async () => {
      fireEvent.press(getByTestId("submitButton"));
    });

    // Esperamos a que se llame la función mockSignIn y verificamos sus argumentos
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledTimes(1); // Se llama una sola vez
      expect(mockSignIn).toHaveBeenCalledWith({ username: "kalle", password: "password" }); // Se llama con los datos correctos
    });
  });
});
