import React from "react";
import { expect } from "chai";
import { shallow, mount, render } from "enzyme";
import WobblySpinner from "../src/WobblySpinner";
import sinon from "sinon";

var getStyleSheetCount = () => {
    return global.document.querySelector("head").querySelectorAll("style").length;
};

describe("One WobblySpinner", function() {
    describe("when mounted", function() {
        it("componentWillMount should be called once", () => {
            sinon.spy(WobblySpinner.prototype, "componentWillMount");
            var wrapper = mount(<WobblySpinner />);
            expect(WobblySpinner.prototype.componentWillMount.callCount).to.equal(1);
            wrapper.unmount();
            WobblySpinner.prototype.componentWillMount.restore();
        });
        it("render the correct HTML", () => {
            var wrapper = mount(<WobblySpinner />);
            expect(wrapper.html()).to.equal(`<div class="${wrapper.instance().className}"></div>`);
            wrapper.unmount();
        });
        it("attaches 2 <style> elements into the DOM head (keyframes and 1 spinner sheet)", () => {
            var wrapper = mount(<WobblySpinner />);
            expect(getStyleSheetCount()).to.equal(2);
            wrapper.unmount();
        });
    });
    describe("when re-mounted", function() {
        it("attaches 2 <style> elements into the DOM head", () => {
            var wrapper = mount(<WobblySpinner />);
            expect(getStyleSheetCount()).to.equal(2);
            wrapper.unmount();
        });
    });
    describe("when unmounted", function() {
        it("detaches the prior 2 <style> elements from the DOM head", () => {
            var wrapper = mount(<WobblySpinner />);
            expect(getStyleSheetCount()).to.equal(2);
            wrapper.unmount();
            expect(getStyleSheetCount()).to.equal(0);
        });
    });
});

describe("When we mount two like WobblySpinners", function() {
    beforeEach(() => {
        sinon.spy(WobblySpinner.prototype, "componentWillMount");
        this.wrapper = mount(<div><WobblySpinner /><WobblySpinner /></div>);
    })
    afterEach(() => {
        this.wrapper.unmount();
        WobblySpinner.prototype.componentWillMount.restore();
    })
    it("componentWillMount should be called twice", () => {
        expect(WobblySpinner.prototype.componentWillMount.callCount).to.equal(2);
    });
    it("attaches 2 <style> elements into the DOM head (keyframes and 1 spinner sheet)", () => {
        expect(getStyleSheetCount()).to.equal(2);
    });

});

describe("When we mount two DIS-LIKE WobblySpinners", function() {
    beforeEach(() => {
        sinon.spy(WobblySpinner.prototype, "componentWillMount");
        this.wrapper = mount(<div><WobblySpinner /><WobblySpinner diameter={5}/></div>);
    })
    afterEach(() => {
        this.wrapper.unmount();
        WobblySpinner.prototype.componentWillMount.restore();
    })
    it("componentWillMount should be called twice", () => {
        expect(WobblySpinner.prototype.componentWillMount.callCount).to.equal(2);
    });
    it("attaches 3 <style> elements into the DOM head (keyframes and 2 spinner sheets)", () => {
        expect(getStyleSheetCount()).to.equal(3);
    });

});

["diameter", "thickness", "spinRate", "wobbleOffset", "outerColor", "innerColor", "wobbleColor"].forEach((key) => {
    describe("When we re-render one WobblySpinners and change it's " + key+ " prop", function() {
        beforeEach(() => {
            sinon.spy(WobblySpinner.prototype, "shouldComponentUpdate");
            this.wrapper = mount(<WobblySpinner />);
            this.wrapper.setProps({ [key]: 555 });
        })
        afterEach(() => {
            this.wrapper.unmount();
            WobblySpinner.prototype.shouldComponentUpdate.restore();
        })
        describe("`shouldComponentUpdate`", function() {
            it("should be called once", () => {
                expect(WobblySpinner.prototype.shouldComponentUpdate.callCount).to.equal(1);
            });
            it("should return true", () => {
                expect(WobblySpinner.prototype.shouldComponentUpdate.getCall(0).returnValue).to.equal(true);
            });
        });
        it("attaches 2 <style> elements into the DOM head (keyframes and spinner sheet)", () => {
            expect(getStyleSheetCount()).to.equal(2);
        });

    });
});

describe("When we re-render one WobblySpinners and change a prop that does NOT effect the style sheet", function() {
    beforeEach(() => {
        sinon.spy(WobblySpinner.prototype, "shouldComponentUpdate");
        this.wrapper = mount(<WobblySpinner />);
        this.wrapper.setProps({ foo: 555 });
    })
    afterEach(() => {
        this.wrapper.unmount();
        WobblySpinner.prototype.shouldComponentUpdate.restore();
    })
    describe("`shouldComponentUpdate`", function() {
        it("should be called once", () => {
            expect(WobblySpinner.prototype.shouldComponentUpdate.callCount).to.equal(1);
        });
        it("should return false", () => {
            expect(WobblySpinner.prototype.shouldComponentUpdate.getCall(0).returnValue).to.equal(false);
        });
    });
    it("attaches 2 <style> elements into the DOM head (keyframes and spinner sheet)", () => {
        expect(getStyleSheetCount()).to.equal(2);
    });

});
