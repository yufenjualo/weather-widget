import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./App";

// test("renders learn react link", () => {
//   const { getByText } = render(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
//   expect(getByText(/learn/i)).toBeInTheDocument();
// });

it("checkCardRender", () => {
  const { queryByTitle } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const searchBar = queryByTitle("testSearchBar");
  expect(searchBar).toBeTruthy();
});

describe("checkSearchInputValue", () => {
  it("onChange", () => {
    const { queryByTitle } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const input = queryByTitle("testSearchBar");
    fireEvent.change(input, { target: { value: "hanoi" } });
    expect(input.value).toBe("hanoi");
  });
});
