import { shallow, configure } from "enzyme";
import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Login from "../login";
import Pagination from "../pagination";
import user from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

configure({ adapter: new Adapter() });

// it("page number changes after each click", () => {
//   const page = shallow(<Pagination setPage={1} pageNumber={5} />
//   );

//   expect(page.text()).toEqual('');
//   page.find('setPage').simulate('change');
// });
describe("Login Form", () => {
  const mockedUsedNavigate = jest.fn();

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUsedNavigate,
  }));

  const onSubmit = jest.fn();
  beforeEach(() => {
    onSubmit.mockClear();
    render(
      <Router>
        <Login onSubmit={onSubmit} />
      </Router>
    );
  });

  it("onSubmit is called when fields are validated 1", () => {
    user.type(getEmail(), "test@testtest.com");
    user.type(getPassword(), "123123");
    user.click(screen.getByRole("button", { name: /sign in/i }));
  });

  it("onSubmit is called when fields are validated 2", () => {
    user.type(getEmail(), "test@test.com");
    user.type(getPassword(), "123123");
    user.click(screen.getByRole("button", { name: /sign in/i }));
  });
});
function getEmail() {
  return screen.getByTestId("email", {
    name: /e\-mail address/i,
  });
}

function getPassword() {
  return screen.getByTestId("password", {
    name: /password/i,
  });
}
