import {expect} from "chai";
import {Router} from "./router";
import {BlockInheritor} from "./types";
import {JSDOM} from "jsdom";
import * as sinon from "sinon";


describe("Router", () => {
  beforeEach(() => {
    const dom = new JSDOM(
      '<!DOCTYPE html><body><div id="app"></div></body>',
      { url: 'http://localhost:3000' }
    );

    (global as any).window = {
      ...dom.window,
      ...global.window,
    };
    (global as any).document = dom.window.document;
  })

  it("should be singleton", () => {
    const router1 = new Router("app");
    const router2 = new Router("app");

    expect(router1).to.eq(router2);
  });

  describe("use", () => {
    it("should return Router instance", () => {
      const router = new Router("app");

      const result = router.use("/some-page", {} as BlockInheritor);

      expect(router).to.eq(result);
    });
  });

  describe("setFallBack", () => {
    it("should return Router instance", () => {
      const router = new Router("app");

      const result = router.setFallBack("/404", {} as BlockInheritor);

      expect(router).to.eq(result);
    });
  });

  describe("go", () => {
    it("should instantiate class Block", () => {
      const blockMock = {
        destroy() {}
      }
      const blockFake = sinon.fake.returns(blockMock);
      const router = new Router("app");
      router.use("/", blockFake as any)

      router.go("/");

      expect(blockFake.called).to.be.true;
    });

    it("should change path in browser history", () => {
      const blockMock = {
        destroy() {}
      }
      const blockFake = sinon.fake.returns(blockMock);
      const router = new Router("app");
      router.use("/test", blockFake as any)

      router.go("/test");

      expect(global.window.location.pathname).to.eq("/test");
    });
  });

  describe("back", () => {
    it("should call window.history.back", () => {
      const router = new Router("app");
      const historyBackSpy = sinon.spy(global.window.history, 'back');

      router.back();

      expect(historyBackSpy.called).to.be.true;
    });
  });

  describe("forward", () => {
    it("should call window.history.forward", () => {
      const router = new Router("app");
      const historyForwardSpy = sinon.spy(global.window.history, 'forward');

      router.forward();

      expect(historyForwardSpy.called).to.be.true;
    });
  });

  describe("getRoute", () => {
    it("should return matched route", () => {
      const blockMock = {
        destroy() {}
      }
      const router = new Router("app");
      router.use('/page', blockMock as any);

      const result = router.getRoute('/page');

      expect(result).not.to.be.undefined;
    });
  });
});
