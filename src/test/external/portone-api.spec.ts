import { loadEnv } from "../../config/env.config";
import { PortOneApiProvider } from "../../external/portone/portone-api.provider";

describe("PortOne API", () => {
  let portOneApi: PortOneApiProvider;
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
    loadEnv();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("getToken 시 유효한 API KEY가 아니라면 에러를 반환한다.", async () => {
    // given
    process.env.PORTONE_TEST_API_KEY = "INVALID_API_KEY";
    portOneApi = new PortOneApiProvider();

    // when & then
    await expect(portOneApi.getToken()).rejects.toThrow();
  });

  it("getToken 시 유효한 API SECRET이 아니라면 에러를 반환한다.", async () => {
    // given
    process.env.PORTONE_TEST_API_SECRET = "INVALID_API_SECRET";
    portOneApi = new PortOneApiProvider();

    // when & then
    await expect(portOneApi.getToken()).rejects.toThrow();
  });

  it("getToken 시 유효한 API KEY와 SECRET이라면 토큰을 반환한다.", async () => {
    // given
    portOneApi = new PortOneApiProvider();

    await Promise.resolve(process.nextTick(Boolean));
    // when
    const sut = await portOneApi.getToken();

    // then
    expect(sut).not.toBeNull();
  });
});
