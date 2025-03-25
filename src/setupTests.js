// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';
import { act } from 'react-dom/test-utils';

expect.extend(toHaveNoViolations);

jest.spyOn(console, 'error').mockImplementation((message) => {
    if (!message.includes('inside a test was not wrapped in act')) {
      console.error(message);
    }
  });