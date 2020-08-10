import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./button";

const ButtonDefault: ButtonProps = {
  onClick: jest.fn(),
  className: "xdf-uibutton",
};
const ButtonTypeAndSize: ButtonProps = {
  btnType: "primary",
  size: "lg",
};

const ButtonDisabled: ButtonProps = {
  onClick: jest.fn(),
  disabled: true,
};

const ButtonLink: ButtonProps = {
  btnType: "link",
  href: "http://core.xdf.cn/",
};

const renderButton = (props: ButtonProps, children: string) => (
  <Button {...props}>{children}</Button>
);

describe("测试我们的button组件", () => {
  it("测试默认组件", () => {
    let wrapper = render(renderButton(ButtonDefault, "default"));
    let element = wrapper.getByText("default") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn btn-default xdf-uibutton");
    expect(element).not.toHaveClass("btn-primary");
    expect(element).not.toHaveClass("btn-lg");
    expect(element.tagName).toEqual("BUTTON");
    expect(element.disabled).toBeFalsy();
    fireEvent.click(element);
    expect(ButtonDefault.onClick).toBeCalled();
  });
  it("测试button类型和大小组件", () => {
    let wrapper = render(renderButton(ButtonTypeAndSize, "typesize"));
    let element = wrapper.getByText("typesize") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn btn-primary btn-lg");
    expect(element).not.toHaveClass("btn-default");
    expect(element).not.toHaveClass("btn-sm");
  });
  it("测试button 禁用状态", () => {
    let wrapper = render(renderButton(ButtonDisabled, "disabled"));
    let element = wrapper.getByText("disabled") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(ButtonDisabled.onClick).not.toBeCalled();
  });
  it("测试button link类型", () => {
    let wrapper = render(renderButton(ButtonLink, "link"));
    let element = wrapper.getByText("link") as HTMLAnchorElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element.href).toEqual("http://core.xdf.cn/");
  });
});
