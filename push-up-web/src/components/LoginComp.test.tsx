import { shallow } from "enzyme";
import React, { ReactComponentElement } from "react";
import { LoginComp } from "./LoginComp";

describe("Login Component", () => {

    let container:any;

    beforeEach(()=> {container = shallow(<LoginComp toggleFunction={()=>{}}/>)});

    it("should render form element", () => {
        expect(container.find("form").length).toEqual(1);
    });

    it("should render email and password text", () => {
        expect(container.find("#e-label").length).toEqual(1);
        expect(container.find("#p-label").length).toEqual(1);
    });

    it("should render email and password inputs", () => {
        expect(container.find("#email").length).toEqual(1);
        expect(container.find("#pass").length).toEqual(1);
    });

    it("should render submit and exit buttons", () => {
        expect(container.find("#log-btn").length).toEqual(1);
        expect(container.find(".log-return-btn").length).toEqual(1);
    });
})