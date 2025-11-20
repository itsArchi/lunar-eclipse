import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/",
            pathname: "",
            query: {},
            asPath: "",
            push: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(),
            },
            beforePopState: jest.fn(() => null),
            prefetch: jest.fn(() => Promise.resolve()),
        };
    },
}));

jest.mock("next-auth/react", () => {
    const originalModule = jest.requireActual("next-auth/react");
    return {
        ...originalModule,
        signIn: jest.fn(() =>
            Promise.resolve({ error: null, status: 200, ok: true })
        ),
        signOut: jest.fn(() => Promise.resolve({})),
        useSession: jest.fn(() => {
            return { data: null, status: "unauthenticated" };
        }),
    };
});
