import { shallow, configure } from "enzyme";
import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import user from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import Signup from "../signup";
import Chance from "chance";

configure({ adapter: new Adapter() });

const chance = new Chance();
// it("page number changes after each click", () => {
//   const page = shallow(<Pagination setPage={1} pageNumber={5} />
//   );

//   expect(page.text()).toEqual('');
//   page.find('setPage').simulate('change');
// });
describe("Signup Form", () => {
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
        <Signup onSubmit={onSubmit} />
      </Router>
    );
  });

  it("onSubmit is called when fields are validated 1", () => {
    user.type(getFirstName(), "John");
    user.type(getLastName(), "Doe");
    user.type(getEmail(), chance.email());
    user.type(getPassword(), "123123");
    user.type(getConfirmedPassword(), "123123");
    user.click(screen.getByRole("button", { name: /register/i }));
  });
});

function getFirstName() {
  return screen.getByTestId("first-name", {
    name: /enter first name/i,
  });
}

function getLastName() {
  return screen.getByTestId("last-name", {
    name: /enter last name/i,
  });
}
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
function getConfirmedPassword() {
  return screen.getByTestId("confirm-password", {
    name: /confirm password/i,
  });
}
