import { shallow, configure } from "enzyme";
import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import CreateLease from "../Lease/createLease";
import user from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("Create Lease", () => {
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
        <CreateLease onSubmit={onSubmit} />
      </Router>
    );
  });

  it("onSubmit is called when fields are validated 1", () => {
    user.type(getTitle(), "The Ridge");
    user.type(getAddress(), "3761 SW 22nd Rd, Gainesville, FL 32607");
    user.type(getDescription(), "Near Publix");
    user.type(getPrice(), "700");
    user.type(getTerm(), "15");
    user.type(getBedroom(), "2");
    user.type(getBathroom(), "2");
    user.click(screen.getByRole("button", { name: /submit/i }));
  });

  it("onSubmit is called when fields are validated 2", () => {
    user.type(getTitle(), "Deco '39 Luxury Apartments");
    user.type(getAddress(), "320 SW 10th St, Gainesville, FL 32601");
    user.type(getDescription(), "Near University Campus");
    user.type(getPrice(), "800.00");
    user.type(getTerm(), "15");
    user.type(getBedroom(), "3");
    user.type(getBathroom(), "2");
    user.click(screen.getByRole("button", { name: /submit/i }));
  });
});
function getTitle() {
  return screen.getByTestId("title", {
    name: /title/i,
  });
}

function getAddress() {
  return screen.getByTestId("address", {
    name: /address/i,
  });
}

function getDescription() {
  return screen.getByTestId("description", {
    name: /description/i,
  });
}

function getPrice() {
  return screen.getByTestId("price", {
    name: /price/i,
  });
}

function getTerm() {
  return screen.getByTestId("term", {
    name: /term/i,
  });
}

function getBedroom() {
  return screen.getByTestId("bedrooms", {
    name: /bedrooms/i,
  });
}

function getBathroom() {
  return screen.getByTestId("bathrooms", {
    name: /bathrooms/i,
  });
}
