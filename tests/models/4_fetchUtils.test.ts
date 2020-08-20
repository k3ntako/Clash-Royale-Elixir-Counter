import { get } from "../../src/utilities/fetchUtils";
import { assert } from "chai";
import fetchMock from "fetch-mock";
import { firstFifteenCards } from "../_test_utilities/_cards.utils";

describe("fetchUtils", (): void => {
  describe("get", (): void => {
    it("should fetch", async (): Promise<void> => {
      // Overwrite the fetchMock in setup
      fetchMock.restore();

      fetchMock.mock("/api/cards", {
        status: 200,
        body: firstFifteenCards,
      });

      const res = await get("/api/cards");

      assert.sameDeepMembers(res, firstFifteenCards);
    });
  });
});
