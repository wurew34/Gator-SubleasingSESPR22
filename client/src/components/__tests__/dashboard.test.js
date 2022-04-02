import { shallow, configure } from "enzyme";
import { fireEvent, getByRole, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Dashboard from "../dashboard";
import user from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { eventWrapper } from "@testing-library/user-event/dist/utils";

configure({ adapter: new Adapter() });

describe("Dashboard", () => {
  const mockedUsedNavigate = jest.fn();

  const mockedOptions = [
    {
      label: "Price: Low to High",
      value: 1,
    },
    {
      value: 2,
      label: "Price: High to Low",
    },
    {
      value: 3,
      label: "Alphabetical: A-Z",
    },
    {
      value: 4,
      label: "Latest",
    },
    {
      value: 5,
      label: "Term Length: Low to High",
    },
    {
      value: 6,
      label: "Term Length: High to Low",
    },
  ];

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUsedNavigate,
  }));
  const onChange = jest.fn();
  const onClick = jest.fn();
  beforeEach(() => {
    render(
      <Router>
        <Dashboard
          options={mockedOptions}
          onChange={onChange}
          onClick={onClick}
        />
      </Router>
    );
  });

  //   it("navigate to create listings page after button press", () => {
  //     user.click(screen.getByRole("button", { name: /create listing/i }));
  //     expect(mockedUsedNavigate).toHaveBeenCalledWith("/create-listing");
  //   });

  it("page number changes after each click", () => {
    user.click(screen.getByRole("button", { name: /page 2/i }));
    user.click(screen.getByRole("button", { name: /page 1/i }));
  });
  //unit test for sorting
  it("sort by select element contains form values", () => {
    user.click(screen.getByTestId("sort-by"));
    expect(screen.getByTestId("sort-by")).toBeInTheDocument();
    expect(screen.getByTestId("sort-by")).toHaveFormValues({ sort: "" });
  });

  it("sort by select element contains form values", () => {
    const select = screen.getByTestId("sort-by");
    expect(onChange).toHaveBeenCalledTimes(0);
    fireEvent.keyDown(select.firstChild, { key: "ArrowDown" });
    console.log(select.firstChild);
    user.click(screen.getByText("Price: Low to High"));
    // expect(onChange).toHaveBeenCalledTimes(1);
    // expect(onChange).toHaveBeenCalledWith({ label: 'Price: Low to High', value: 1 });
  });

  //unit test for search
  it("search button is clicked", () => {
    const searchbar = screen.getByRole("textbox");
    user.type(searchbar, "Hideaway");
    user.click(screen.getByRole("button", { name: /search/i }));
    // expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("logout button is clicked", () => {
    user.click(screen.getByRole("button", { name: /logout/i }));
    // expect(onClick).toHaveBeenCalledTimes(1);
  });
});
