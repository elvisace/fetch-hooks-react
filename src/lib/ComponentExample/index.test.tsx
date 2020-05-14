import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom"
import ComponentExample from ".";

describe('ComponentExample', () => {
  test('should label be in document', () => {
    const { container, getByText } = render(<ComponentExample text='Hello' />);
    const label = getByText('Hello');
    expect(label).toBeInTheDocument();

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        style="color: red;"
      >
        Hello
      </div>
    `)
  });
});